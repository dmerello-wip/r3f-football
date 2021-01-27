import React  from 'react'
import * as THREE from 'three'
import { useBox } from 'use-cannon'
import { useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Web({position}) {
  const [ref] = useBox(() => ({
    position
  }));


  const txtr = useLoader(TextureLoader, '/3d/test/web@2x.png');

  if (txtr) {
    txtr.wrapS = txtr.wrapT = THREE.RepeatWrapping;
    txtr.repeat.set(4, 2);
    txtr.anisotropy = 1;
    console.dir(txtr);
  }


  return (
    <group>
      <mesh ref={ref} castShadow>
        <planeBufferGeometry attach="geometry" args={[10, 4]}  />
        <meshStandardMaterial map={txtr} attach="material" transparent={true}/>
      </mesh>
      <mesh ref={ref} castShadow>
        <planeBufferGeometry attach="geometry" args={[2, 4]} rotation={ 0, Math.PI/2, 0 } />
        <meshStandardMaterial map={txtr} attach="material" transparent={true}/>
      </mesh>
    </group>
  )
}

