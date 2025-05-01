import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { Controls } from "../logic/controlers/Controls";
import { Action } from "../logic/controlers/Accion";

export default function Player() {
  const controls = useMemo(() => new Controls(), []);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  useEffect(() => {
    controls.addAction(
      new Action("fordwards", ["keyboard-ArrowUp", "keyboard-KeyW"])
    );
    controls.addAction(
      new Action("backwards", ["keyboard-ArrowDown", "keyboard-KeyS"])
    );
    controls.addAction(
      new Action("right", ["keyboard-ArrowRight", "keyboard-KeyD"])
    );
    controls.addAction(
      new Action("left", ["keyboard-ArrowLeft", "keyboard-KeyA"])
    );
  }, []);

  useFrame(() => {
    const { fordwards, backwards, right, left } = controls.getCurrent();
    const speed = 5;
    const rb = rigidBodyRef.current;
    if (!rb) return;

    const vel = rb.linvel();
    const impulse = {
      x: (Number(right) - Number(left)) * speed,
      y: vel.y,
      z: (-Number(fordwards) + Number(backwards)) * speed,
    };

    rb.setLinvel(impulse, true);
  });
  return (
    <RigidBody ref={rigidBodyRef}>
      <mesh position={[0, 3, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#63B1BA" />
      </mesh>
    </RigidBody>
  );
}
