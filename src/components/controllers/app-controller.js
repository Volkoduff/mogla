import {carsData} from './../mocks'
import MainForm from './../main-form';
import Table from './../table';
import {Position, render} from './../utils';

const mainForm = new MainForm();
const formTitle = document.querySelector(`.form-title`);
const tableTitle = document.querySelector(`.table-title`);
const table = new Table(carsData);

export default class AppController {
  constructor() {
  }

  init() {
    render(formTitle, mainForm.getElement(), Position.AFTER);
    render(tableTitle, table.getElement(), Position.AFTER);
    mainForm.getElement().addEventListener(`submit`, (evt) => this._onSubmitDataChange(evt));
  }

  _onSubmitDataChange(evt) {
    evt.preventDefault();
    this.data = {};
    const formData = new FormData(mainForm.getElement());
    formData.getAll(`textarea`);
    this.data.year = formData.get(`year`);
    this.data.name = formData.get(`name`);
    this.data.price = formData.get(`price`);
    this.data.description = formData.get(`description`);
    this.data.color = formData.get(`color`);
    this.data.status = formData.get(`status`);
  debugger
    this.data
  }

}
