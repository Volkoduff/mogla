import BaseComponent from "./base-component";

export default class Loader extends BaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="loader">
  <div class="spinner spinner__page-loader" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>`
  };
}


