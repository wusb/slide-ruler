/*
 * @Desc: slide ruler
 * @Author: simbawu
 * @Date: 2019-04-16 20:15:13
 * @LastEditors: simbawu
 * @LastEditTime: 2019-08-07 14:00:00
 */
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
      precision: 1,
      fontSize: 20,
      fontColor: '#666',
      fontMarginTop: 35,
      maxValue: 230,
      minValue: 100,
      currentValue: 160
    };

    this.localState = {
      startX: 0,
      startY: 0,
      isTouchEnd: true,
      touchPoints: []
    };

    this.browserEnv = window.hasOwnProperty('ontouchstart');

    this.options = { ...this.options, ...options };

    this.init(this.options);
  }

  _renderBox(container) {
    const box = document.createElement('div'),
      canvas = document.createElement('canvas');
    this.canvas = canvas;
    box.className = s.box;
    box.appendChild(canvas);
    container.appendChild(box);
    this._renderCanvas();
  }

  _renderCanvas() {
    const { canvasWidth, canvasHeight } = this.options,
      canvas = this.canvas;
    canvas.width = canvasWidth * 2;
    canvas.height = canvasHeight * 2;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.className = s.canvas;
    if (this.browserEnv) {
      canvas.ontouchstart = this.touchStart.bind(this);
      canvas.ontouchmove = this.touchMove.bind(this);
      canvas.ontouchend = this.touchEnd.bind(this);
    } else {
      canvas.onmousedown = this.touchStart.bind(this);
      canvas.onmousemove = this.touchMove.bind(this);
      canvas.onmouseup = this.touchEnd.bind(this);
    }
    this.dreawCanvas();
  }

  touchStart(e) {
    e.preventDefault();
    if (e || this.localState.isTouchEnd) {
      this.touchPoints(e);
      let touch = (e.touches && e.touches[0]) || e;
      this.localState.startX = touch.pageX;
      this.localState.startY = touch.pageY;
      this.localState.startT = new Date().getTime(); // 记录手指按下的开始时间
      this.localState.isTouchEnd = false; // 当前开始滑动
    }
  }

  touchMove(e) {
    if (!this.browserEnv && (e.which !== 1 || e.buttons === 0)) return; // pc canvas超出边界处理
    this.touchPoints(e);
    let touch = (e.touches && e.touches[0]) || e,
      deltaX = touch.pageX - this.localState.startX,
      deltaY = touch.pageY - this.localState.startY;
    // 如果X方向上的位移大于Y方向，则认为是左右滑动
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(Math.round(deltaX / this.options.divide)) > 0
    ) {
      if (this.browserEnv && !this.rebound(deltaX)) {
        return;
      }
      this.moveDreaw(deltaX);
      this.localState.startX = touch.pageX;
      this.localState.startY = touch.pageY;
    }
  }

  touchEnd() {
    this.moveDreaw(this.browserEnv ? this.inertialShift() : 0);
    this.localState.isTouchEnd = true;
    this.localState.touchPoints = [];
    this.canvas.style.transform = 'translate3d(0, 0, 0)';
  }

  touchPoints(e) {
    let touch = (e.touches && e.touches[0]) || e,
      time = new Date().getTime(),
      shift = touch.pageX;
    this.localState.touchPoints.push({ time: time, shift: shift });
  }

  inertialShift() {
    let s = 0;
    if (this.localState.touchPoints.length >= 4) {
      let _points = this.localState.touchPoints.slice(-4),
        v =
          ((_points[3].shift - _points[0].shift) /
            (_points[3].time - _points[0].time)) *
          1000; // v 手指离开屏幕后的速度px/s
      const a = 6000; // a 手指离开屏幕后的加速度
      s = (Math.sign(v) * Math.pow(v, 2)) / (2 * a); // s 手指离开屏幕后惯性距离
    }
    return s;
  }

  rebound(deltaX) {
    const { currentValue, maxValue, minValue } = this.options;
    if (
      (currentValue === minValue && deltaX > 0) ||
      (currentValue === maxValue && deltaX < 0)
    ) {
      let reboundX =
        Math.sign(deltaX) * 1.5988 * Math.pow(Math.abs(deltaX), 0.7962);
      this.canvas.style.transform = `translate3d(${reboundX}px, 0, 0)`;
      return false;
    }
    return true;
  }

  moveDreaw(shift) {
    const { divide, precision } = this.options;
    let moveValue = Math.round(-shift / divide),
      _moveValue = Math.abs(moveValue),
      draw = () => {
        if (_moveValue < 1) {
          return;
        }
        this.options.currentValue += Math.sign(moveValue) * precision;
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
    let {
      canvasWidth,
      canvasHeight,
      maxValue,
      minValue,
      currentValue,
      handleValue,
      precision,
      divide,
      heightDecimal,
      heightDigit,
      lineWidth,
      colorDecimal,
      colorDigit,
      fontSize,
      fontColor,
      fontMarginTop
    } = this.options;
    // 计算当前值
    currentValue =
      currentValue > minValue
        ? currentValue < maxValue
          ? currentValue
          : maxValue
        : minValue;
    currentValue =
      (Math.round((currentValue * 10) / precision) * precision) / 10;
    this.options.currentValue = currentValue;
    handleValue && handleValue(currentValue);
    let diffCurrentMin = ((currentValue - minValue) * divide) / precision,
      startValue =
        currentValue - Math.floor(canvasWidth / 2 / divide) * precision;
    startValue =
      startValue > minValue
        ? startValue < maxValue
          ? startValue
          : maxValue
        : minValue;
    let endValue = startValue + (canvasWidth / divide) * precision;
    endValue = endValue < maxValue ? endValue : maxValue;
    // 定义原点
    let origin = {
      x:
        diffCurrentMin > canvasWidth / 2
          ? (canvasWidth / 2 -
              ((currentValue - startValue) * divide) / precision) *
            2
          : (canvasWidth / 2 - diffCurrentMin) * 2,
      y: canvasHeight * 2
    };
    // 定义刻度线样式
    heightDecimal = heightDecimal * 2;
    heightDigit = heightDigit * 2;
    lineWidth = lineWidth * 2;
    // 定义刻度字体样式
    fontSize = fontSize * 2;
    fontMarginTop = fontMarginTop * 2;
    // 每个刻度所占位的px
    divide = divide * 2;
    // 定义每个刻度的精度
    const derivative = 1 / precision;

    for (
      let i = Math.round((startValue / precision) * 10) / 10;
      i <= endValue / precision;
      i++
    ) {
      context.beginPath();
      // 画刻度线
      context.moveTo(origin.x + (i - startValue / precision) * divide, 0);
      // 画线到刻度高度，10的位数就加高
      context.lineTo(
        origin.x + (i - startValue / precision) * divide,
        i % 10 === 0 ? heightDecimal : heightDigit
      );
      context.lineWidth = lineWidth;
      // 10的位数就加深
      context.strokeStyle = i % 10 === 0 ? colorDecimal : colorDigit;
      context.stroke();
      // 描绘刻度值
      context.fillStyle = fontColor;
      context.textAlign = 'center';
      context.textBaseline = 'top';
      if (i % 10 === 0) {
        context.font = `${fontSize}px Arial`;
        context.fillText(
          Math.round(i / 10) / (derivative / 10),
          origin.x + (i - startValue / precision) * divide,
          fontMarginTop
        );
      }
      context.closePath();
    }
  }

  init(options) {
    this._renderBox(options.el);
  }
}

export default sliderRuler;