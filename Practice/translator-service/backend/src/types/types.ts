export interface TranslationResponse {
  translatedText: string;
}

export interface TranslationRequest {
  text: string;
  source?: string;
  target: string;
}

export interface Record {
  id?: number;
  from_lang: string;
  to_lang: string;
  input_text: string;
  translated_text: string;
  user_id: number | null;
  createdAt?: Date;
}

export interface User {
  id?: number;
  email: string;
  password: string;
}