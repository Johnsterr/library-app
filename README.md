# Домашнее задание к Блоку "Библиотека Express.js"

### Установка и запуск

Для запуска проекта необходимо:

- Склонировать репозиторий
- Установить модули `npm i`
- Добавить файл `.env` (для примера приложен файл `.env.example`)
- Определить переменную `APP_PORT` с удобным портом
- Запустить сервер `npm run dev`

### Этап 1

Был разработан **API CRUD** для работы с сущностью _«книга»_. Сущность имеет собственные методы. Для экземпляров сущности книги предусмотрена следующая структура данных:

```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
```

Генерация id происходит с помощью пакета `uuid` в момент создания книги.

#### API-методы

| Метод    | URL               | Действие                      | Комментарий                                                                                 |
| -------- | ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| `POST`   | `/api/user/login` | авторизация пользователя      | метод всегда возвращает **Code: 201** и статичный объект: `{ id: 1, mail: "test@mail.ru" }` |
| `GET`    | `/api/books`      | получить все книги            | получаем массив всех книг                                                                   |
| `GET`    | `/api/books/:id`  | получить книгу по **id**      | получаем объект книги, если запись не найдена вернем **Code: 404**                          |
| `POST`   | `/api/books`      | создать книгу                 | создаем книгу и возврашаем ее же вместе с присвоенным **id**                                |
| `PUT`    | `/api/books/:id`  | редактировать книгу по **id** | редактируем объект книги, если запись не найдена вернем **Code: 404**                       |
| `DELETE` | `/api/books/:id`  | удалить книгу по **id**       | удаляем книгу и возвращаем ответ: **'ok'**                                                  |

### Этап 2

Обновлена структура роутинга проекта - переход на использование express.Router()

Добавлено два новых маршрута (для загрузки и скачивания обложки книги).

| Метод  | URL                       | Действие                            | Комментарий                                                                                                                                                           |
| ------ | ------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/books/:id/upload`   | добавить обложку книги по ее **id** | добавляем путь к файлу обложки книги, если файл не загружен вернем пустой **json**, если книга не найдена вернем **Code: 404**, в случае успеха вернется объект книги |
| `GET`  | `/api/books/:id/download` | скачать обложку книги по **id**     | скачивает файл-обложку книги по ее **id**                                                                                                                             |

Так как книги создаются виртуально при запуске сервера, сначала нужно загрузить файл книги по маршруту `/api/books/:id/upload`, а потом использовать маршрут `/api/books/:id/download` для скачивания.

#### Этап 3

В проект добавлен шаблонизатор **EJS**. Разработаны шаблоны для просмотра всех книг, создания книги, просмотра информации по книге, редактированию книги, а также шаблон страницы, обрабатывающий неверные адреса.

| Метод  | URL           | Действие                                         | Комментарий                                                            |
| ------ | ------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `GET`  | `/`           | просмотр списка книг                             |                                                                        |
| `GET`  | `/create`     | просмотр страницы создания книги                 | отображает пустую форму для создания книги                             |
| `POST` | `/create`     | создает новую книгу                              | после создания книги редирект на `/`                                   |
| `GET`  | `/view/:id`   | просмотр книги по **id**                         | просмотр книги по **id**, если не найдена редирект на 404-страницу     |
| `GET`  | `/update/:id` | просмотр страницы редактирования книги по **id** | отображает форму с заполненными данными о книге                        |
| `POST` | `/update/:id` | обновление информации о книге по **id**          | после обновления информации редирект на страницу просмотра `/view/:id` |
| `POST` | `/delete/:id` | удаление книги по **id**                         | после удаления книги редирект на `/`                                   |
