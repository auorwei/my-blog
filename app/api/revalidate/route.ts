import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// 限制此 API 路由只能通过 Vercel Cron 或 Contentful webhook 调用
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
    // 重新验证首页和博客列表
    revalidatePath('/');
    revalidatePath('/blog/[url]');
    
    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
      message: 'Revalidation triggered successfully'
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error revalidating paths' },
      { status: 500 }
    );
  }
} 