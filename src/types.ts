export interface Person {
  id?: string;
  userId?: string;
  name: string;
  title: string;
  affiliation: string;
  field: string;
  profileImage?: string;
  notes?: string;
  groupIds?: string[];
  expertise?: string[];
  publications?: string[];
  achievements?: string[];
  contactInfo?: {
    email?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
  createdAt?: Date;
  isFavorite: boolean;
}

export interface Group {
  id?: string;
  userId?: string;
  name: string;
  description?: string;
  personIds?: string[];
  createdAt?: Date;
}

export interface Interest {
  id?: string;
  userId?: string;
  name: string;
  category: InterestCategory;
  description?: string;
  createdAt?: Date;
}

export type InterestCategory = 
  | 'academic'
  | 'industry'
  | 'research'
  | 'technology'
  | 'career'
  | 'management'
  | 'marketing'
  | 'advertising'
  | 'journalism'
  | 'sports'
  | 'entertainment'
  | 'custom';

export interface CustomCategory {
  id?: string;
  userId?: string;
  name: string;
  createdAt?: Date;
}

export interface Recommendation {
  id?: string;
  userId?: string;
  personId: string;
  interestId: string;
  relevanceScore: number;
  reason: string;
  createdAt?: Date;
} 