import BaseComponent from "./base-component";

const ListParam = {
    DEPTH: 3,
    LENGTH: 10,
};

export default class List extends BaseComponent {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.getButtonsData();
    }

    getButtonsData() {
        this.dataArr = [];
        Array.from(new Array(ListParam.LENGTH + 1))
            .forEach((el, it) => {
                if (it) {
                    this.dataArr.push(List.getNewObj(it));
                }
            });
    };

    onClickCounter(evt, it) {
        this.dataArr[it].clickCounter();
        this.dataArr[it].text = `[ [${this.dataArr[it].click}]  ${it + 1} ->]`;
        console.log(`${this.dataArr[it].click}`);
        return this.dataArr;
    };

    static getNewObj(iterator) {
        return {
            text: `[ [0]  ${iterator} ->]`,
            click: 0,
            clickCounter() {
                this.click++;
            }
        }
    };

    getTemplate() {
        return `<ul>
        ${this.dataArr.map((el) => {
            return `<li><button>${el.text}</button></li>`
        }).join(``)
        }
            </ul>`
    }
}

