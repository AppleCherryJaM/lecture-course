export interface TranslationResponse {
  translatedText: string;
}

export interface TranslationRequest {
  text: string;
  source?: string;
  target: string;
}