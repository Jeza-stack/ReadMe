import data from '@/data/readme-data.json';
import type { Course, LiteraryWork, BlogPost, Data } from './types';

export const getCourses = (): Course[] => {
  return data.courses;
};

export const getCourse = (slug: string): Course | undefined => {
  return data.courses.find((course: any) => course.slug === slug);
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
  return {
    blogPosts: [],
    blogCategories: []
  };
};

export const getBlogPosts = (): BlogPost[] => {
  return [];
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return undefined;
};

export const getRelatedBlogPosts = (currentPost: BlogPost): BlogPost[] => {
    return [];
}
