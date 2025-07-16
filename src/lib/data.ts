import data from '@/data/readme-data.json';
import type { Course, LiteraryWork, BlogPost, Data } from './types';

export const getCourses = (): Course[] => {
  return data.courses;
};

export const getCourse = (slug: string): Course | undefined => {
  return data.courses.find((course) => course.slug === slug);
};

export const getLiteraryWork = (courseSlug: string, workSlug: string): LiteraryWork | undefined => {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  
  for (const category of course.categories) {
    const work = category.works.find((work) => work.slug === workSlug);
    if (work) return work;
  }
  
  return undefined;
};

export const getSoftSkillsData = () => {
  return data.softSkills;
};

export const getBlogPosts = (): BlogPost[] => {
  return data.softSkills.blogPosts;
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return data.softSkills.blogPosts.find((post) => post.slug === slug);
};

export const getRelatedBlogPosts = (currentPost: BlogPost): BlogPost[] => {
    return data.softSkills.blogPosts.filter(
      (post) => post.category === currentPost.category && post.slug !== currentPost.slug
    ).slice(0, 2);
}
