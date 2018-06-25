import s from './demo-component.scss';
import SlideRuler from './slide-ruler';

class DemoComponent {
  constructor(options = {}) {
    this.options = {
      container: '',
      valueEl: ''
    };

    Object.assign(this.options, options);

    this.init();
  }

  _renderContainer() {
    const {typeName} = this.options,
      container = document.createElement('div');
    this.options.container = container;
    container.className = s.container;
    container.innerHTML = `<div class="${s.type}"><h6 class="${s.typeName}">${typeName}</h6></div>`;
    document.querySelector('#demo').appendChild(container);
    this._renderValueContainer();
    this._renderRuler();
  }

  _renderValueContainer() {
    const {currentValue, unit} = this.options,
      valueContainer = document.createElement('div');
    valueContainer.className = s.valueContainer;
    const valueEl = document.createElement('span');
    this.options.valueEl = valueEl;
    valueEl.className = s.value;
    valueEl.innerText = currentValue;
    valueContainer.appendChild(valueEl);
    const valueUnit = document.createElement('i');
    valueUnit.innerText = unit;
    valueContainer.appendChild(valueUnit);
    this.options.container.appendChild(valueContainer);
  }

  _renderRuler() {
    const {maxValue, minValue, currentValue, precision = 1} = this.options;
    new SlideRuler({
      el: this.options.container,
      handleValue: this.handleValue.bind(this),
      maxValue: maxValue,
      minValue: minValue,
      currentValue: currentValue,
      precision: precision
    });
  }

  handleValue(value) {
    this.options.valueEl.innerHTML = value;
  }

  init() {
    this._renderContainer();
  }
}

export default DemoComponent;
