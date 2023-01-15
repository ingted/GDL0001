// import react, { Component, createContext, FC, useState } from "react";
// import { Injectable, useService } from "react-rxbuilder";

// interface StateConfig {
//   title: string;
// }
// interface PropsConfig {
//   status?: string;
//   style?: string;
// }
// class ExampleService {
//   parent: any;
//   data: StateConfig;
//   event: any;
//   constructor() {
//     this.data = {
//       title: "test data demo"
//     };
//   }
//   addEvent(e: any, parent: any) {
//     this.event = e;
//     this.parent = parent;
//   }
//   apply() {
//     this.event(this.data);
//     this.parent.setState(this.data);
//   }
// }
// const EventExample = new ExampleService();
// @Injectable()
// export class ExampleService1 {
//   title: string;
//   status: boolean;
//   data: StateConfig[];
//   constructor() {
//     this.status = false;
//     this.title = "";
//   }

//   setText(str: React.ChangeEvent<HTMLInputElement>) {
//     this.title = str.target.value;
//   }
//   addData(data: StateConfig) {
//     this.data.push(data);
//   }
// }
// @Injectable()
// export class ExampleService2 {
//   title: string;
//   status: boolean;
//   data: StateConfig[];
//   constructor() {
//     this.status = false;
//     this.title = "";
//   }
//   setText(str: React.ChangeEvent<HTMLInputElement>) {
//     this.title = str.target.value;
//   }
//   addData(data: StateConfig) {
//     this.data.push(data);
//   }
// }
// export default class Example1 extends Component<PropsConfig, StateConfig> {
//   constructor(props: PropsConfig) {
//     super(props);
//     this.state = {
//       title: ""
//     };
//     EventExample.addEvent(this.onChange.bind(this), this);
//   }
//   onChange(e: any) {
//     console.log("Example - onchange:", e);
//   }
//   render() {
//     const [s] = useService(ExampleService1);
//     return (
//       <div style={{ color: "#fff" }}>
//         <input value={s.title} onChange={s.setText} />
//         <h1>ExampleService1 title: {s.title}</h1>
//         <h1>state title: {this.state.title}</h1>
//         <h1>state status: {this.props.status}</h1>
//       </div>
//     );
//   }
// }
// export default class Example2 extends Component<PropsConfig, StateConfig> {
//   constructor(props: PropsConfig) {
//     super(props);
//     this.state = {
//       title: ""
//     };
//   }
//   onChange(e: any) {
//     console.log("Example - onchange:", e);
//   }
//   render() {
//     const [s] = useService(ExampleService2);
//     return (
//       <div style={{ color: "#fff" }}>
//         <input value={s.title} onChange={s.setText} />
//         <h1>ExampleService1 title: {s.title}</h1>
//         <h1>state title: {this.state.title}</h1>
//         <h1>state status: {this.props.status}</h1>
//       </div>
//     );
//   }
// }
// export { Example1, ExampleService1, Example2, ExampleService2, EventExample };

import GoldenLayout from "@annotationhub/react-golden-layout";

class _LayoutService {
  parent: any;
  config: GoldenLayout.Config;
  constructor() {
    this.config = {
      content: []
    };
  }
  init(parent: any) {
    this.parent = parent;
  }
  onResize() {
    this.parent.onResize();
  }
  create(component: any) {
    this.parent.createTabs(component);
  }
  apply(data: any) {
    this.parent.setState(data);
  }
}
const LayoutService = new _LayoutService();
export default LayoutService;
