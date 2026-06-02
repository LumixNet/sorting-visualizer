import { enableButtons } from "./buttons.js";
import { arr, setArr } from "./config.js";
import { rafTime, statusEl } from "./dom-elements.js";
import { render } from "./rendering.js";

export function sortWithRaf() {
  // Блокируем кнопки
  enableButtons(false);

  // Показываем статус пользователю, что идет сортировка
  statusEl.textContent = "Сортировка через rAF";

  // Засекаем время
  const start = performance.now();

  // Создаем копию массива, чтобы сортировать именно копию,а не оригинал
  const sortArr = [...arr]; //immutable array
  const n = sortArr.length; // Сколько всего элементов в массиве

  // Счетчик проходов объявляем вне функции step()
  // Это создает замыкание - step() будет видеть и изменять i
  let i = 0;

  // Функция step участвует на каждом шаге сортировки
  function step() {
    // Проверяем, остались ли еще проходы?
    if (i < n - 1) {
      // Один проход Bubble Sort
      // Внутренний цикл, где меняются элементы местами
      for (let j = 0; j < n - 1 - i; j++) {
        // Если условие истинно, то меняем элементы местами
        if (sortArr[j] > sortArr[j + 1]) {
          // Меняем местами элементы
          [sortArr[j], sortArr[j + 1]] = [sortArr[j + 1], sortArr[j]];
        }
      }
      // Отрисовываем текущее состояние
      render(sortArr);

      // Увеличиваем счетчик
      i++;

      // Планируем следующий шаг
      // requestAnimationFrame не вызывает step() сразу
      // Он планирует вызов перед следующей отрисовкой (~16 мс)
      requestAnimationFrame(step);
    } else {
      // Сортировка завершена
      const duration = performance.now() - start; // Реальное время сортировки

      // Заменяем массив после сортировки
      setArr(sortArr);
      render(arr);

      // Показываем новый статус пользователю

      statusEl.textContent = "raf-сортировка завершена!";

      // Показываем пользователю время сортировки
      rafTime.textContent = `raf: ${duration.toFixed(2)} мс`;

      // Разблокируем кнопки
      enableButtons(true);
    }
  }

  // Запускаем первый шаг
  // После этого sortWithRaf() сразу завершится
  // Сортировка продолжится асинхронно

  requestAnimationFrame(step);
}
