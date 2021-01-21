import create from 'zustand';

const useBallsStore = create(set => ({
  isDraggingBall: false,
  setIsDraggingBall: (bool) => set({ isDraggingBall: bool })
}));

export default useBallsStore;