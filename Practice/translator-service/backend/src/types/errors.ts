export class TranslationError extends Error {

    constructor(
        public message: string,
        private status: number = 500,
        public code?: string,
    ) {
        super(message);
        this.name = 'AppError';
        this.status = status;
        this.code = code;
    }

    public getStatus(): number {
        return this.status;
    }

    public static apiError(status: number, message: string): TranslationError {
        const error = new TranslationError(message);
        error.status = status;
        return error;
    }
}