import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Nav from "./components/Nav/Nav";
import {Theme } from '@radix-ui/themes'

function App() {
  return (
    <>
    <Theme>
      <Nav />
      <Canvas />
    </Theme>
    </>
  );
}

export default App;
