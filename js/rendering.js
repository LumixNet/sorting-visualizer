import { container } from "./dom-elements.js";

// Функция отрисовки массива
export function render(array) {
  container.textContent = ""; // Очищаем контейнер от старых столбиков
  // Проходим по массиву столбиков и отрисовываем каждый из них
  array.forEach((val) => {
    const bar = document.createElement("div"); // Строим отдельный столбик
    bar.classList.add("bar");
    bar.style.height = val + "px";
    container.appendChild(bar); // Добавляем созданный столбик в контейнер
  });
}
