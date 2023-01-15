import React, { useState, Component, useRef } from "react";
import { GoldenLayout } from "golden-layout";
import "golden-layout/src/scss/goldenlayout-base.scss";
import "golden-layout/dist/css/themes/goldenlayout-light-theme.css";
class MyComp1 extends React.Component {
  render() {
    return "Hallo world data!";
  }
}
interface State {
  Config: any;
}
export default class Layout extends Component<{}, State> {
  containerRef = React.createRef();
  setContainerRef = (ref: any) => {
    this.containerRef = ref;
  };
  layout: GoldenLayout;

  render() {
    return (
      <>
        <button onClick={this.addCompo.bind(this)}>test</button>
        <div
          ref={this.containerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </>
    );
  }
  createLayout() {
    let res = new GoldenLayout(
      {
        content: [
          {
            type: "row",
            content: [
              {
                type: "component",
                componentName: "myComp1",
                title: "Component 1"
              },
              {
                type: "component",
                componentName: "test-component",
                title: "Component 3"
              }
            ]
          }
        ]
      },
      this.containerRef.current
    );
    res.registerComponent("myComp1", function (container, state) {
      // container.getElement().innerHTML = "<h2>" + state.text + "</h2>";
      return (
        <>
          <h1>text</h1>
          <MyComp1 />
        </>
      );
    });
    // res.registerComponent(
    //   "myComp1",
    //   class MyComp1 extends React.Component {
    //     render() {
    //       return "Hallo world data!";
    //     }
    //   }
    // );
    res.registerComponent("test-component", MyComp1);
    res.init();

    return res;
  }
  addCompo() {
    var newItemConfig = {
      title: "tetst",
      type: "component",
      componentName: "myComp1"
    };

    this.layout.root.contentItems[0].addChild(newItemConfig);
  }
  componentDidMount() {
    if (!this.layout) this.layout = this.createLayout();
    window.layout = this.layout;
  }
  componentWillUnmount() {
    // if (this.layout) this.layout.destroy();
  }
}
