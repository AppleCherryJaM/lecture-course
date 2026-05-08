import { useState } from "react";
import type { Game } from "../../types/types";
import styles from "./GameForm.module.css";

// То, что вводит пользователь в форме
interface GameFormData {
    title: string;
    genre: string;
    releaseYear: string;
    price: string;
    platformInput: string; // платформы вводим через запятую
    cover: string;
    inStock: boolean;
}

interface GameFormProps {
    initialData?: Game;           // если передан — это режим редактирования
    onSubmit: (data: {
        title: string;
        genre: string;
        platform: string[];
    }) => Promise<void>;
    submitLabel: string;
}

function GameForm({ initialData, onSubmit, submitLabel }: GameFormProps) {
    const [formData, setFormData] = useState<GameFormData>({
        title: initialData?.title ?? "",
        genre: initialData?.genre ?? "",
        releaseYear: initialData?.releaseYear ?? "",
        price: initialData?.price?.toString() ?? "",
        platformInput: initialData?.platform.join(", ") ?? "",
        cover: initialData?.cover ?? "",
        inStock: initialData?.inStock ?? true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.title.trim() || !formData.genre.trim()) {
            setError("Название и жанр обязательны");
            return;
        }

        const platform = formData.platformInput
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);

        if (platform.length === 0) {
            setError("Укажите хотя бы одну платформу");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await onSubmit({ title: formData.title, genre: formData.genre, platform });
        } catch {
            setError("Что-то пошло не так. Попробуйте ещё раз.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.field}>
                <label className={styles.label}>Название *</label>
                <input
                    className={styles.input}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="The Witcher 3"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Жанр *</label>
                <select
                    className={styles.input}
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                >
                    <option value="">— выбрать —</option>
                    {["Action", "RPG", "Strategy", "Sports", "Adventure", "Puzzle"].map(
                        (g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Платформы * (через запятую)</label>
                <input
                    className={styles.input}
                    type="text"
                    name="platformInput"
                    value={formData.platformInput}
                    onChange={handleChange}
                    placeholder="PC, PS5, Xbox"
                />
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Год выпуска</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="releaseYear"
                        value={formData.releaseYear}
                        onChange={handleChange}
                        placeholder="2015"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Цена (₴)</label>
                    <input
                        className={styles.input}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="999"
                        min="0"
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Ссылка на обложку</label>
                <input
                    className={styles.input}
                    type="url"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    placeholder="https://..."
                />
            </div>

            <div className={styles.checkboxField}>
                <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">В наличии</label>
            </div>

            <button className={styles.submit} type="submit" disabled={loading}>
                {loading ? "Сохранение..." : submitLabel}
            </button>
        </form>
    );
}

export default GameForm;