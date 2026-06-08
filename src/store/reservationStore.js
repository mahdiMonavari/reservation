import { create } from "zustand";
const useReservationStore = create((set)=>({
    step :1,
    doctorId:null,
    services:[],

    setStep:(step)=>set({step}),
    setDoctorId:(id)=> set({doctorId :id}),
    addServices : (service)=> set((state)=>({services : [...state.services , service]})),    
}))

export default useReservationStore