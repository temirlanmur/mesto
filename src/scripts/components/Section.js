export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  // adds markup item to the end of the section container
  appendItem(item) {
    this._container.append(item);
  }

  // adds markup item at the front of the section container
  prependItem(item) {
    this._container.prepend(item);
  }

  // renders items using provided renderer
  renderItems({ items, renderer }) {
    this.clearItems();
    items.forEach(renderer);
  }

  // clears the section of all items present
  clearItems() {
    this._container.innerHTML = '';
  }
}
