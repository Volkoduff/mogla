import BaseComponent from "./base-component";

export default class Table extends BaseComponent {
    constructor(data) {
        super();
        this.data = data;
    }

    getTemplate() {
        return `<table class="table-striped">
                <tr>
                    <th>Название файла</th>
                    <th>Язык</th>
                    <th>Ссылка</th>
                </tr>
                   ${this.data.map((el) => `<tr>
 <td>${el.filename}</td>
                    <td>${el.language}</td>
                    <td>${el.raw_url}</td>
</tr>`).join(``)}
            </table>`
    }
}
