import React, { useState, Component, useRef } from "react";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-dark-theme.css";
import { GoldenLayoutComponent } from "@annotationhub/react-golden-layout";
import { Row, Col, Container, Button } from "react-bootstrap";
import { render } from "react-dom";
import { RxService, useService } from "react-rxbuilder";
// import ExampleService from "./ServiceComponent";
import LayoutService from "./service"; // EventExample // ExampleService2, // Example2, // ExampleService1, // Example1,
// import * as tempe from "./StandardLibraryIntellisense";
import Editor from "@monaco-editor/react";
import Constants from "../../Constants";

function ComponentA() {
  const editorRef: any = useRef(null);
  let code = `
//some comment
let a = new Vector()
console.log(a.Length)
  `;
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  function handleEditorWillMount(monaco: any) {
    var libSource = `
    class Vector {
      private _x: number = 0;
      private _y: number = 0;
      private _z: number = 0;
      /**
     * @type {*} - can be 'any' type
     */
      constructor(x: number = 0, y: number = 0, z: number = 0)
      /**
       * Returns the next fact
       */
      get Length(): number
    }
`;
    var libUri = "ts:filename/facts.d.ts";
    try {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        libSource,
        libUri
      );
      monaco.editor.createModel(
        libSource,
        "typescript",
        monaco.Uri.parse(libUri)
      );
    } catch (error) {}
  }

  function showValue() {
    eval(editorRef.current.getValue());
  }
  return (
    <>
      <Button onClick={showValue}>Excute</Button>
      <Editor
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        defaultLanguage="typescript"
        defaultValue={code}
      />
    </>
  );
}

function ComponentB() {
  // const [u] = useService(ExampleService2);
  // var _event = EventExample.apply.bind(EventExample);
  return (
    <>
      <h2 style={{ color: "#fff" }}>compoent B ExampleService2 : </h2>
      <button>Test</button>
    </>
  );
}

function ComponentC(props: any) {
  const fun = function () {
    props["event"]();
  };
  return (
    <>
      <h1 style={{ color: "#fff" }}>ExampleService1</h1>
      <h2 style={{ color: "#fff" }}>{props.myText}</h2>
      <Button onClick={fun}>Test</Button>
      <Button
        onClick={() => {
          props["reSize"]();
        }}
      >
        Update ReSize
      </Button>
    </>
  );
}
interface State {
  Config: any;
}
export default class GoldenTest extends Component<{}, State> {
  layoutManager: any;
  constructor(props: any) {
    super(props);
    this.state = {
      Config: {
        content: [
          // {
          //   component: () => {
          //     return (
          //       <RxService>
          //         {(e: any) => {
          //           console.log("Example 2", e);
          //           return <Example2></Example2>;
          //         }}
          //       </RxService>
          //     );
          //   },
          //   title: "Example 2"
          // },
          // {
          //   component: () => {
          //     return (
          //       <RxService>
          //         {(e: any) => {
          //           console.log("ComponentB", e);

          //           return <ComponentB />;
          //         }}
          //       </RxService>
          //     );
          //   },
          //   title: "B Component"
          // },
          // {
          //   component: () => {
          //     return (
          //       <RxService>
          //         {(e: any) => {
          //           console.log("Example 1", e);
          //           return <Example1></Example1>;
          //         }}
          //       </RxService>
          //     );
          //   },
          //   title: "Example 1"
          // },

          // {
          //   component: () => {
          //     let self = this;
          //     return (
          //       <RxService>
          //         {(e: any) => {
          //           console.log("ComponentC", e);

          //           return (
          //             <ComponentC
          //               myText="Component with Props"
          //               event={self.getConfig.bind(this)}
          //               reSize={self.updateReSize.bind(this)}
          //             />
          //           );
          //         }}
          //       </RxService>
          //     );
          //   },
          //   title: "C Component"
          // },
          {
            type: "stack",
            content: [
              {
                type: "react-component",
                component: ComponentA,
                title: "A Component"
              },
              {
                type: "react-component",
                component: ComponentB,
                title: "B Component"
              }
            ]
          }
        ]
      }
    };
    LayoutService.init(this);
    // const { onResize } = this.props;
    // // console.log(this.props);
    // let self = this;
    // onResize.then((e: any) => {
    //   self.updateReSize();
    // });
  }
  // getConfig() {
  //   let config = this.state["config"];
  //   return config;
  // }
  setLayoutManager(e: any) {
    this.layoutManager = e;
    window.layoutManager = e;
    // this.layoutManager.registerComponent("testItem", ComponentC);
    // this.layoutManager.registerComponent("ComponentA", ComponentA);
    this.layoutManager.registerComponent("ComponentC", ComponentC);
    //this.layoutManager.registerComponent("testItem", ComponentC);
    this.layoutManager.root.contentItems[0].addChild({
      type: "react-component",
      component: "ComponentC",
      title: "C Component"
    });
    // this.layoutManager.init();
  }
  createTabs(component: any) {
    // let config = this.state.Config;
    // config.content[0].content.push(component);
    // this.setState({ Config: config });
    try {
      var component = this.layoutManager.root.contentItems[0].addChild({
        type: "react-component",
        component: "ComponentC",
        title: "C Component"
        // props: { id: 3 }
      });
      window.compo = component;
      // this.setState({ Config: this.layoutManager.root.config });
    } catch (error) {
      console.error(error);
    }
  }
  onResize() {
    this.layoutManager.updateSize();
  }
  render() {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        // onResize={() => console.log("resized!")}
      >
        <GoldenLayoutComponent
          // (Required) Golden Layout Config. (See http://golden-layout.com/docs/Config.html)
          config={this.state.Config}
          // (Optional) Set up auto-resizing. Layout will resize when the window resizes.
          autoresize={true}
          // (Optional) (Milliseconds) Debounce resize to prevent excessive re-renders.
          debounceResize={100}
          // (Optional) Grab the instance of the GoldenLayout Manager. Gives you full access to GL API.
          onLayoutReady={this.setLayoutManager.bind(this)}
          // registerComponents={(myLayout: any) => {
          //   myLayout.registerComponent("testItem", ComponentC);
          //   myLayout.registerComponent("ComponentA", ComponentA);
          //   myLayout.registerComponent("ComponentB", ComponentB);
          // }}
        ></GoldenLayoutComponent>
      </div>
    );
  }
}
