import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostByUrl, getAllPostUrls } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// 优化 ISR 设置，增加缓存时间
export const revalidate = 3600; // 每小时重新验证一次，而不是每分钟

// 只生成最近的文章路径，而不是所有文章
export async function generateStaticParams() {
  const urls = await getAllPostUrls();
  
  // 只为最近的 20 篇文章预生成静态页面
  // 其他页面将在首次访问时按需生成
  return urls.slice(0, 20).map((url: string) => ({
    url,
  }));
}

export default async function BlogPost({ params }: { params: { url: string } }) {
  const post = await getPostByUrl(params.url);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose lg:prose-xl max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 block">
          ← 返回首页
        </Link>
        
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="text-gray-600 mb-8">
          由 {post.author} 发布于 {new Date(post.date).toLocaleDateString('zh-CN')}
        </div>
        
        {post.featuredImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="mb-8 text-lg text-gray-700 italic">
          {post.summary}
        </div>
        
        <div className="mt-8">
          {documentToReactComponents(post.content)}
        </div>
      </article>
    </div>
  );
} 