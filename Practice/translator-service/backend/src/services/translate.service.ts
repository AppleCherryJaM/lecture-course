import { translate as googleTranslate } from 'google-translate-api-x';
import { TranslationError } from "../types/errors";
import { TranslationRequest } from "../types/types";
import { RecordsRepository } from "../repos/records.repository";

export class TranslateService {
  private readonly recordRepo: RecordsRepository;

  constructor() {
    this.recordRepo = new RecordsRepository();
  }

  public async translate(
    { text, target, source }: TranslationRequest,
    userId: number | null
  ): Promise<string> {
    try {
      const result = await googleTranslate(text, {
        to: target
      });

      const fromLang = source || result.from.language.iso;

      await this.recordRepo.create({
        from_lang: fromLang,
        to_lang: target,
        input_text: text,
        translated_text: result.text,
        user_id: userId
      });

      return result.text;
    } catch (error) {
      console.error(error);

      if (error instanceof TranslationError) {
        throw error;
      }

      throw TranslationError.apiError(500, "Failed to translate text");
    }
  }

  public async getTranslationHistory(userId: number, limit: number, offset: number) {
    try {
      const records = await this.recordRepo.findByUserId(userId, limit, offset);
      const total = await this.recordRepo.countByUserId(userId);
      return {
        records,
        total,
        limit,
        offset
      };
    } catch (error) {
      console.error(error);
      throw TranslationError.apiError(500, "Failed to retrieve translation history");
    }
  }
}