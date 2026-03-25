import { getBlogPost, getRelatedBlogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SocialShare } from '@/components/SocialShare';
import { Badge } from '@/components/ui/badge';
import { Clock, UserCircle, ArrowLeft } from 'lucide-react';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { BackNav } from '@/components/BackNav';

export async function generateMetadata({ params }: any) {
  const post = getBlogPost(params.postSlug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | CEFR English Blog`,
    description: post.content.substring(0, 150),
  };
}

export default function BlogPostPage({ params }: any) {
  const post = getBlogPost(params.postSlug);
  if (!post) notFound();
  const relatedPosts = getRelatedBlogPosts(post!);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      
      <BackNav
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Soft Skills Blog', href: '/soft-skills' }]}
        current={post!.title}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <article>
            <header className="mb-10 text-center">
              <Badge variant="secondary" className="mb-4 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300">{post!.category}</Badge>
              <h1 className="font-headline text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">{post!.title}</h1>
              <div className="mt-6 flex justify-center items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  <span>{post!.authorProfile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post!.readingTime} read</span>
                </div>
              </div>
            </header>
            <div className="my-10 rounded-2xl overflow-hidden shadow-xl">
              <Image src={post!.image} alt={post!.title} width={1200} height={600} className="w-full object-cover" data-ai-hint={(post as any).dataAiHint} />
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none font-body text-slate-700 dark:text-slate-200 leading-relaxed">
              <p>{post!.content}</p>
            </div>
            <Separator className="my-10" />
            <footer className="flex items-center justify-between flex-wrap gap-4">
              <SocialShare title={post!.title} />
              <Link href="/soft-skills" className="inline-flex items-center gap-2 text-sm font-semibold text-[#043370] dark:text-cyan-400 hover:text-[#00A2C9] transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </footer>
          </article>

          {relatedPosts.length > 0 && (
            <aside className="mt-20">
              <Separator />
              <div className="py-12">
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
