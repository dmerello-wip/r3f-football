import React  from 'react'
import { useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export default function Glove({position, size, side, ballPosition}) {


  const txtr = useLoader(TextureLoader, (side === 'right') ? '/3d/test/hand-right@2x.png' : '/3d/test/hand-left@2x.png');

  return (
    <mesh  castShadow args={[size, size]} position={position}>
      <planeBufferGeometry attach="geometry" />
      <meshStandardMaterial map={txtr} attach="material" transparent={true}  />
    </mesh>
  )
}

