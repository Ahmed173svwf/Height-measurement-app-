export enum UnitSystem {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL'
}

export type LanguageCode = 'en' | 'fr' | 'ar' | 'fa' | 'ku';

export interface Person {
  id: string;
  name: string;
  heightCm: number;
  color: string;
}

export interface ComparisonResult {
  diffCm: number;
  tallerId: string | null; // null if equal
}

export interface AiInsight {
  text: string;
  loading: boolean;
  error?: string;
}