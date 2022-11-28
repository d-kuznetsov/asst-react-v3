import "./App.css";
import Assistent from "./components/Assistent";
// import config from "./config";
import config from "../examples/config-3";
import ContextProvider from "./components/ContextProvider";

function App() {
  return (
    <ContextProvider config={config}>
      <Assistent config={config} />
    </ContextProvider>
  );
}

export default App;
