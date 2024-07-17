import { create } from "zustand";

export const useDoctorsDniStore = create((set) => ({
  doctorsDni: "",
  setDoctorsDni: (dni) => set({ doctorsDni: dni }),
}));

export const usePatientsInfoStore = create((set) => ({
  patientInfo: {
    dni: "",
    name: "",
    lastName: "",
  },
  setPatientInfo: (info) => set({ patientInfo: info }),
  clearPatientInfo: () =>
    set({ patientInfo: { dni: "", name: "", lastName: "" } }),
}));

export const useAppointmentsInfoStore = create((set) => ({
  appointmentInfo: {
    date: "",
    id: "",
    doctor: "",
    patient: "",
    completed:""
  },
  setAppointmentInfo: (info) => {
    console.log("Setting appointment info:", info);
    set({ appointmentInfo: info });
  },
  clearAppointmentInfo: () =>
    set({
      appointmentInfo: {
        date: "",
        id: "",
        doctor: "",
        patient: "",
        completed:""
      },
    }),
}));

export const useInvoiceIdStore = create((set) => ({
  invoiceId: "",
  setInvoiceId: (id) => set({ invoiceId: id }),
}));
