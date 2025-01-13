import { Profiler } from "react";
import AppointmentForm from "./AppointmentForm";

export default function ProfilerView() {
  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(
      `${id} (${phase}) , tomo ${actualDuration.toFixed(2)}ms para renderizar`
    );
  };
  return (
    <>
      <h1>Este es un test via profiler para renderizado de AppointmentForm</h1>
      <Profiler id="AppointmentForm" onRender={onRenderCallback}>
        <AppointmentForm />
      </Profiler>
    </>
  );
}
