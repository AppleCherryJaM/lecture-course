import { useNavigate } from "react-router-dom";
import { Game } from "../../types/types";
import styles from "./GameCard.module.css";
import { deleteGame } from "../../lib/requests";

interface GameCardProps {
    game: Game;
    onDeleted: (id: number) => void;
}

function GameCard({ game, onDeleted }: GameCardProps) {
    const navigate = useNavigate();

    async function handleDelete() {
        if (!confirm(`Удалить "${game.title}"?`)) return;
        try {
            await deleteGame(game.id);
            onDeleted(game.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert("Не удалось удалить игру" + (error?.message ? `: ${error.message}` : ""));
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.cover}>
                {game.cover ? (
                    <img src={game.cover} alt={game.title} />
                ) : (
                    <div className={styles.placeholder}>🎮</div>
                )}
                {!game.inStock && (
                    <span className={styles.outOfStock}>Нет в наличии</span>
                )}
            </div>

            <div className={styles.body}>
                <h3 className={styles.title}>{game.title}</h3>

                <div className={styles.meta}>
                    <span className={styles.genre}>{game.genre}</span>
                    <span className={styles.year}>{game.releaseYear}</span>
                </div>

                <div className={styles.platforms}>
                    {game.platform.map((p: string) => (
                        <span key={p} className={styles.platformTag}>
                            {p}
                        </span>
                    ))}
                </div>

                <div className={styles.footer}>
                    <span className={styles.price}>{game.price} ₴</span>
                    {game.rating && (
                        <span className={styles.rating}>★ {game.rating}</span>
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.editBtn}
                        onClick={() => navigate(`/edit/${game.id}`)}
                    >
                        Редактировать
                    </button>
                    <button className={styles.deleteBtn} onClick={handleDelete}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameCard;