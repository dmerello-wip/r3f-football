import create from 'zustand';
import * as THREE from 'three';

const useBallsStore = create(set => ({
  isDraggingBall: false,
  force: { x: 0, y:0, z: 0},
  clickPoint: { x: 0, y: 0, z: 0},
  gloveLeftPositionOnGoal:  new THREE.Vector3( -1.5, 2, 2 ),
  gloveRightPositionOnGoal:  new THREE.Vector3( 1.5, 2, 2 ),
  api: {
    setIsDraggingBall: (bool) => set({ isDraggingBall: bool }),
    setForce: (obj) => set({ force: {...obj} }),
    setClickPoint: (obj) => set({ clickPoint: {...obj} }),
    setBallPositionOnGoal: (ballPosition) => {
        // set gloves
      if (ballPosition.x <= 0) {
        set({ gloveLeftPositionOnGoal: ballPosition});
      } else {
        set({ gloveRightPositionOnGoal: ballPosition});
      }
    }
  }
}));

export default useBallsStore;