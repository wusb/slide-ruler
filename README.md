# SlideRuler
SlideRuler component for ReactJS

[![npm](https://img.shields.io/npm/v/slide-ruler.svg)](https://www.npmjs.com/package/slide-ruler)
[![npm](https://img.shields.io/npm/dy/slide-ruler.svg)](https://www.npmjs.com/package/slide-ruler)
[![npm](https://img.shields.io/npm/l/slide-ruler.svg)](https://www.npmjs.com/package/slide-ruler)

![example](https://i.loli.net/2018/03/19/5aaf82069b04f.gif)

## Getting Started

### Install

```shell
yarn add slide-ruler --dev
```

### Usage Example

```javascript
import React from 'react';
import SlideRuler from 'slide-ruler';

class IndexPage extends React.Component {

  constructor() {
    super();

    this.state = {
      currentValue: 0
    };

    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  getCurrentValue(currentValue){
    this.setState({
      currentValue:currentValue
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.currentValue}</p>
        <SlideRuler getCurrentValue={this.getCurrentValue}
                    maxValue={200}
                    minValue={20}
                    divide={5}
                    precision={0.1}/>
      </div>
    );
  }
}

export default IndexPage;

```

## PropTypes

| Property        | Type     | Default      | Description           |
| :-------------- | :------- | :----------- | :-------------------- |
| getCurrentValue | Function |              | get the return value  |
| containerWidth  | Nubmer   | screen width | container width       |
| canvasHeight    | Nubmer   | 83           | container height      |
| heightDecimal   | Nubmer   | 35           | scale marks length    |
| heightDigit     | Nubmer   | 18           | division marks length |
| lineWidth       | Nubmer   | 2            | marks width           |
| colorDecimal    | String   | #909090      | scale marks color     |
| colorDigit      | String   | #b4b4b4      | division marks color  |
| divide          | Nubmer   | 10           | division length of px |
| precision       | Nubmer   | 1            | division value        |
| fontSize        | Nubmer   | 20           | scale fontSize        |
| fontColor       | String   | #666666      | scale fontColor       |
| maxValue        | Nubmer   | 230          | max value             |
| minValue        | Nubmer   | 100          | min value             |
| currentValue    | Nubmer   | 0            | current value         |

## How to Contribute

Anyone and everyone is welcome to contribute to this project. The best way to start is by checking our [open issues](https://github.com/simbawus/SlideRuler/issues),[submit a new issues](https://github.com/simbawus/SlideRuler/issues/new?labels=bug) or [feature request](https://github.com/simbawus/SlideRuler/issues/new?labels=enhancement), participate in discussions, upvote or downvote the issues you like or dislike.

## License

[**The MIT License**](http://opensource.org/licenses/MIT).
