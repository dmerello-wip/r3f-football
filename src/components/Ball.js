import {useEffect, useState} from 'react';
import {useSphere} from 'use-cannon';
import useBallsStore from '../store/ballsStore'

const Ball = ({size, position, force, firstTouchAction}) => {
  const [hovered, setHovered] = useState(false);

  const storeApi = useBallsStore(s => s.api);
  const isDraggingBall = useBallsStore(s => s.isDraggingBall);

  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position: position,
    args: size
  }));

  useEffect(()=>{

    let cursor =  (hovered) ? 'pointer' : 'inherit';
    document.body.style.cursor = cursor;

    api.velocity.set(force.x, force.y, force.z);

  }, [hovered, force, api.velocity]);

  // useEffect(()=>{
  //   if(!isDraggingBall) {
  //     setTimeout(()=>{
  //       api.position.set(0,4,6);
  //       storeApi.setForce({
  //         x: 0,
  //         y: 0,
  //         z: 0,
  //       });
  //     },3000);
  //   }
  // }, [isDraggingBall]);

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
      >
        <sphereGeometry attach="geometry" args={[size, 16, 16]}/>
        <meshPhongMaterial attach="material" color="white"/>
      </mesh>
    </group>
  );
}

export default Ball;


