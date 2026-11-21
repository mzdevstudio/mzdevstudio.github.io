export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  estimatedTime: string;
  startingPrice: string;
  badge?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'landing' | 'ecommerce' | 'corporate' | 'webapp';
  categoryLabel: string;
  client: string;
  description: string;
  longDescription: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  lighthouseScore?: number;
  featured?: boolean;
  colorGradient?: string;
  mockupType?: 'saas' | 'store' | 'agency' | 'clinic' | 'fintech';
  liveUrl?: string;
  previewImage?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
