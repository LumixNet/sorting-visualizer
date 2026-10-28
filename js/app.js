//  Главный модуль
// console.log(главный модуль)
//  Подключаем конфигурацию
import { enableButtons } from "./buttons.js";
import { arr, SIZE, MAX_VALUE, setArr } from "./config.js";

// DOM элементы
import { resetBtn, statusEl, syncBtn, rafBtn, workerBtn } from "./dom-elements.js";
import { render } from "./rendering.js";

// Сортировка
import { sortSync } from "./sort-sync.js";
import { sortWithRaf } from "./sort-raf.js";
import { sortWithWorker } from "./sort-worker.js";


// Побочный эффект: спиннер
// Этот модуль ничего не экспортирует, но его код выполняется
import "./spinner.js"; //Просто выполняем код

// Генерация случайного массива чисел
function generateArray() {
  const width = window.innerWidth;

  const count =
    width <= 480 ? 40 :
    width < 1024 ? 120 :
    SIZE;

  const newArr = Array.from(
    { length: count },
    () => Math.floor(Math.random() * MAX_VALUE) + 1,
  );
  //  console.log(Math.floor(Math.random()) * MAX_VALUE +1)
  setArr(newArr);

  // Отрисовываем массив
  render(arr);

  // Обновляем статус
  statusEl.textContent = `Массив создан.Выберите сортировку`;

  // Активируем все кнопки
  enableButtons(true)
}
// Добавляем обработчики событий к кнопкам
resetBtn.addEventListener(`click`, generateArray);
syncBtn.addEventListener(`click`, sortSync);
rafBtn.addEventListener(`click`, sortWithRaf);
workerBtn.addEventListener(`click`, sortWithWorker);


// Создаем массив сразу после загрузки страницы и отрисовываем его
generateArray();
