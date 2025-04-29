import { RigidBody } from "@react-three/rapier";

export default function Player() {
  return (
    <RigidBody>
      <mesh position={[0, 3, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  );
}
