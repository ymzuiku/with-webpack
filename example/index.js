import React from 'react';
import ReactDOM from 'react-dom';
import SubApp from './App';
console.log('2222hello');
var b = '3333world';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 20,
    };
    this.testarrow.bind(this);
  }
  testarrow = () => {
    return 'arrow';
  };
  render() {
    return (
      <div>
        {this.testarrow()}
        <SubApp />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
