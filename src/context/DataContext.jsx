import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [errorServices, setErrorServices] = useState(null);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const response = await fetch("/assets/data/doctores.json");
        const doctores = await response.json();       
        setDoctors(doctores);
      } catch (error) {
        console.error("Error al cargar los doctores:", error);
      }
    }
    loadDoctors();
  }, []);

  const loadServices = async () => {
    setLoadingServices(true);
    setErrorServices(null);
    try {
      const response = await fetch("/assets/data/servicios_medicos.json");
      const servicios_medicos = await response.json();
      setServices(servicios_medicos);
      console.log('Servicios cargados correctamente')
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
      setErrorServices("Error al cargar los servicios. Por favor, intenta nuevamente.");
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const force_error_loadServices = async () => {
    throw new Error("Error al cargar los servicios");
  }

  const reFetchServices = async () => {
    setLoadingServices(true);
    setTimeout(async() => {
      try {
        await loadServices();
        setLoadingServices(false);  
        alert('Servicios cargados correctamente')
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
        setErrorServices("Error al cargar los servicios. Por favor, intenta nuevamente.");
        setLoadingServices(false);
      }
    }, 1000)
  };


  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <DataContext.Provider
      value={{ doctors, services, addAppointment, appointments, reFetchServices, loadingServices, errorServices}}
    >
      {children}
    </DataContext.Provider>
  );
}
