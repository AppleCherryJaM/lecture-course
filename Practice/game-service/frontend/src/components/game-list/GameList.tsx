import { useState, useEffect } from "react";
import GameCard from "../game-card/GameCard";
import styles from "./GameList.module.css";
import { Game } from "../../types/types";
import { fetchGames, filterGamesByGenre, searchGames } from "../../lib/requests";

// Жанры для фильтра — в реальном проекте можно получать с сервера
const GENRES = ["Все", "Action", "RPG", "Strategy", "Sports", "Adventure", "Puzzle"];

function GameList() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("Все");

    // Загрузка игр при монтировании
    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchGames();
            setGames(result.data);
        } catch {
            setError("Не удалось загрузить игры");
        } finally {
            setLoading(false);
        }
    }

    // Поиск с небольшой задержкой (debounce)
    useEffect(() => {
        if (!searchQuery.trim()) {
            loadGames();
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await searchGames(searchQuery);
                setGames(result.data);
            } catch {
                setError("Ошибка при поиске");
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Фильтрация по жанру
    useEffect(() => {
        if (selectedGenre === "Все") {
            loadGames();
            return;
        }

        async function filterByGenre() {
            try {
                setLoading(true);
                setError(null);
                const result = await filterGamesByGenre(selectedGenre);
                setGames(result.data);
            } catch {
                setError("Ошибка при фильтрации");
            } finally {
                setLoading(false);
            }
        }

        filterByGenre();
    }, [selectedGenre]);

    function handleGameDeleted(id: number) {
        setGames((prev) => prev.filter((g) => g.id !== id));
    }

    return (
        <div>
            {/* Панель поиска и фильтров */}
            <div className={styles.controls}>
                <input
                    type="text"
                    className={styles.search}
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSelectedGenre("Все");
                        setSearchQuery(e.target.value);
                    }}
                />

                <div className={styles.genres}>
                    {GENRES.map((genre) => (
                        <button
                            key={genre}
                            className={`${styles.genreBtn} ${
                                selectedGenre === genre ? styles.genreActive : ""
                            }`}
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedGenre(genre);
                            }}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Состояния: загрузка / ошибка / пусто / список */}
            {loading && <p className={styles.status}>Загрузка...</p>}

            {!loading && error && <p className={styles.error}>{error}</p>}

            {!loading && !error && games.length === 0 && (
                <p className={styles.status}>Игры не найдены</p>
            )}

            {!loading && !error && games.length > 0 && (
                <div className={styles.grid}>
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onDeleted={handleGameDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default GameList;