import react, { Component, createContext, FC } from "react";

interface StateConfig {
  title: string;
}
interface PropsConfig {
  status?: string;
}

class Example extends Component<PropsConfig, StateConfig> {
  onChange(e: any) {
    console.log("Example - onchange:", e);
  }
  render() {
    return (
      <>
        <h1>state title: {this.state.title}</h1>
        <h1>state status: {this.props.status}</h1>
      </>
    );
  }
}
interface IExampleService {
  getEmployees(): Promise<Example[]>;
}
const ExampleServiceContext = createContext<IExampleService | undefined>(
  undefined
);
const ExampleService: FC = ({ children }: any) => {
  const sevice = {
    async getEmployees(): Promise<Example[]> {
      return [];
    }
  };
  return (
    <ExampleServiceContext.Provider value={sevice}>
      {children}
    </ExampleServiceContext.Provider>
  );
};
export { Example, ExampleService, ExampleServiceContext };
