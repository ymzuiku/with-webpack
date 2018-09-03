import * as React from 'react';
import * as ReactDOM from 'react-dom';

console.log('2222hello');
var b = '3333world'

interface IState {
  name: number;
}
interface IProps {}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: 20,
    };
  }
  testarrow = () => {
    return 'arrow';
  };
  render() {
    return <div>hello with.tsx {this.testarrow()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
