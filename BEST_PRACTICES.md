## 1. Розділення відповідальності за допомогою Custom Hooks
Я реалізував розділення логіки та представлення. Всю ігрову механіку винесено у кастомний хук `useGameController`. Цей хук працює як обгортка (контроллер), яка поєднує та синхронізує роботу менших спеціалізованих хуків (`useGame`, `usePuzzle`, `useTimer`), надаючи компоненту `MainPage` лише готовий інтерфейс для відображення.

* **Логіка контролера:**
  [useGameController.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/hooks/game/useGameController.jsx)
* **Логіка стану гри:**
  [useGame.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/hooks/game/useGame.jsx)
* **Генерація пазлу:**
  [usePuzzle.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/hooks/common/usePuzzle.jsx)
* **Таймер:**
  [useTimer.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/hooks/common/useTimer.jsx)
* **Використання в UI:**
  [MainPage.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/pages/MainPage.jsx#L18C1-L20C142)
  
## 2. Модульний Global State Management за допомогою Zustand
Я не використовував один великий store, який ще називають *God Object* (об'єкт який керує всім станом), натомість було реалізовано модульність. Модуль `uiStore` відповідає виключно за інтерфейс, модулі `settingsStore` та `resultsStore` керують даними. Це забезпечує слабку зв'язність компонентів та дозволяє гнучко використовувати *persist* лише для необхідних даних.

* **UI Store:**
  [uiStore.js](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/store/ui/uiStore.js)
* **Settings Store:**
  [settingsStore.js](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/store/domain/settingsStore.js)
* **Results Store:**
  [resultsStore.js](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/store/domain/resultsStore.js)
* **Приклад використання сторів у MainPage.jsx:**
  [MainPage.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/pages/MainPage.jsx#L13-L17)

## 3. Використання Context API та паттерну Provider
Для управління авторизацією я використав Context. Це запобігає *Prop Drilling* (передачі пропсів через багато рівнів компонентів). Я обгорнув додаток у провайдер `AuthProvider`, завдяки чому дані користувача та методи входу і виходу доступні глобально у коді.

* **Реалізація провайдера (контексту):**
  [AuthContext.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/contexts/AuthContext.jsx)
* **Звернення до контексту в компоненті:**
  [Header.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/components/common/Header.jsx#L6C3-L6C47)

## 4. Використання захищених маршрутів
Щоб уникати дублювання перевірки авторизації у компонентах, я створив компоненти `ProtectedRoute` та `GuestRoute`, які працюють як обгортки. Вони перевіряють права доступу і автоматично перенаправляють користувача, якщо він не має права переглядати сторінку. Це дозволяє тримати логіку безпеки в одному місці.

* **Захищений маршрут, для приватних сторінок:**
  [ProtectedRoute.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/components/common/routes/ProtectedRoute.jsx)
* **Гостьовий маршрут, для сторінок входу:**
  [GuestRoute.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/components/common/routes/GuestRoute.jsx)
* **Використання в роутері:**
  [App.jsx](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/App.jsx#L32-L39)

## 5. Декларативна валідація форм
Я не використовував довгі перевірки через *if-else*, які здатні забруднити код. Натомість, я використав підхід валідації за допомогою схем бібліотеки Yup. Правила валідації описані окремою схемою, що робить форми чистими, а логіку правил валідації - зручною для читання та модифікації.

* **Схема валідації налаштувань:**
  [SettingsModal.jsx (Schema)](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/components/common/modal/SettingsModal.jsx#L12-L20)
* **Підключення резолвера, для користування схемами, до хука форми:**
  [SettingsModal.jsx (useForm)](https://github.com/Hokaigo/COP/blob/fa5485a3788b8a81eab9aecc0aaee86e2c5975e5/src/components/common/modal/SettingsModal.jsx#L30)
