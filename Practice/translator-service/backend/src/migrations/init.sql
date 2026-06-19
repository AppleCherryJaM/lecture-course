CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
    id              SERIAL PRIMARY KEY,
    from_lang       VARCHAR(10)  NOT NULL,
    to_lang         VARCHAR(10)  NOT NULL,
    input_text      TEXT         NOT NULL,
    translated_text TEXT         NOT NULL,
    user_id         INTEGER,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- ==================== ИНДЕКСЫ ====================

-- Индекс на user_id в таблице records:
-- Ускоряет поиск всех переводов конкретного пользователя (WHERE user_id = ?)
-- PostgreSQL НЕ создаёт индекс на FK автоматически (в отличие от MySQL)
CREATE INDEX IF NOT EXISTS idx_records_user_id ON records(user_id);

-- Индекс на email в таблице users:
-- UNIQUE constraint уже создаёт индекс автоматически,
-- поэтому отдельный CREATE INDEX для email НЕ нужен.

-- Составной индекс (пример):
-- Если бы часто искали переводы по комбинации языков,
-- можно было бы создать составной индекс:
-- CREATE INDEX idx_record_langs ON record(from_lang, to_lang);
