import React, { Component, ElementRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Icon } from "../../Icon";
import "./styles.scss";
interface PropsConfig {
  children?: React.ElementRef<any>;
  show?: boolean;
}
interface StateConfig {
  show: boolean;
}
const Header = () => null;
const Body = () => null;
export class SlidebarChildBase extends Component<PropsConfig, StateConfig> {
  static Header: typeof Header = Header;
  static Body: typeof Body = Body;
  constructor(props: PropsConfig) {
    super(props);
    this.state = {
      show: true
    };
  }
  onToggle() {
    let status = !this.state.show;
    this.setState({ show: status });
  }
  render() {
    const { children } = this.props;
    // First we try to find the Title sub-component among the children of Article
    var header = findByType(children, Header);
    var body = findByType(children, Body);
    return (
      <>
        <div className="card-slide">
          <div className="header">
            {header?.props.children}
            <div className="title" onClick={this.onToggle.bind(this)}>
              <div className="icon">
                <Icon
                  iconName={this.state.show ? "ChevronDown" : "ChevronRight"}
                />
              </div>
              Title test
            </div>
            {this.state.show && (
              <div className="tools">
                <Button>
                  <Icon iconName="ArrowClockwise" />
                </Button>
                <Button>
                  <Icon iconName="Gear" />
                </Button>
                <Button>
                  <Icon iconName="Bank" />
                </Button>
              </div>
            )}
          </div>
          <div className={(this.state.show ? "show" : String()) + " body"}>
            {body?.props.children}
          </div>
        </div>
      </>
    );
  }
}
function findByType(element: any, type: any): any {
  if (!element) return;
  if (element.length > 1) {
    for (let index = 0; index < element.length; index++) {
      const e = element[index];
      if (e.type.name === type.name) {
        return e;
      }
    }
  } else {
    if (element.type.name === type.name) {
      return element;
    }
  }
}
