import { Component } from "react";
import { Navbar, Button } from "react-bootstrap";

export default class ToolBarBase extends Component {
  render() {
    return (
      <>
        <Navbar expand="lg" variant="light" bg="light">
          <Button onClick={this.props.onShow}>df</Button>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Navbar>
      </>
    );
  }
}
