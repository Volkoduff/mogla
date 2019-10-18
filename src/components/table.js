import BaseComponent from "./base-component";

const TABLE_TITLES = [`Название`, `Год`, `Цвет`, `Статус`, `Цена`, ``];
const Status = {
  'pending': `Pending`,
  'out_of_stock': `Out of stock`,
  'in_stock': `In stock`,
};

export default class Table extends BaseComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  _getMaskedPrice(price) {
    const result = [];
    price.toString().split('').reverse()
      .forEach((number, i) => {
        i % 3 === 0 ? result.push(`${number} `) : result.push(number);
    });
    return result.reverse().join('').concat(` &#8381`);
  }

  _getMobileTemplate() {
    return `<div>${this._data.map((element) => `<div class="table-row-mobile"><p class="table-row-title" data-id="${element.id}">${element.title}</p>
              <span class="table-row__color-circle">${element.color}</span>
              <span class="table-row__price">${element.price}</span>
              <span class="table-row-title__additional-option">${element.description}</span>
              <p class="table-row__year">${element.year}</p>
              <p class="table-row__status">${element.status}</p>
              <button type="button" class="table-row__button-remove" data-id="${element.id}">Удалить</button>
            </div>`).join(``)}</div>`
  }

  _getRetinaTemplate() {
    return `<table class="table">
  <thead>
    <tr>
        ${TABLE_TITLES.map((title) => `<th>${title}</th>`).join(``)}
    </tr>
    </thead>
    <tbody>
    ${this._data.length ? this._data.map((element) => `<tr class="table-row">
            <td>
                <p class="table-row-title" data-id="${element.id}">${element.title}</p>
                <span class="table-row-title__additional-option">${element.description}</span>
            </td>
            <td class="table-row__year">${element.year}</td>
            <td class="table-row__color"><span class="table-row__circle table-row__${element.color}-circle"></span></td>
            <td class="table-row__status">${Status[element.status]}</td>
            <td class="table-row__price">${this._getMaskedPrice(element.price)}</td>
            <td class="table-row__close">
                <button type="button" class="table-row__button-remove" data-id="${element.id}">Удалить</button>
            </td>
        </tr>`).join(``) : `<tr ><td colspan="6"><span>Автомобили в наличии отсутствуют</span>
            </td></tr>`}
    </tbody>
  </table>`
  }

  getTemplate() {
    debugger
    return `${screen.width > 800 ? this._getRetinaTemplate() : this._getMobileTemplate()}`
  };
}
