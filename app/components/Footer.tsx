import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-100 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              © {new Date().getFullYear()} 个人博客。基于 Vercel + Contentful 构建。
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="https://github.com/yourusername" target="_blank" className="text-gray-600 hover:text-blue-600">
              GitHub
            </Link>
            <Link href="https://twitter.com/yourusername" target="_blank" className="text-gray-600 hover:text-blue-600">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 