import Scene from "./game/Scene";

function App() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-10 h-[32px] w-full bg-gray-500 draggable-window flex items-center justify-center">
        <p className="text-white">presiona W y S</p>
      </nav>
      <Scene />
    </>
  );
}

export default App;
