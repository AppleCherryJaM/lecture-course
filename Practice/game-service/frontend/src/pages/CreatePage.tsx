import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./CreatePage.module.css";
import GameForm from "../components/game-form/GameForm";
import { createGame, fetchGameById, updateGame } from "../lib/requests";
import { Game } from "../types/types";

function CreatePage() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [existingGame, setExistingGame] = useState<Game | undefined>(undefined);
    const [loadingGame, setLoadingGame] = useState(isEditMode);
    const [loadError, setLoadError] = useState<string | null>(null);

    // Если режим редактирования — загружаем данные игры
    useEffect(() => {
        if (!id) return;

        async function loadGame() {
            try {
                const game = await fetchGameById(Number(id));
                setExistingGame(game);
            } catch {
                setLoadError("Не удалось загрузить игру для редактирования");
            } finally {
                setLoadingGame(false);
            }
        }

        loadGame();
    }, [id]);

    async function handleSubmit(data: {
        title: string;
        genre: string;
        platform: string[];
    }) {
        if (isEditMode && id) {
            await updateGame(Number(id), data);
        } else {
            await createGame(data);
        }
        navigate("/");
    }

    if (loadingGame) return <p>Загрузка...</p>;
    if (loadError) return <p style={{ color: "red" }}>{loadError}</p>;

    return (
        <div className={styles.page}>
            <h2>{isEditMode ? "Редактирование игры" : "Добавить игру"}</h2>
            <GameForm
                initialData={existingGame}
                onSubmit={handleSubmit}
                submitLabel={isEditMode ? "Сохранить изменения" : "Создать игру"}
            />
        </div>
    );
}

export default CreatePage;