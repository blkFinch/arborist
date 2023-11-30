import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Nav from "./components/Nav/Nav";
import { BaseTheme } from "./styles/base-theme";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <BaseTheme>
        <GlobalStyle />
        <Nav />
        <Canvas />
      </BaseTheme>
    </>
  );
}

export default App;
