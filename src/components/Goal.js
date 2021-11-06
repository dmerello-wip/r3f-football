import React, {useEffect}  from 'react'
import * as THREE from 'three'
import { useBox } from 'use-cannon'
import { useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import useBallsStore from '../store/ballsStore'

export default function Goal({position, goalHeight, goalWidth}) {


 const {api: storeApi} = useBallsStore();

 const [goalRef] = useBox(() => ({
    position: position,
    mass: 30,
    args: [goalWidth, goalHeight, goalHeight],
    onCollide: (e)=>{
        if (e.body.name === "soccerball") {
          storeApi.setBallPositionOnGoal(e.body.position);
        }
    }
  }));

  /* --------- TEXTURES SET ------------ */

  //TODO: importing 2 identical images, find a better way:
  const txtr  = useLoader(TextureLoader, '/3d/test/web@2x.png');
  const txtrSide  = useLoader(TextureLoader, '/3d/test/webSide@2x.png');
  const setTextures = ()=>{
    // setting texture repeating:
    txtr.wrapS = txtr.wrapT = THREE.RepeatWrapping;
    txtr.anisotropy = 1;
    txtr.repeat.set(2,1);

    // setting texture repeating:
    txtrSide.wrapS = txtr.wrapT = THREE.RepeatWrapping;
    txtrSide.anisotropy = 1;
    txtrSide.repeat.set(1,1);
  };
  useEffect(setTextures, [txtr, txtrSide]);


  const Side = (side)=>{
    let sidePosition = (side==='left') ? [goalWidth/2 , 0 , 0] : [ -goalWidth/2 , 0 , 0];
    return (
      <mesh castShadow position={sidePosition} rotation={[0, Math.PI / 2, 0]}>
        <planeBufferGeometry attach="geometry" args={[goalHeight, goalHeight]} />
        <meshStandardMaterial map={txtrSide} attach="material" transparent={true} side={THREE.DoubleSide}/>
      </mesh>
    );
  };
  const Top = ()=>{
    return (
      <mesh castShadow position={[ 0, goalHeight/2, 0 ]}  rotation={[Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[goalWidth, goalHeight]}  />
        <meshStandardMaterial map={txtr} attach="material" transparent={true}  side={THREE.DoubleSide}/>
      </mesh>
    );
  };

  const Back = ()=>{
    return (
      <mesh castShadow position={[ 0, 0, -goalHeight/2]}>
        <planeBufferGeometry attach="geometry" args={[goalWidth, goalHeight]}  />
        <meshStandardMaterial map={txtr} attach="material" transparent={true}  side={THREE.DoubleSide}/>
      </mesh>
    );
  };

  return (
    <group ref={goalRef}>
      {Back()}
      {Top()}
      {Side('left')}
      {Side('right')}
    </group>
  )
}

