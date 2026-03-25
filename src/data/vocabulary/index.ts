import family from '@/data/vocabulary/family-relationships.json';
import personal from '@/data/vocabulary/personal-information.json';
import colors from '@/data/vocabulary/colors-basic-adjectives.json';
import food from '@/data/vocabulary/food-drinks.json';
import timeData from '@/data/vocabulary/days-months-time.json';
import verbs from '@/data/vocabulary/basic-verbs.json';

export const A1_DATASETS = {
  'family-relationships': family,
  'personal-information': personal,
  'colors-basic-adjectives': colors,
  'food-drinks': food,
  'days-months-time': timeData,
  'basic-verbs': verbs,
} as const;

export type DatasetKey = keyof typeof A1_DATASETS;