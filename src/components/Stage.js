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

  const {isDraggingBall, setIsDraggingBall} = useBallsStore();

  const bind = useDrag((state) => {
    if(isDraggingBall) {
      if(!state.dragging) {
        console.log(`state.velocity: ${state.velocity}`);
        console.log(`state.vxvy: ${state.vxvy}`);
        console.log(`state.distance: ${state.distance}`);
        console.log(`state.direction: ${state.direction}`);
        console.log(`state.xy: ${state.xy}`);
        console.log(`state.event: ${state.event}`);
        setIsDraggingBall(false);
      }
    }
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
                <Ball position={[0,4,6]} size={0.2} />
                <Floor position={[0,0,0]}/>
            </Physics>
            <DefaultCamera position={[0, 2, 10]}/>
            {isDraggingBall &&
              <Html center={true}>
                <h1>Attivo</h1>
              </Html>
            }
        </Canvas>
      </Suspense>
    </div>
  )
}
