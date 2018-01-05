/**
 * Created by simba on 09/11/2017.
 */
import React from 'react';
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
      <div>
        <SlideRuler getCurrentValue={this.getCurrentValue}
                    maxValue={200}
                    minValue={20}
                    divide={5} precision={0.1}/>
        <p>{this.state.currentValue}</p>
      </div>
    );
  }
}

export default IndexPage;

