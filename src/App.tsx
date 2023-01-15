import "./styles.scss";
import Slidebar from "./Gui/Slidebar";
import GoldenTest from "./Gui/Layout";
import ToolBarBase from "./Gui/Toolbar";
import Layout from "./Gui/LayoutNew";
import { Row, Col, Button } from "react-bootstrap";
import react, { Component } from "react";
class Vector {
  private _x: number = 0;
  private _y: number = 0;
  private _z: number = 0;
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }
  // set X(value:number):number{
  //   this._x = value
  // }
  // get X():number{
  //   return this._x
  // }
  get Length(): number {
    return 0;
  }
}

class EventEmitter {
  event: any;
  constructor() {}
  apply(e: any) {
    this.event(e);
  }
  async then(e: any) {
    this.event = e;
  }
}
export default class App extends Component {
  resizeData: any;
  _event;
  constructor(props: any) {
    super(props);
    window["Vector"] = Vector;
    this.resizeData = {
      tracking: false,
      startWidth: null,
      startCursorScreenX: null,
      handleWidth: 10,
      resizeTarget: null,
      parentElement: null,
      maxWidth: null
    };
    this.state = {
      toggle: true,
      width: 200,
      showMobile: false
    };
    this._event = new EventEmitter();
  }
  showMobile(status: any) {
    this.state.showMobile = status;
    this.setState(this.state);
  }
  onResite() {}
  render() {
    return (
      <div className="App">
        <ToolBarBase onShow={() => this.showMobile(true)} />
        <div className="container_main">
          <Slidebar
            show={this.state.showMobile}
            onHide={() => this.showMobile(false)}
          ></Slidebar>
          <main>
            <GoldenTest onResize={this._event}></GoldenTest>
            {/* <Layout /> */}
          </main>
        </div>
      </div>
    );
  }
}
