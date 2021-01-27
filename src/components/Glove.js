import React  from 'react'
import { usePlane } from 'use-cannon'
import { useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export default function Glove(props) {
  const [ref] = usePlane(() => ({ rotation: [0, 0, 0], ...props }));

  const txtr = useLoader(TextureLoader, (props.side === 'right') ? '/3d/test/hand-right@2x.png' : '/3d/test/hand-left@2x.png');


  return (
    <mesh ref={ref} castShadow>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial map={txtr} attach="material" transparent={true} />
    </mesh>
  )
}

