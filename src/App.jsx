import "./App.css";
import Assistent from "./components/Assistent";
// import config from "./config";
import config from '../examples/config-1'
import ContextProvider from './components/ContextProvider'

function App() {
  return (
    <div className="App">
      <ContextProvider config={config}>
        <Assistent config={config} />
      </ContextProvider>
    </div>
  );
}

export default App;
