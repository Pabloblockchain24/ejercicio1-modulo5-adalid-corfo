import AppointmentFormCard from "../components/AppointmentFormCard";
function AppointmentForm() {
  return (
    <main className="appointment-form__container">
      <h1>Agendamiento de citas Adalid</h1>
      <p className="equipo-medico__header__text"> Agenda en la fecha y hora que prefieras con el profesional que desees </p>
      <AppointmentFormCard />
    </main>
  );
}

export default AppointmentForm;
