import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/contentful';

// 增加缓存时间，减少重新生成次数
export const revalidate = 3600; // 每小时重新验证一次

// 添加分页搜索参数
export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 10; // 每页显示 10 篇文章
  
  const allPosts = await getAllPosts();
  
  // 实现分页
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

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
      
      {/* 分页导航 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {currentPage > 1 && (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              上一页
            </Link>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/?page=${page}`}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {page}
            </Link>
          ))}
          
          {currentPage < totalPages && (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              下一页
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
