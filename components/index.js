/**
 * Created by simba on 01/02/2018.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import s from './index.scss'

class SlideRuler extends React.Component {

  constructor() {
    super();
    this.state = {
      containerWidth: 320,
      canvasHeight: 83,
      canvasWidth: 320,
      boxColor: '#8b8b8b',
      scrollLeft: 0,
      heightDecimal: 35,
      heightDigit: 18,
      lineWidth: 2,
      colorDecimal: '#909090',
      colorDigit: '#b4b4b4',
      divide: 10,
      precision: 1,
      fontSize: 20,
      fontColor: '#666666',
      maxValue: 230,
      minValue: 100,
      currentValue: 0
    };

    this.initCanvas = this.initCanvas.bind(this);
    this.initDates = this.initDates.bind(this);
    this.drawRuler = this.drawRuler.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  componentDidMount(){
    setTimeout(() => {
      this.initCanvas(this.props);
    }, 0);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.currentValue != nextProps.currentValue){
      this.setState({
        currentValue: nextProps.currentValue
      },()=>{
        this.handleCurrentValue();
      })
    }
  }

  initCanvas(data){
    new Promise((resolve, reject)=>{
      resolve(this.initDates(data))
    }).then(()=>{
      this.handleCurrentValue();
    })
  }

  initDates(data){
    let maxValue = data.maxValue || this.state.maxValue;
    let minValue = data.minValue || this.state.minValue;
    let currentValue = data.currentValue || this.state.currentValue;
    let divide = data.divide || this.state.divide;
    let precision = data.precision || this.state.precision;
    let containerWidth = data.containerWidth || ReactDOM.findDOMNode(this).offsetWidth;
    let canvasWidth = (maxValue/precision * divide + containerWidth - minValue/precision * divide) || this.state.canvasWidth;
    let scrollLeft = (currentValue - minValue) * divide || this.state.scrollLeft;

    this.setState({
      containerWidth: containerWidth,
      canvasHeight: data.canvasHeight || this.state.canvasHeight,
      canvasWidth: canvasWidth,
      scrollLeft: scrollLeft,
      heightDecimal: data.heightDecimal || this.state.heightDecimal,
      heightDigit: data.heightDigit || this.state.heightDigit,
      lineWidth: data.lineWidth || this.state.lineWidth,
      colorDecimal: data.colorDecimal || this.state.colorDecimal,
      colorDigit: data.colorDigit || this.state.colorDigit,
      divide: data.divide || this.state.divide,
      precision: data.precision || this.state.precision,
      fontSize: data.fontSize || this.state.fontSize,
      fontColor: data.fontSize || this.state.fontColor,
      maxValue: data.maxValue || this.state.maxValue,
      minValue: data.minValue || this.state.minValue,
      currentValue: data.currentValue || this.state.currentValue,
      boxColor: data.boxColor || this.state.boxColor
    },()=>{
      this.drawRuler();
    })
  }

  drawRuler(){
    /* 1.定义变量 */

    // 1.1 定义原点，x轴方向起点与终点各留半屏空白
    let origin = {x: this.state.containerWidth, y: this.state.canvasHeight * 2};
    // 1.2 定义刻度线样式
    let heightDecimal = this.state.heightDecimal * 2;
    let heightDigit = this.state.heightDigit * 2;
    let colorDecimal = this.state.colorDecimal;
    let colorDigit = this.state.colorDigit;
    // 1.3 定义刻度字体样式
    let fontSize = this.state.fontSize * 2;
    let fontColor = this.state.fontColor;
    // 1.4 总刻度值
    let maxValue = this.state.maxValue,minValue = this.state.minValue;
    // 1.5 每个刻度所占位的px
    let divide = this.state.divide * 2;
    // 1.6定义每个刻度的精度
    let precision = this.state.precision;

    let derivative = 1 / precision;

    /* 2.绘制 */

    // 2.1初始化context
    let canvas = this.refs.SlideRuler,
        context = canvas.getContext('2d');
    // 遍历maxValue
    for (var i = minValue/precision; i <= maxValue/precision; i++) {
      context.beginPath();
      // 2.2 画刻度线
      context.moveTo(origin.x + (i - minValue/precision) * divide, 0);
      // 画线到刻度高度，10的位数就加高
      context.lineTo(origin.x + (i - minValue/precision) * divide, i* 2 % 20 == 0 ? heightDecimal : heightDigit);
      // 设置属性
      context.lineWidth = this.state.lineWidth  * 2;
      // 10的位数就加深
      context.strokeStyle = (i * 2 % 20 == 0) ? colorDecimal : colorDigit;
      // 描线
      context.stroke();
      // 2.3 描绘刻度值
      context.fillStyle = fontColor;
      context.textAlign = "center";
      context.textBaseline = "top";
      if (i* 2 % 20 == 0) {
        context.font = `${fontSize}px Arial`;
        context.fillText(Math.round(i / 10) / (derivative / 10), origin.x + (i - minValue/precision) * divide, heightDecimal);
      }
      context.closePath();
    }
  }

  handleScroll(e){
    let scrollLeft = e.target.scrollLeft;
    window.requestAnimationFrame(() => {
      this.props.getCurrentValue && this.getCurrentValue(scrollLeft)}
    );
  }

  //通过滚动计算当前值
  getCurrentValue(scrollLeft){
    let precision = this.state.precision;
    let scrollLeftValue = scrollLeft * precision / this.state.divide;
    let currentValue = Math.round((scrollLeftValue + this.state.minValue)/precision) / (1/precision);

    this.props.getCurrentValue(currentValue);
  }

  //通过当前值计算滚动距离
  handleCurrentValue(){
    let scrollLeft = (this.state.currentValue - this.state.minValue) * this.state.divide / this.state.precision;
    this.refs.rulerBox.scrollLeft = scrollLeft;
  }

  render() {
    return (
      <div className={`${this.props.className} ${s.container}`}>
        <div className={s.rulerBox} style={{borderColor: this.state.boxColor}} onScroll={this.handleScroll} ref='rulerBox'>
            <canvas ref='SlideRuler' style={{width:this.state.canvasWidth,height:this.state.canvasHeight}} width={this.state.canvasWidth * 2} height={this.state.canvasHeight * 2}></canvas>
        </div>
      </div>
    );
  }
}

export default SlideRuler;

