import Scene from "./game/Scene";

function App() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-10 h-[32px] w-full bg-red-50 draggable-window"></nav>
      <Scene />
    </>
  );
}

export default App;
