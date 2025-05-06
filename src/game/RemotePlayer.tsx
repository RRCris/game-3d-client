interface Props {
  position: {
    id: string;
    x: number;
    y: number;
    z: number;
  };
}
export default function RemotePlayer({ position }: Props) {
  return (
    <mesh position={[position.x, 0.7, position.z]}>
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
