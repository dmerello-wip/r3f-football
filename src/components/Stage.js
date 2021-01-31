import React, {Suspense, useRef} from 'react'
import {Canvas} from 'react-three-fiber'
import {Physics} from 'use-cannon'
import Floor from './Floor'
import Glove from './Glove'
import Goal from './Goal'
import DefaultCamera from './Camera'
import Ball from './Ball'
import Loading from './Loading'
import useBallsStore from '../store/ballsStore'
import {useDrag} from 'react-use-gesture'
import clickPointInWorld from '../helpers/clickPointInWorld';


export default function Stage() {

  const cameraRef = useRef();

  const ambientColor = '#d67a0c';
  const velocityFactor = 8;
  const crossFactor = 26;
  const ballSize = 0.2;
  const ballZaxis = 6;

  const {isDraggingBall, force, clickPoint, api: storeApi} = useBallsStore();

  const bind = useDrag((state) => {
    // end dragging, and starting from a ball:
    if (isDraggingBall && !state.dragging) {
      // y force depending on the y point a hit the ball:
      let yForce = -(clickPoint.y - ballSize * 2);
      // x, z, forces from dragging directions
      storeApi.setForce({
        x: state.movement[0] * velocityFactor / state.elapsedTime,
        y: yForce * crossFactor,
        z: state.movement[1] * velocityFactor / state.elapsedTime,
      });
      storeApi.setIsDraggingBall(false);
    }
  }, {
    threshold: 10,
    useTouch: true
  });

  const findClickPoint = (event) => {
    // find 3d world point from camera, mouse event and Z displacement of clicked element:
    let point = clickPointInWorld(event, cameraRef.current, ballZaxis);
    storeApi.setClickPoint(point);
  };

  return (
    <div className="stage" {...bind()}>
      <Suspense fallback={<Loading/>}>
        <Canvas shadowMap>
          <ambientLight intensity={0.3}/>
          <fog attach="fog" args={[ambientColor, 0, 50]}/>
          <spotLight intensity={0.8} position={[30, 30, 70]} angle={0.1} penumbra={1} castShadow/>
          <Physics>
            <Goal position={[0, 0, -6]} />
            <Glove position={[1.5, 2, -2]} size={1} side="right"/>
            <Glove position={[-1.5, 2, -2]} size={1} side="left"/>
            <Ball position={[0, 2, ballZaxis]} size={ballSize} force={force} firstTouchAction={findClickPoint}/>
            <Floor position={[0, 0, 0]}/>
          </Physics>
          <DefaultCamera ref={cameraRef} position={[0, 1, 9]}/>
        </Canvas>
      </Suspense>
    </div>
  )
}
