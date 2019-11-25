import {carsData} from './../mocks'
import {Position, render, unrender} from './../utils';
import MainForm from './../main-form';
import Table from './../table';
const doSomethingElse = () => {
  console.log(`nextStep`)
};
const doSomething = () => {
  console.log(`firstStep`)
};

const mainForm = new MainForm();
const formTitle = document.querySelector(`.form-title`);
const tableTitle = document.querySelector(`.table-title`);

export default class AppController {
  constructor() {
    this._carsData = carsData;
  }

  init() {

    const promise = new Promise(doSomething);

    promise.then(doSomethingElse());



    render(formTitle, mainForm.getElement(), Position.AFTER);

    mainForm.getElement().addEventListener(`submit`, (evt) => this._onSubmitDataChange(evt, this._carsData));

    [...mainForm.getElement().querySelectorAll(`.input-wrap__input`)]
      .forEach((label) => label
        .addEventListener(`click`, (evt) => {
          mainForm.onClickShowLabel(evt);
          mainForm.onBlurHideLabel(evt);
        }));

    this._renderTable();
  }

  _onclickDelete(evt) {
    const index = this._carsData.findIndex((car) => car.id === +evt.target.dataset.id);
    this._carsData = [...this._carsData.slice(0, index), ...this._carsData.slice(index + 1)];

    this._reRenderTable();
  }

  _onSubmitDataChange(evt, data = []) {
    evt.preventDefault();
    const entry = {};
    const formData = new FormData(mainForm.getElement());
    formData.getAll(`textarea`);
    entry.id = data.length;
    entry.title = formData.get(`name`);
    entry.description = formData.get(`description`);
    entry.year = formData.get(`year`);
    entry.color = formData.get(`color`);
    entry.status = formData.get(`status`);
    entry.price = formData.get(`price`);
    data.push(entry);
    this._reRenderTable(data);
  }

  _reRenderTable() {
    unrender(this._table.getElement());
    this._table.removeElement();
    this._renderTable();
  }

  _renderTable() {
    this._table = new Table(this._carsData);

    [...this._table.getElement().querySelectorAll(`.table-row__button-remove`)]
      .forEach((button) => button
        .addEventListener(`click`, (evt) => this._onclickDelete(evt)));

    render(tableTitle, this._table.getElement(), Position.AFTER);

  }
}


