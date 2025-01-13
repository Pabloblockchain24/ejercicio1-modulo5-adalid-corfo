import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from '../context/DataContext';
function AppointmentFormCard() {
  const [patientName, setPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const inputRef = useRef(null);

  const { doctors } = useContext(DataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  AppointmentFormCard.propTypes = {
    patientName: PropTypes.string,
    selectedDoctor: PropTypes.string,
    appointmentDate: PropTypes.string,
    appointmentTime: PropTypes.string,
  };

  AppointmentFormCard.propTypes.patientName = (props, propName, componentName) => {
    if (typeof props[propName] !== 'string') {
      console.log(`Invalid prop \`${propName}\` in \`${componentName}\`. Expected a string.`);
    }
  };
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [doctors]); 

  const validateForm = () => {
    setIsFormValid(
      patientName !== "" &&
        selectedDoctor !== "" &&
        appointmentDate !== "" &&
        appointmentTime !== ""
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "patientName":
        setPatientName(value);
        break;
      case "selectedDoctor":
        setSelectedDoctor(value);
        break;
      case "appointmentDate":
        setAppointmentDate(value);
        break;
      case "appointmentTime":
        setAppointmentTime(value);
        break;
      default:
        break;
    }
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      patientName,
      selectedDoctor,
      appointmentDate,
      appointmentTime
    }

    addAppointment(newAppointment);
    setModalContent(
      `Cita agendada con el Dr. ${selectedDoctor} el ${appointmentDate} a las ${appointmentTime}`
    );
    setIsModalOpen(true);
    setPatientName("");
    setSelectedDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    setIsFormValid(false)
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Confirmación</h2>
          <p>{modalContent}</p>
        </Modal>
      )}
      {doctors.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="patientName">Nombre del paciente:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={patientName}
              onChange={handleInputChange}
              placeholder="Nombre del paciente"
              ref={inputRef}
              required
            />
          </div>

          <div>
            <label htmlFor="selectedDoctor">Seleccionar Doctor:</label>
            <select
              id="selectedDoctor"
              name="selectedDoctor"
              value={selectedDoctor}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un doctor</option>
              {doctors.map((doctor, key) => (
                <option key={key} value={doctor.nombre}>
                  Dr. {doctor.nombre} - {doctor.especialidad}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="appointmentDate">Fecha de la cita:</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={appointmentDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="appointmentTime">Hora de la cita:</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={appointmentTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" disabled={!isFormValid}>
            Agendar cita
          </button>
        </form>
      ) : (
        <p>Cargando Formulario...</p>
      )}
    </>
  );
}

export default AppointmentFormCard;
