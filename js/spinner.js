import { spinner } from "./dom-elements.js";

let angle = 0; // Текущий угол поворота спиннера (в градусах)
const ROTATION_SPEED = 6; // Скорость вращения (градусов за 1 тик)

// Интервал обновления
// 60 FPS. 1000 / 60 = 16.6 мс ~ 16 мс
const INTERVAL = 16; // мс

// Основная функция спиннера
function rotateSpinner() {
  angle += ROTATION_SPEED; // Увеличиваем угол

  // Сбрасываем угол после полного поворота
  if (angle >= 360) {
    angle = 0; // Вращение пойдет с нуля / снова
  }

  // Задаем текущий угол у спиннера
  spinner.style.transform = `rotate(${angle}deg)`;
}

// Запускаем вращение спиннера
setInterval(rotateSpinner, INTERVAL);
