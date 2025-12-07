export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  price: string;
  compare_at_price:string;
  description: string;
  category: string;
  image_url?: string;
  product_url: string;
}

export interface ChatContext {
  currentCategory?: 'fashion' | 'wellness' |'sale' |'new arrivals';
  subCategory?: string;
  budget?: string;
  style?: string;
  preferences?: string[];
}

export interface ChatResponse {
  message: string;
  recommendations?: ProductRecommendation[];
  context?: ChatContext;
}