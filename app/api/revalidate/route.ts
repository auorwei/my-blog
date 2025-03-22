import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// 支持 GET（用于 Vercel Cron）和 POST（用于 Contentful Webhook）请求
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // 验证密钥
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  try {
    // 重新验证所有可能的路径
    revalidatePath('/', 'layout'); // 使用 'layout' 类型来重新验证整个应用
    
    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
      message: 'Revalidation triggered successfully'
    });
  } catch (_) {
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}

// 保持 GET 方法用于 Vercel Cron
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const vercelCron = request.headers.get('x-vercel-cron');
  
  const isVercelCron = vercelCron === 'true';
  const isValidSecret = secret === process.env.REVALIDATE_SECRET;
  
  if (!isVercelCron && !isValidSecret) {
    return NextResponse.json(
      { error: 'Invalid token or not a Vercel cron job' },
      { status: 401 }
    );
  }
  
  try {
    // 重新验证所有可能的路径
    revalidatePath('/', 'layout'); // 使用 'layout' 类型来重新验证整个应用
    
    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
      message: 'Revalidation triggered successfully'
    });
  } catch (_) {
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
} 