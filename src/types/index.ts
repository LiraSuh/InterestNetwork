export interface Person {
  id?: string;
  name: string;
  affiliation: string;
  field: string;
  notes: string;
  userId?: string;
  createdAt?: Date;
  groupIds?: string[];
}

export interface Group {
  id?: string;
  name: string;
  description?: string;
  userId?: string;
  createdAt?: Date;
  personIds?: string[];
} 