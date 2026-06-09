export class TranslationError extends Error {
    private status: number;

    constructor(message: string) {
        super(message);
        this.status = 500;
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