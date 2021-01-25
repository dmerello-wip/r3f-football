import create from 'zustand';

const useBallsStore = create(set => ({
  isDraggingBall: false,
  force: { x: 0, y:0, z: 0},
  clickPoint: { x: 0, y: 0, z: 0},
  api: {
    setIsDraggingBall: (bool) => set({ isDraggingBall: bool }),
    setForce: (obj) => set({ force: {...obj} }),
    setClickPoint: (obj) => set({ clickPoint: {...obj} })
  }
}));

export default useBallsStore;