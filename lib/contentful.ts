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

export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.date'],
  });

  return entries.items.map((item: any) => {
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
}

export async function getPostByUrl(url: string): Promise<BlogPost | null> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.url': url,
  });

  if (entries.items.length === 0) {
    return null;
  }

  const item: any = entries.items[0];
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
}

export async function getAllPostUrls(): Promise<string[]> {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    select: ['fields.url'],
  });

  return entries.items.map((item: any) => String(item.fields.url || ''));
} 