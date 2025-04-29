import { RigidBody } from "@react-three/rapier";

export default function Floor() {
  return (
    <RigidBody type="fixed">
      <mesh scale={[10, 0.5, 10]}>
        <boxGeometry />
        <meshStandardMaterial color="#5EAD57" />
      </mesh>
    </RigidBody>
  );
}
