import { translate as googleTranslate} from 'google-translate-api-x';
import { TranslationError } from "../types/errors";
import { TranslationRequest } from "../types/types";

export const translate = async (
    { 
        text, 
        source = "auto", 
        target 
    } : TranslationRequest
): Promise<string> => {
  try {
    const result = await googleTranslate(text, {
      to: target
    });

    return result.text;
  } catch (error) {
    console.error(error);

    if (error instanceof TranslationError) {
        throw error;
    }

    throw TranslationError.apiError(500, "Failed to translate text");
  }
};