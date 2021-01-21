import {useBox} from 'use-cannon'

const Arrow = ({size, position}) => {



  const [ref] = useBox(() => ({
    mass: 1,
    position: position,
    args: size
  }));


  return (
    <mesh ref={ref} position={position} castShadow>
      <geometry attach="geometry">
        <vector3 attachArray="vertices" args={[-size, 0, 0]}></vector3>
        <vector3 attachArray="vertices" args={[size, 0, 0]}></vector3>
        <vector3 attachArray="vertices" args={[0, 0, -size*1.5]}></vector3>
        <face3 attachArray="faces" args={[0, 1, 2]}></face3>
      </geometry>
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
}

export default Arrow;

