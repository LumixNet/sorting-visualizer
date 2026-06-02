import { arr, setArr, SIZE } from "./config.js";
import { statusEl, syncTime, workerTime } from "./dom-elements.js";
import { render } from "./rendering.js";
import { enableButtons } from "./buttons.js";

export function sortWithWorker() {
  enableButtons(false); // Блокируем кнопки
  statusEl.textContent = "Сортировка через Worker...";

  // Измеряем время сортировки
  const start = performance.now();

  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });

  worker.onmessage = function (event) {
    const { type, arr: sortedArr, step } = event.data;

    if (type === "progress") {
      render(sortedArr); // Показываем промежуточный результат пользователю
      statusEl.textContent = `Worker: проход ${step + 1} из ${SIZE - 1}`;
    } else if (type === "done") {
      // Сортировка завершена
      // Вычисляем время выполнения сортировки
      const duration = performance.now() - start;

      // Сохраняем отсортированный массив в глобальную переменную
      setArr(sortedArr);

      // Финальная отрисовка
      render(arr);

      statusEl.textContent = "Worker сортировка завершена";
      enableButtons(true); // Разблокируем кнопки
      workerTime.textContent = `Worker: ${duration.toFixed(2)} мс`;

      // Очистка ресурсов
      worker.terminate();
    }
  };

  // Запуск Worker
  worker.postMessage([...arr]);
}
