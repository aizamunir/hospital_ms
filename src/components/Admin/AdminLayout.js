import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Doctors from "./Doctors";
import Patients from "./Patients";
import Layout from "./Layout";
import AdminDashboard from "./AdminDashboard";
import Prescription from "./Prescription";
import Schedule from "./Schedule";
import DiagnosticTests from "./DiagnosticTest";
import PatientDetail from "../PatientDetail";

const AdminLayout = () => {

    const myRouter = createBrowserRouter(
        createRoutesFromElements(
          <Route path = '/' element = {<Layout />}>
            <Route path = 'home' element = {<AdminDashboard/>}/>
            <Route path = 'doctors' element = {<Doctors/>}/>
            <Route path = 'patients' element = {<Patients/>}/>
            <Route path = 'prescriptions' element = {<Prescription/>}/>
            <Route path = 'schedules' element = {<Schedule/>}/>
            <Route path = 'diagnostictest' element = {<DiagnosticTests/>}/>
            <Route path = 'patient_detail/:patient_id' element = {<PatientDetail/>}/>
          </Route>
        )
      )

    return(
        <>
            <RouterProvider router={myRouter} />
        </>
    )

}

export default AdminLayout;