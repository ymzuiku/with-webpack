import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SubApp from './App';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 20,
    };
    this.testarrow.bind(this);
  }
  testarrow = () => {
    return 'arrowtsx';
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