import BaseComponent from "./base-component";

const Status = {
  'pending': `Pending`,
  'out_of_stock': `Out of stock`,
  'in_stock': `In stock`,
};

export default class TableContent extends BaseComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return `${this._data !== undefined ? this._data.map((element) => `<tr class="table-row">
            <td>
                <p class="table-row-title" data-id="${element.id}">${element.title}</p>
                <span class="table-row-title__additional-option">${element.description}</span>
            </td>
            <td class="table-row__year">${element.year}</td>
            <td class="table-row__color"><span class="table-row__color-circle"></span></td>
            <td class="table-row__status">${Status[element.status]}</td>
            <td class="table-row__price">${element.price}</td>
            <td class="table-row__close">
                <button type="button" class="table-row__button">Удалить</button>
            </td>
        </tr>`).join(``) : `<td>
                <p>Автомобили в наличии отсутствуют</p>
            </td>`}`
  };
}
