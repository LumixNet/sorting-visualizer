import { arr, setArr } from "./config.js";
import { statusEl, syncTime } from "./dom-elements.js";
import { render } from "./rendering.js";
import { enableButtons } from "./buttons.js";

export function sortSync() {
  enableButtons(false); // Блокируем кнопки
  statusEl.textContent = "Синхронная сортировка...(UI заблокирован";

  // Измеряем время сортировки
  const start = performance.now();
  const sortArr = [...arr]; // Создаем копию массива
  const n = sortArr.length; // Длина массива

  // Сортировка пузырьком
  // Внешний цикл
  for (let i = 0; i < n - 1; i++) {
    // Внутренний цикл
    for (let j = 0; j < n - 1 - i; j++) {
      if (sortArr[j] > sortArr[j + 1]) {
        [sortArr[j], sortArr[j + 1]] = [sortArr[j + 1], sortArr[j]];
      }
    }
    // Вызываем render после каждого прохода
    // Экран все равно не обновится, так как главный поток занят циклом
    render(sortArr);
  }

  // Вычисляем время выполнения
  const duration = performance.now() - start;

  // Сохраняем отсортированный массив в глобальную переменную
  setArr(sortArr);

  // Финальная отрисовка
  render(arr);

  statusEl.textContent = `Синхронная сортировка завершена`;
  enableButtons(true); //Разблокируем кнопки
  syncTime.textContent = `Синхронно: ${duration.toFixed(2)} мс`;
}
