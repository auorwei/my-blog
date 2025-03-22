import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/contentful';

// 启用 ISR
export const revalidate = 60; // 每分钟重新验证一次

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">文章列表</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.url} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {post.featuredImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.url}`} className="text-blue-600 hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <div className="text-sm text-gray-600 mb-4">
                  由 {post.author} 发布于 {new Date(post.date).toLocaleDateString('zh-CN')}
                </div>
                <p className="text-gray-700 mb-4">
                  {post.summary}
                </p>
                <Link href={`/blog/${post.url}`} className="text-blue-600 hover:underline">
                  阅读全文 →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 py-12">暂无博客文章，请在 Contentful 中添加内容。</p>
        )}
      </div>
    </div>
  );
}
