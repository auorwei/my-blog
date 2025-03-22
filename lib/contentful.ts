import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// 定义 Contentful 内容类型的接口
interface BlogPostFields {
  title: string;
  url: string;
  summary: string;
  content: Document;
  author: string;
  date: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export type BlogPost = {
  title: string;
  url: string;
  summary: string;
  content: Document;
  author: string;
  date: string;
  featuredImage: {
    url: string;
    title: string;
  } | null;
};

// 缓存机制，避免频繁请求 Contentful API
const CACHE_DURATION = 60 * 60 * 1000; // 1小时
let cachedPosts: BlogPost[] | null = null;
let lastFetchTime = 0;

export async function getAllPosts(): Promise<BlogPost[]> {
  const now = Date.now();
  
  // 使用缓存，如果在缓存期内
  if (cachedPosts && now - lastFetchTime < CACHE_DURATION) {
    return cachedPosts;
  }
  
  // 获取所有文章，每次获取 100 篇
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.date'],
    limit: 100, // Contentful 默认限制为 100，这是最大值
  });
  
  // 处理超过 100 篇的情况
  let allItems = [...entries.items];
  let totalItems = entries.total;
  let skip = 100;
  
  // 如果总数超过 100，分批获取剩余文章
  while (allItems.length < totalItems) {
    const moreEntries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.date'],
      limit: 100,
      skip: skip,
    });
    
    allItems = [...allItems, ...moreEntries.items];
    skip += 100;
  }

  // 处理文章数据
  const posts = allItems.map((item: any) => {
    const fields = item.fields;
    
    return {
      title: String(fields.title || ''),
      url: String(fields.url || ''),
      summary: String(fields.summary || ''),
      content: fields.content || {},
      author: String(fields.author || ''),
      date: String(fields.date || ''),
      featuredImage: fields.featuredImage ? {
        url: `https:${fields.featuredImage.fields.file.url}`,
        title: String(fields.featuredImage.fields.title || ''),
      } : null,
    };
  });
  
  // 更新缓存
  cachedPosts = posts;
  lastFetchTime = now;
  
  return posts;
}

// 获取特定文章的缓存
const postCache: Record<string, { post: BlogPost | null; timestamp: number }> = {};

export async function getPostByUrl(url: string): Promise<BlogPost | null> {
  const now = Date.now();
  
  // 使用缓存，如果在缓存期内
  if (postCache[url] && now - postCache[url].timestamp < CACHE_DURATION) {
    return postCache[url].post;
  }
  
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.url': url,
  });

  if (entries.items.length === 0) {
    // 缓存"未找到"结果
    postCache[url] = { post: null, timestamp: now };
    return null;
  }

  const item: any = entries.items[0];
  const fields = item.fields;

  const post = {
    title: String(fields.title || ''),
    url: String(fields.url || ''),
    summary: String(fields.summary || ''),
    content: fields.content || {},
    author: String(fields.author || ''),
    date: String(fields.date || ''),
    featuredImage: fields.featuredImage ? {
      url: `https:${fields.featuredImage.fields.file.url}`,
      title: String(fields.featuredImage.fields.title || ''),
    } : null,
  };
  
  // 更新缓存
  postCache[url] = { post, timestamp: now };
  
  return post;
}

// URL缓存
let urlCache: string[] | null = null;
let urlCacheTime = 0;

export async function getAllPostUrls(): Promise<string[]> {
  const now = Date.now();
  
  // 使用缓存，如果在缓存期内
  if (urlCache && now - urlCacheTime < CACHE_DURATION) {
    return urlCache;
  }
  
  // 获取所有 URL，使用分页处理
  const entries = await client.getEntries({
    content_type: 'blogPost',
    select: ['fields.url'],
    limit: 1000, // 获取更多的 URL
  });
  
  // 处理超过 1000 个文章的情况
  let allItems = [...entries.items];
  let totalItems = entries.total;
  let skip = 1000;
  
  while (allItems.length < totalItems) {
    const moreEntries = await client.getEntries({
      content_type: 'blogPost',
      select: ['fields.url'],
      limit: 1000,
      skip: skip,
    });
    
    allItems = [...allItems, ...moreEntries.items];
    skip += 1000;
  }
  
  const urls = allItems.map((item: any) => String(item.fields.url || ''));
  
  // 更新缓存
  urlCache = urls;
  urlCacheTime = now;
  
  return urls;
} 