import React from 'react';
import logo from './logo.svg';
import './App.css';

/*
`props`: propeties

- `関数コンポーネント`
- `クラスコンポーネント`

Note:
*補足: コンポーネント名は常に大文字で始めてください。*
*全ての React コンポーネントは、自己の props に対して純関数のように振る舞わねばなりません。*


*state は props に似ていますが、コンポーネントによって完全に管理されるプライベートなものです。*

*/

const element = <h1>Hello, world!</h1>;

// function Clock(props) {
//     return (
//             <div>
//             <h1>Hello, World!</h1>
//             <h2> It is {props.date.toLocaleTimeString()}.</h2>
//             </div>
//     )
// }

/*
render メソッドは更新が発生した際に毎回呼ばれますが、
同一の DOM ノード内で <Clock /> をレンダーしている限り、
Clock クラスのインスタンスは 1 つだけ使われます。
このことにより、ローカル state やライフサイクルメソッドといった追加の機能が利用できるようになります。
*/
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
              <h1>Hello, World!</h1>
              <h2> It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }

    // Life-cycle methods
    componentDidMount() {
        // this.propsはReact自体によって設定され、this.stateは特別な意味を持っている
        // データフローに影響しないデータは、クラスメンバに追加することは自由。
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // setStateによりStateが代わり、Reactがre-renderする。直接書換えはre-renderしない。
    // this.state に直接代入してよい唯一の場所はコンストラクタです。
    /*
      Reactは複数のsetState()を1度の更新にまとめて処理する可能性がある。
      // Wrong
      this.setState({
      counter: this.state.counter + this.props.increment,
      });

      // Correct
      this.setState((state, props) => ({
      counter: state.counter + props.increment
      }));
    */
    // stateの更新はマージ(shallow)される
    // データフローはトップダウンもしくは単一方向
    tick() {
        this.setState({
            date: new Date()
        });
    }
}

function ActionLink() {
    /*
      eは合成(synthetic)イベントです。
      合成イベントはW3Cの仕様に沿って定義しているので、ブラウザ間の互換性ある。
     */
    function handleClick(e) {
        // Reactではfalse返してもデフォルトの動作を抑制することができない
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>Click me</a>
    );
}

/*
  DOM生成後にaddEventListenerを呼び出す必要はない。
  => 最初にレンダリングされる際にリスナを指定するようにしてください。
*/
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
              {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }

    /*
      JavaScriptのメソッドは、thisをデフォルトでバインドしません。
      onClick={this.handleClick}のとき...
      https://www.w3schools.com/react/react_events.asp
    */
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
        );
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
    }
}

function App() {
    return (
        <div>
          <Clock />
          <button onClick={() => console.log("aaa")}>Activate Lasers</button>
          <br/>
          <ActionLink />
          <br/>
          <Toggle />
          <br/>
          <NameForm />
        </div>
    );
}

export default App;
