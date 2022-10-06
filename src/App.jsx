import "./App.css";
import Assistent from "./components/Assistent";
import { AsstContextProvider } from "./context";
import config from "./config";

function App() {
  return (
    <div className="App">
      <AsstContextProvider config={config}>
        <Assistent config={config} />
      </AsstContextProvider>
    </div>
  );
}

export default App;
