import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import Player from "./Player";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import RemotePlayer from "./RemotePlayer";

export interface Player {
  id: string;
  x: number;
  y: number;
  z: number;
}
export type tDirectoryPlayers = {
  [key in string]: Player;
};

export default function Scene() {
  const [socket, setSocket] = useState<null | Socket>(null);
  const [directory, setDirectory] = useState<tDirectoryPlayers>({});

  useEffect(() => {
    const socket = io("https://game-3d-server.onrender.com/", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(`conectado al servidor : ${socket.id}`);

      socket.on("update-world", (data) => {
        setDirectory(data);
      });

      setSocket(socket);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-700">
      <Canvas camera={{ position: [0.5, 2, 5] }}>
        <Physics>
          <ambientLight intensity={2} />
          <directionalLight intensity={3} position={[1, 5, 5]} />
          <OrbitControls />

          {/* Objetos */}
          <Floor />
          {Object.entries(directory).map(([id, position]) => {
            if (id !== socket?.id)
              return <RemotePlayer position={position} key={id} />;
          })}
          <Player socket={socket} />
        </Physics>
      </Canvas>
    </div>
  );
}
