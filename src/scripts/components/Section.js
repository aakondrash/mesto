export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items = this._items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
