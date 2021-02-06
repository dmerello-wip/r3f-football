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
import config from '../config';


export default function Stage() {

  const cameraRef = useRef();
  const {isDraggingBall, force, clickPoint, gloveLeftPositionOnGoal, gloveRightPositionOnGoal, api: storeApi} = useBallsStore();

  // DRAG BEHAVIOR ON THE STAGE TO MOVE BALLS
  const bind = useDrag((state) => {
    // end dragging, and starting from a ball:
    if (isDraggingBall && !state.dragging) {
      // y force depending on the y point a hit the ball:
      let yForce = -(clickPoint.y - config.ballSize * 2);
      // x, z, forces from dragging directions
      storeApi.setForce({
        x: state.movement[0] * config.velocityFactor / state.elapsedTime,
        y: yForce * config.crossFactor,
        z: state.movement[1] * config.velocityFactor / state.elapsedTime,
      });
      storeApi.setIsDraggingBall(false);
    }
  }, {
    threshold: 10,
    useTouch: true
  });

  // FIND POINT OF CLICK ON BALL ELEMENT
  const findClickPoint = (event) => {
    // find 3d world point from camera, mouse event and Z displacement of clicked element:
    let point = clickPointInWorld(event, cameraRef.current, config.ballInitialPosition.z);
    storeApi.setClickPoint(point);
  };

  return (
    <div className="stage" {...bind()}>
      <Suspense fallback={<Loading/>}>
        <Canvas shadowMap>
          <ambientLight intensity={0.3}/>
          <fog attach="fog" args={[config.ambientColor, 0, 50]}/>
          <spotLight intensity={0.8} position={[30, 30, 70]} angle={0.1} penumbra={1} castShadow/>
          <Physics>
            <Goal position={[0, 2, 0]} goalHeight={4} goalWidth={10} />
            <Glove position={gloveLeftPositionOnGoal} size={1} side="left"/>
            <Glove position={gloveRightPositionOnGoal} size={1} side="right"/>
            <Ball position={config.ballInitialPosition} size={config.ballSize} force={force} firstTouchAction={findClickPoint}/>
            <Floor position={[0, 0, 0]}/>
          </Physics>
          <DefaultCamera ref={cameraRef} position={[0, 1, 15]}/>
        </Canvas>
      </Suspense>
    </div>
  )
}
