import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useReducer, useRef } from "react";

interface tMapKey {
  [key: string]: boolean;
}

function keyMapControl(mapCurrent: tMapKey, e: KeyboardEvent) {
  //si la tecla que oprimio no esta en el map
  if (mapCurrent[e.code] === undefined) {
    return mapCurrent;
  }
  if (e.type === "keydown" && mapCurrent[e.code] !== true) {
    mapCurrent[e.code] = true;
    return { ...mapCurrent };
  } else if (e.type === "keyup" && mapCurrent[e.code] !== false) {
    mapCurrent[e.code] = false;
    return { ...mapCurrent };
  } else {
    return mapCurrent;
  }
}
export default function Player() {
  const [keymap, dispatch] = useReducer(keyMapControl, {
    KeyW: false,
    KeyS: false,
  });

  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const validKey = (e: KeyboardEvent) => {
    const newState = keyMapControl(keymap, e);
    if (newState === keymap) return null;
    dispatch(e);
  };
  useEffect(() => {
    document.addEventListener("keydown", validKey);
    document.addEventListener("keyup", validKey);

    return () => {
      document.removeEventListener("keydown", validKey);
      document.removeEventListener("keypress", validKey);
    };
  }, []);

  useFrame(() => {
    const speed = 5;
    const rb = rigidBodyRef.current;
    if (!rb) return;

    const vel = rb.linvel();
    const impulse = { x: 0, y: vel.y, z: 0 };
    if (keymap["KeyW"]) impulse.z -= speed;
    if (keymap["KeyS"]) impulse.z += speed;

    rb.setLinvel(impulse, true);
  });
  console.log(keymap);
  return (
    <RigidBody ref={rigidBodyRef}>
      <mesh position={[0, 3, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#63B1BA" />
      </mesh>
    </RigidBody>
  );
}
