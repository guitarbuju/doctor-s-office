import { useEffect } from "react";
import { usePatientsInfoStore } from "../../../../store";
import { useNavigate } from "react-router-dom";
import Appointments from "./Appointments"

const AppointmentsWrapper = () => {
    const navigate = useNavigate();
    const patientsInfo = usePatientsInfoStore((state) => state.patientInfo);

    const anyTruthyValue = Object.values(patientsInfo).some(value => Boolean(value));

    useEffect(() => {
        if (!anyTruthyValue) {
            navigate('/');
        }
    }, [anyTruthyValue, navigate]);

    return anyTruthyValue ? <Appointments /> : null;
}

export default AppointmentsWrapper;
