import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {render, unrender} from './components/utils'
import API from './components/api';
import Table from './components/table';
import List from './components/list';

const ListParam = {
    DEPTH: 3,
    LENGTH: 10,
};


const renderTable = (data) => {
    const table = new Table(data);
    const main = document.querySelector(`.main`);
    render(main, table.getElement());
};

const onClickRerender = (evt, it, element) => {
    element.onClickCounter(evt, it);
    renderList();
};

const renderList = () => {
    const listContainer = document.querySelector(`.list`);
    const list = new List(getButtonsData());
    [...list.getElement().querySelectorAll(`button`)].forEach((el, it) => {
        el.addEventListener(`click`, (evt) => {
            onClickRerender(evt, it, list);
        })
    });
    render(listContainer, list.getElement());
};

const getButtonsData = () => {
    const dataArr = [];
    Array.from(new Array(ListParam.LENGTH + 1))
        .forEach((el, it) => {
            if (it) {
                dataArr.push(getNewObj(it));
            }
        });
    return dataArr;
};

const getNewObj = (iterator) => {
    return {
        text: `[ [0]  ${iterator} ->]`,
        click: 0,
        clickCounter() {
            this.click++;
        }
    }
};

renderList();

// API.getData()
//     .then((data) => renderTable(data))
//     .then(() => renderList());

