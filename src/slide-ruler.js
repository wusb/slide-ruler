import s from './slide-ruler.scss';

class sliderRuler {
  constructor(options = {}) {
    this.value = '';
    this.options = {
      canvasWidth: document.body.clientWidth || 375,
      canvasHeight: 83,
      boxColor: '#E4E4E4',
      scrollLeft: 0,
      heightDecimal: 35,
      heightDigit: 18,
      lineWidth: 2,
      colorDecimal: '#E4E4E4',
      colorDigit: '#E4E4E4',
      divide: 10,
      precision: 2,
      fontSize: 20,
      fontColor: '#666',
      maxValue: 230,
      minValue: 100,
      currentValue: 160
    };

    this.localState = {
      startX: 0,
      startY: 0,
      isMove: false,
      isTouchEnd: true,
      touchPoints: []
    };

    Object.assign(this.options, options);

    this.init(options);
  }

  _renderBox(container) {
    const box = document.createElement('div'), canvas = document.createElement('canvas');
    this.canvas = canvas;
    box.className = s.box;
    box.appendChild(canvas);
    container.appendChild(box);
    this._renderCanvas();
  }

  _renderCanvas() {
    const {canvasWidth, canvasHeight} = this.options, canvas = this.canvas;
    canvas.width = canvasWidth * 2;
    canvas.height = canvasHeight * 2;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.className = s.canvas;
    canvas.ontouchstart = this.touchStart.bind(this);
    canvas.ontouchmove = this.touchMove.bind(this);
    canvas.ontouchend = this.touchEnd.bind(this);
    this.dreawCanvas();
  }

  touchStart(e) {
    e.preventDefault();
    if (e.touches.length === 1 || this.localState.isTouchEnd) {
      this.touchPoints(e);
      let touch = e.touches[0];
      this.localState.startX = touch.pageX;
      this.localState.startY = touch.pageY;
      this.localState.startT = new Date().getTime(); // 记录手指按下的开始时间
      this.localState.isMove = false; // 是否产生滑动
      this.localState.isTouchEnd = false; // 当前开始滑动
    }
  }

  touchMove(e) {
    this.touchPoints(e);
    let touch = e.touches[0],
      deltaX = touch.pageX - this.localState.startX,
      deltaY = touch.pageY - this.localState.startY;
    // 如果X方向上的位移大于Y方向，则认为是左右滑动
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(Math.round(deltaX / this.options.divide)) > 0) {
      if (!this.rebound(deltaX)) {
        return;
      }
      this.moveDreaw(deltaX);
      this.localState.isMove = true;
      this.localState.startX = touch.pageX;
      this.localState.startY = touch.pageY;
    }
  }

  touchEnd() {
    this.moveDreaw(this.inertialShift());
    this.localState.isTouchEnd = true;
    this.localState.touchPoints = [];
    this.canvas.style.transform = 'translate3d(0, 0, 0)';
  }

  touchPoints(e) {
    let touch = e.touches[0],
      time = new Date().getTime(),
      shift = touch.pageX;
    this.localState.touchPoints.push({time: time, shift: shift});
  }

  inertialShift() {
    let s = 0;
    if (this.localState.touchPoints.length >= 4) {
      let _points = this.localState.touchPoints.slice(-4),
        v = ((_points[3].shift - _points[0].shift) / (_points[3].time - _points[0].time)) * 1000; // v 手指离开屏幕后的速度px/s
      const a = 6000; // a 手指离开屏幕后的加速度
      s = Math.sign(v) * Math.pow(v, 2) / (2 * a); // s 手指离开屏幕后惯性距离
    }
    return s;
  }

  rebound(deltaX) {
    const {currentValue, maxValue, minValue} = this.options;
    if ((currentValue === minValue && deltaX > 0) || currentValue === maxValue && deltaX < 0) {
      let reboundX = Math.sign(deltaX) * 1.5988 * Math.pow(Math.abs(deltaX), 0.7962);
      this.canvas.style.transform = `translate3d(${reboundX}px, 0, 0)`;
      return false;
    }
    return true;
  }

  moveDreaw(shift) {
    const {divide} = this.options;
    let moveValue = Math.round(-shift / divide),
      _moveValue = Math.abs(moveValue);
    let draw = () => {
      if (_moveValue < 1) {
        return;
      }
      this.options.currentValue += Math.sign(moveValue);
      this.dreawCanvas();
      window.requestAnimationFrame(draw);
      _moveValue--;
    };

    draw();
  }

  dreawCanvas() {
    const canvas = this.canvas,
      context = canvas.getContext('2d');
    canvas.height = canvas.height;
    let {canvasWidth, canvasHeight, maxValue, minValue, currentValue, precision, divide, heightDecimal, heightDigit, lineWidth, colorDecimal, colorDigit, fontSize, fontColor} = this.options;
    currentValue = currentValue > minValue ? (currentValue < maxValue ? currentValue : maxValue) : minValue;
    this.options.currentValue = currentValue;
    console.log('currentValue:', currentValue);
    // 1.1 定义原点，x轴方向起点与终点各留半屏空白
    let diffCurrentMin = (currentValue - minValue) * divide,
      startValue = currentValue - Math.floor(canvasWidth / 2 / divide * precision);
    startValue = startValue > minValue ? (startValue < maxValue ? startValue : maxValue) : minValue;
    let endValue = startValue + canvasWidth / divide * precision;
    endValue = endValue < maxValue ? endValue : maxValue;
    let origin = {x: diffCurrentMin > canvasWidth / 2 ? (canvasWidth / 2 - (currentValue - startValue) * divide) * 2 : (canvasWidth / 2 - diffCurrentMin) * 2, y: canvasHeight * 2};
    // 1.2 定义刻度线样式
    heightDecimal = heightDecimal * 2;
    heightDigit = heightDigit * 2;
    lineWidth = lineWidth * 2;
    // 1.3 定义刻度字体样式
    fontSize = fontSize * 2;
    // 1.4 总刻度值

    // 1.5 每个刻度所占位的px
    divide = divide * 2;
    // 1.6定义每个刻度的精度
    const derivative = 1 / precision;

    for (let i = startValue / precision; i <= endValue / precision; i++) {
      console.log(origin.x, i, startValue);
      context.beginPath();
      // 2.2 画刻度线
      context.moveTo(origin.x + (i - startValue / precision) * divide, 0);
      // 画线到刻度高度，10的位数就加高
      context.lineTo(origin.x + (i - startValue / precision) * divide, i % 10 === 0 ? heightDecimal : heightDigit);
      context.lineWidth = lineWidth;
      // 10的位数就加深
      context.strokeStyle = (i % 10 === 0) ? colorDecimal : colorDigit;
      context.stroke();
      // 描绘刻度值
      context.fillStyle = fontColor;
      context.textAlign = 'center';
      context.textBaseline = 'top';
      if (i % 10 === 0) {
        context.font = `${fontSize}px Arial`;
        context.fillText(Math.round(i / 10) / (derivative / 10), origin.x + (i - startValue / precision) * divide, heightDecimal);
      }
      context.closePath();
    }
  }

  init(options) {
    this._renderBox(options.el);
  }
}

export default sliderRuler;
