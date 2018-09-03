import React from 'react';
import ReactDOM from 'react-dom';

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
  testarrow() {
    return 'arrow';
  }
  render() {
    return <div>hello with.js</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
