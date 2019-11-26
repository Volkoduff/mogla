import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {render, unrender} from './components/utils'
import API from './components/api';
import Table from './components/table';
import List from './components/list';

const listContainer = document.querySelector(`.list`);
const list = new List();

const renderTable = (data) => {
    const table = new Table(data);
    const main = document.querySelector(`.main`);
    render(main, table.getElement());
};

const onClickRerender = (evt, it) => {
    list.onClickCounter(evt, it);
    unRenderList();
    debugger
    renderList();
};

const unRenderList = () => {
    unrender(list.getElement());
    list.removeElement();
};

const renderList = () => {
    [...list.getElement().querySelectorAll(`button`)].forEach((el, it) => {
        el.addEventListener(`click`, (evt) => {
            onClickRerender(evt, it);
        })
    });
    render(listContainer, list.getElement());
};

renderList();

// API.getData()
//     .then((data) => renderTable(data))
//     .then(() => renderList());

