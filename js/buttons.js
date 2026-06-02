import { syncBtn, rafBtn } from "./dom-elements.js";

// Управление состоянием кнопок
export function enableButtons(enabled) {
  syncBtn.disabled = !enabled; // Переворачиваем статус кнопки на противоположенный
  rafBtn.disabled = !enabled;
  // Если кнопка была включена, она отключится и наоборот
}
