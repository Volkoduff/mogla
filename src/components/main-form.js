import BaseComponent from "./base-component";

const Color = [`white`, `black`, `gray`, `red`, `green`];

export default class MainForm extends BaseComponent {
  constructor() {
    super();
  }

  onClickShowLabel(evt) {
    evt.target.previousElementSibling.classList.add('fade-up');
  };

  onBlurHideLabel(evt) {
    evt.target.addEventListener(`blur`, (evt) => this._removeInputLabel(evt))
  }

  _removeInputLabel(evt) {
    if (evt.target.value === '') {
      evt.currentTarget.previousElementSibling.classList.remove('fade-up');
    }
  };

  getTemplate() {
   return `<form class="form-request" action="#" autocomplete="off">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="input-wrap">
                            <label class="input-wrap__label" for="car-name-field">Название</label>
                            <input class="input-wrap__input" type="text" name="name" id="car-name-field" maxlength="40" placeholder="Название" required>
                        </div>
                    </div>
                    <div class="col-sm-4 col-6">
                        <div class="input-wrap">
                            <label class="input-wrap__label" for="car-year-field">Год</label>
                            <input class="input-wrap__input" placeholder="Год" type="number" name="year" id="car-year-field" data-placeholder="Год" required>
                        </div>
                    </div>
                    <div class="col-sm-4 col-6">
                        <div class="input-wrap">
                            <label class="input-wrap__label" for="car-price-field">Цена</label>
                            <input class="input-wrap__input" type="number" name="price" id="car-price-field" placeholder="Цена" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="input-wrap input-wrap__full-width">
                            <label class="input-wrap__label" for="car-description-field">Описание</label>
                            <input class="input-wrap__input_description input-wrap__input" type="text" name="description" id="car-description-field" placeholder="Описание" required>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="radio-wrap">
                            <span class="radio-title">Выберите цвет</span>
                           ${Color.map((el) => 
`<input type="radio" class="radio-wrap__input radio-wrap__input_${el}" name="color" value="${el}" data-color='${el}' id="${el}">
                            <label for="${el}"></label>`
   ).join(``)}
                        </div>
                    </div>
                    <div class="col-sm-4 col-6">
                        <select class="select" name="status" id="status">
                            <option value="" disabled>
                                Статус
                            </option>
                            <option value="in_stock" selected>
                                В наличии
                            </option>
                            <option value="pending">
                                Ожидается
                            </option>
                            <option value="out_of_stock">
                                Нет в наличии
                            </option>
                        </select>
                    </div>
                    <div class="col-sm-4 col-6">
                        <button class="button" type="submit">Отправить</button>
                    </div>
                </div>
            </form>`
  };
};
