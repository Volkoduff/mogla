import BaseComponent from "./base-component";


export default class List extends BaseComponent {
    constructor(data) {
        super();
        this.dataArr = data;
    }

    onClickCounter(evt, it) {
        this.dataArr[it].clickCounter();
        debugger
        this.dataArr[it].text = `[ [${this.dataArr[it].click}]  ${it + 1} ->]`;
        console.log(`${this.dataArr[it].click}`)
        return this.dataArr;
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

