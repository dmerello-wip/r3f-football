import {useEffect, useState} from 'react';
import {useSphere} from 'use-cannon';
import useBallsStore from '../store/ballsStore'

const Ball = ({size, position}) => {
  const [hovered, setHovered] = useState(false);

  const {isActive, setIsActive} = useBallsStore();

  const handlePointerDown = (e) => {
    console.log("down");
    setIsActive(true);
    console.log(isActive);
  };

  const handlePointerUp = (e) => {
    console.log("up");
    setIsActive(false);
    console.log(isActive);
  };

  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position: position,
    args: size
  }));

  useEffect(()=>{
    let cursor =  (hovered) ? 'pointer' : 'inherit';
    document.body.style.cursor = cursor;
  }, [hovered]);


  const hitHandler = ()=>{
    api.velocity.set(0, 6, -20);
  };

  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={sphereRef}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={e => { handlePointerDown(e) }}
        onPointerUp={e => { handlePointerUp(e) }}
        onClick={ e => { hitHandler() } }
      >
        <sphereGeometry attach="geometry" args={[size, 16, 16]}/>
        <meshPhongMaterial attach="material" color="white"/>
      </mesh>
    </group>
  );
}

export default Ball;


