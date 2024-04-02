import { create } from 'zustand'


export const useDoctorsDniStore = create((set)=>({
    doctorsDni:'',
    setDoctorsDni:(dni) => set({ doctorsDni: dni }),
})

)


export const usePatientsInfoStore = create((set) => ({
    patientInfo: {
      dni: '',
      name: '',
      lastName:''
    },
    setPatientInfo: (info) => set({ patientInfo: info }),
    clearPatientInfo: () => set({ patientInfo: { dni: '', name: '', lastName: '' } }),
  }));