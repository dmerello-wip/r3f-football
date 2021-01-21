import create from 'zustand';

const useBallsStore = create(set => ({
  isActive: false,
  setIsActive: (bool) => set({ isActive: bool })
}));

export default useBallsStore;