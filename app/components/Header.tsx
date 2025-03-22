import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-6 bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
          个人博客
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                首页
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                关于
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 