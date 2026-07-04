// store/reservationStore.js
import { create } from "zustand";

const useReservationStore = create((set) => ({
  step: 1,
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),

  selectedDoctor: null,
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  selectedSlotsTime: null,

  setDoctor: (doctor) =>
    set((state) => {
      if (state.selectedDoctor === doctor) {
        return state;
      }
      return {
        selectedDoctor: doctor,
        selectedServices: [],
        selectedDate: null,
        selectedTime: null,
        selectedSlotsTime: null,
      };
    }),
  setServices: (services) => set({ selectedServices: services }),
  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setStep: (step) => set({ step }),
  setSlotsTime: (slotsTime) => set({ selectedSlotsTime: slotsTime }),

  reset: () =>
    set({
      step: 1,
      selectedDoctor: null,
      selectedServices: [],
      selectedDate: null,
      selectedTime: null,
    }),
}));

export default useReservationStore;
