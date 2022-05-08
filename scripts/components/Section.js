export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // adds markup item to the end of the section container
  addItem(item) {
    this._container.append(item);
  }

  // renders all items added to the section using provided function
  renderItems() {
    this.clear();
    this._items.forEach(this._renderer);
  }

  // clears container of all items present
  clear() {
    this._container.innerHTML = '';
  }
}
