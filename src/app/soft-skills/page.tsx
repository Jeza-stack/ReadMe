import { getSoftSkillsData } from '@/lib/data';
import { BlogClient } from '@/components/BlogClient';

export const metadata = {
  title: 'Soft Skills Blog | ReadMe',
  description: 'Articles and insights on communication, leadership, and professional development.',
};

export default function SoftSkillsPage() {
  const { blogPosts, blogCategories } = getSoftSkillsData();

  return (
    <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-headline text-4xl md:text-6xl font-bold">Soft Skills Development</h1>
            </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BlogClient posts={blogPosts} categories={blogCategories} showControls={false} showExcerpt={false} />
        </div>
    </div>
  );
}
