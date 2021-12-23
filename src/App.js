import './App.css';

import React from 'react';
import inference from './inference.js';
import Chart from "react-google-charts";

class TextInputArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Enter text to classify emotion (Model trained for English)',
      data:[
        ["Emotion", "Score"],
        ['Sadness 😥',0],
        ['Joy 😂', 0],
        ['Love ❤️', 0],
        ['Anger 😠', 0],
        ['Fear 😱', 0],
        ['Surprise 😲', 0]
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {  
    inference(event.target.value).then( result => {
      this.setState({
        text : event.target.value,
        data:result
      });
    });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">   
      <Chart  
        width={'400px'}
        height={'200px'}
        chartType="BarChart"
        data={this.state.data}
        options={{
          chartArea: { width: '50%' },
          colors: ['purple'],
          backgroundColor: '#282c34',
          legend: { 
            textStyle: {color: 'white', fontSize: 8},
            labels: {fontColor:'white'}
          },
          vAxis: {
            textStyle: {
            color: 'white'
          }
          },
          hAxis: {
            minValue: 0,
            maxValue:100,
            textStyle: {
              color: 'white'
            }
          }
      }}
      /> 
        <textarea rows="8" cols="24" className="App-textarea" name="message" 
          placeholder={this.state.text} autoFocus onChange={this.handleChange}>
        </textarea> 
      </header>
    </div>   
    );
  }
}
export default TextInputArea;
