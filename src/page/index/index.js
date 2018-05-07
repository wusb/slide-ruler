/**
 * Created by simba on 09/11/2017.
 */
import React from 'react';
import s from './index.scss';
import SlideRuler from '../../../components/index.js';

class IndexPage extends React.Component {

  constructor() {
    super();

    this.state = {
      currentValue: 0
    };

    this.getCurrentValue = this.getCurrentValue.bind(this);
  }

  componentDidMount(){

  }


  componentWillReceiveProps(nextProps){

  }

  getCurrentValue(currentValue){
    this.setState({
      currentValue:currentValue
    })
  }

  render() {

    return (
      <div className={s.container}>
        <p className={s.currentValue}>{this.state.currentValue}</p>
        <SlideRuler getCurrentValue={this.getCurrentValue}
                    maxValue={200}
                    className={s.slideContainer}
                    minValue={20}
                    boxColor='#ff0000'
                    divide={5}
                    precision={0.1}/>
      </div>
    );
  }
}

export default IndexPage;

