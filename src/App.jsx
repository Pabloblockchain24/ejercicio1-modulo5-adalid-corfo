import { useState } from "react";
import Home from "./pages/Home";
import EquipoMedico from "./pages/EquipoMedico";
import AppointmentForm from "./pages/AppointmentForm";
import ServiciosMedicos from "./pages/ServiciosMedicos";
import DataProvider from "./context/DataContext"; 
import ProfilerView from "./pages/ProfilerView";
function App() {

  const [view, setView] = useState("home");

  return (
    <>
      <DataProvider>
        <nav>
          <button onClick={() => setView("home")}> Home</button>
          <button onClick={() => setView("equipo_medico")}> Equipo médico</button>
          <button onClick={() => setView("formulario_contacto")}> Citas médicas</button>
          <button onClick={() => setView("servicios_medicos")}> Servicios médicos</button>
          <button onClick={() => setView("profiler")}> Profiler</button>
        </nav>

        {view === "home" && <Home />}
        {view === "equipo_medico" && <EquipoMedico />}
        {view === "formulario_contacto" && <AppointmentForm />}
        {view === "servicios_medicos" && <ServiciosMedicos />}
        {view === "profiler" && <ProfilerView />}

      </DataProvider>
    </>
  );
}

export default App;
