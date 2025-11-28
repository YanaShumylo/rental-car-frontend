# RentalCar

**RentalCar** — це веб-додаток для оренди автомобілів, створений на базі [Next.js](https://nextjs.org). Додаток дозволяє користувачам швидко знаходити та бронювати автомобілі, переглядати деталі машин, фільтрувати за брендами, ціною та пробігом.

## Основні функції

- Пошук автомобілів за брендом, ціною та пробігом.
- Бронювання автомобіля через інтерактивну форму.
- Відображення детальної інформації про автомобіль.
- Адаптивний дизайн для різних пристроїв.
- Оптимізовані шрифти за допомогою [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).

## Початок роботи

### Встановлення

1. Клонуйте репозиторій:

```bash
git clone https://github.com/yourusername/rentalcar.git
cd rentalcar

2. Встановіть залежності:

npm install
# або
yarn install
# або
pnpm install

3. Запуск у режимі розробки:

npm run dev
# або
yarn dev
# або
pnpm dev


Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

### Структура проекту

- `app/` — сторінки та компоненти Next.js App Router.
- `components/` — повторно використовувані React-компоненти.
- `store/` — глобальний стан додатку через Zustand.

## Використання

1. Виберіть бренд та ціну у фільтрах.
2. Вкажіть діапазон пробігу автомобіля.
3. Натисніть кнопку **Search**, щоб переглянути результати.
4. На сторінці автомобіля заповніть форму бронювання.
5. Натисніть **Send**, щоб забронювати автомобіль.

## Автор

**Шумило Яна**  
Email: yanashumylo07@gmail.com  
GitHub: [YanaShumylo](https://github.com/YanaShumylo/rental-car-frontend)

## Деплой на Vercel

Найпростіший спосіб розгорнути додаток — використовувати [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).  
Більш детальну документацію можна знайти [тут](https://nextjs.org/docs/app/building-your-application/deploying).
