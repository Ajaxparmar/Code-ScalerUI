
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  price: string;
  duration: string;
  rating: number;
}

export type Theme = 'light' | 'dark';
