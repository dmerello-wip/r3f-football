import create from 'zustand';

const useBallsStore = create(set => ({
  isDraggingBall: false,
  force: { x: 0, z: 0},
  api: {
    setIsDraggingBall: (bool) => set({ isDraggingBall: bool }),
    setForce: (obj) => set({ force: {...obj} }),
  }
}));

export default useBallsStore;