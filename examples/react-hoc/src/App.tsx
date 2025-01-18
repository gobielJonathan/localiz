import { Component } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { i18nValue } from "localiz";
import { withTranslation } from "localiz/react";

interface Props {
  t?: i18nValue["t"];
  i18n?: i18nValue;
}

interface State {
  count: number;
}

class App extends Component<Props, State> {
  state: Readonly<State> = {count: 0}

  render() {
    return (
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <p>text : {this.props.t?.("hello", {name : "Jhon doe"})}</p>
        <div className="card">

          <button onClick={() => this.props.i18n?.changeLanguage("en")}>en</button>
          <button onClick={() => this.props.i18n?.changeLanguage("es")}>es</button>

          <button
            onClick={() =>
              this.setState((state) => ({
                ...state,
                count: state.count + 1,
              }))
            }
          >
            count is {this.state.count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
}

export default withTranslation(App);
