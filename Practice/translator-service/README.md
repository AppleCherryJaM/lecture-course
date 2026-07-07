# Сервис Переводчика (CosmoTranslator)

Этот репозиторий содержит код бэкенда и фронтенда для веб-приложения переводчика, работающего на базе Google Translate API и Material UI (MUI).

---

### Авторизация на сессиях и куках (Session & Cookie)
Мы заменили временные локальные псевдо-токены на полноценную сессионную авторизацию:
* **Менеджер сессий (Session Manager)**: Создали класс [session.manager.ts](backend/src/services/session.manager.ts) на бэкенде, использующий in-memory хэш-таблицу для связи сгенерированных токенов (`crypto.randomUUID()`) с ID пользователей и временем жизни сессии (24 часа).
* **Middleware авторизации (Auth Middleware)**: Обновили [auth.middleware.ts](backend/src/middlewares/auth.middleware.ts) для ручного парсинга кук из заголовка `req.headers.cookie` без добавления лишних внешних библиотек. Валидный идентификатор сессии прикрепляет ID пользователя к `res.locals.userId` для дальнейших роутов.
* **Контроллеры бэкенда**:
  * Обновили методы `register` и `login` в [users.controller.ts](backend/src/controllers/users.controller.ts) для создания сессии и передачи её в браузер в виде безопасной куки с флагом `httpOnly`.
  * Реализовали контроллер `getMe` для проверки текущей сессии пользователя на старте приложения.
  * Реализовали контроллер `logout` для удаления сессии из памяти менеджера сессий и очистки куки через `res.clearCookie('sessionId')`.
* **Роуты бэкенда**: Зарегистрировали новые эндпоинты `/me` и `/logout` в [users.route.ts](backend/src/routes/users.route.ts).
* **Контекст авторизации React (AuthContext)**:
  * Переписали [AuthContext.tsx](frontend/src/context/AuthContext.tsx) для выполнения запроса к `/api/users/me` при старте приложения для проверки сессии.
  * Удалили использование `localStorage` как устаревший и ненадежный способ кэширования авторизации.
  * Обновили метод `logout` для отправки POST-запроса на бэкенд для удаления сессии и очистки куки.
