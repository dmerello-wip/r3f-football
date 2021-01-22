import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from 'use-cannon'
import PicModel from './PicModel'
import Floor from './Floor'
import DefaultCamera from './Camera'
import Ball from './Ball'
import Loading from './Loading'
import useBallsStore from '../store/ballsStore'
import {Html} from 'drei'
import { useDrag } from 'react-use-gesture'


export default function Stage() {

  const ambientColor = '#d67a0c';
  const velocityFactor = 5;

  const {isDraggingBall, force, api: apiStore} = useBallsStore();

  const bind = useDrag((state) => {
    // when i started to drag a ball and my drag is ended:
    if(isDraggingBall && !state.dragging) {
        // console.group('dati utili:');
        // console.log(`state.vxvy: ${state.vxvy}`);
        // console.log(`state.direction: ${state.direction}`);
        // console.log(`state.xy: ${state.xy}`);
        // console.log(`state.initial: ${state.initial}`);
        // console.log(`state.distance: ${state.distance}`);
        // console.log(`state.movement: ${state.movement}`);
        // console.log(`state.velocity: ${state.velocity}`);
        // console.log(`state.elapsedTime: ${state.elapsedTime}`);
        // console.groupEnd();
        //
        // console.group('dati usati:');
        // console.log(`posizione y di tocco: ${state.initial[1]}`);
        // console.groupEnd();
        apiStore.setForce({
          x: state.movement[0] * velocityFactor / state.elapsedTime,
          z: state.movement[1] * velocityFactor / state.elapsedTime,
        });
        apiStore.setIsDraggingBall(false);
    }\
  }, {
    threshold: 10,
    useTouch: true
  });

  return (
    <div className="stage" {...bind()}>
      <Suspense fallback={<Loading/>}>
        <Canvas shadowMap>
          <ambientLight intensity={0.3}/>
          <fog attach="fog" args={[ambientColor, 0, 50]} />
            <spotLight intensity={0.8} position={[30, 30, 70]} angle={0.1} penumbra={1} castShadow />
            <Physics>
                <PicModel position={[0,4,0]}/>
                <Ball position={[0,4,6]} size={0.2} force={force}/>
                <Floor position={[0,0,0]}/>
            </Physics>
            <DefaultCamera position={[0, 1, 9]}/>
            {isDraggingBall &&
              <Html center={true}>
              <div>force x: {force.x}</div>
              <div>force y: {force.z}</div>
              </Html>
            }
        </Canvas>
      </Suspense>
    </div>
  )
}
