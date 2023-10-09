/**
 * Создает элемент и размещает его на странице.
 *
 * @param {string} tagName Имя тега элемента.
 * @param {string} className Класс элемента.
 * @param {object} parent Родительский элемент, в который размещается созданный элемент.
 * @return {object} созданный элемент, с присвоенным классом.
 */
export function createElement(tagName, className, parent) {
  const element = document.createElement(tagName);
  element.className = className;
  parent.append(element);
  return element;
}

/**
 * Создает разметку для навигационных элементов с датами.
 *
 * @param {object} date экземпляр объекта Date.
 * @return {string} сформированную строку разметки.
 */
export function createDateElementHTML(date) {
  const day = date.getDate();
  const weekday = date.toLocaleString('ru-Ru', {
    weekday: 'short',
  });
  let isWeekend = false;

  if (weekday === 'вс' || weekday === 'сб') {
    isWeekend = true;
  }

  return `
    <span class="page-nav__day-week ${isWeekend ? 'page-nav__day_weekend' : ''}">${weekday}</span>
    <span class="page-nav__day-number ${isWeekend ? 'page-nav__day_weekend' : ''}">${day}</span>
  `;
}

/**
 * Добавляем дата-атрибуты для навигационных элементов с датами.
 *
 * @param {object} elemnt элемент разметки, которому необходимо добавить атрибуты.
 * @param {number} year год в числовом формате.
 * @param {number} month месяц в числовом формате.
 * @param {number} day месяц в числовом формате.
 */
export function createDateElementDataAttributes(element, year, month, day) {
  element.dataset.year = year;
  element.dataset.month = month;
  element.dataset.day = day;
}