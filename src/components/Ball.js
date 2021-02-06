import {useEffect, useState} from 'react';
import {useSphere} from 'use-cannon';
import useBallsStore from '../store/ballsStore'

const Ball = ({size, position, force, firstTouchAction}) => {
  const [hovered, setHovered] = useState(false);

  const storeApi = useBallsStore(s => s.api);

  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position: position,
    args: size
  }));

  useEffect(()=>{
    api.velocity.set(force.x, force.y, force.z);
  }, [force, api.velocity]);

  useEffect(()=>{
    document.body.style.cursor = (hovered) ? 'pointer' : 'inherit';
  }, [hovered]);

  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={sphereRef}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={e => {
          firstTouchAction(e);
          storeApi.setIsDraggingBall(true)
        }}
        onPointerUp={e => { storeApi.setIsDraggingBall(false) }}
        name="soccerball"
      >
        <sphereGeometry attach="geometry" args={[size, 16, 16]}/>
        <meshPhongMaterial attach="material" color="white"/>
      </mesh>
    </group>
  );
};

export default Ball;


