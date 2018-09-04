import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SubApp from './example/App';

class App extends React.Component{
  constructor(props:any) {
    super(props);
    this.state = {
      name: 20,
    };
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

ReactDOM.render(<SubApp />, document.getElementById('root'));
