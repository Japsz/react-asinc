import React, {Component} from 'react';

class Stateful extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
  }
  handleOnClick (){
    this.setState({
      value: this.state.value + 1
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <button type='button' onClick={this.handleOnClick}>Sumar</button>
      </div>
    );
  }
}

export default Stateful;