import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Doctors from './components/Admin/Doctors';
import Patients from './components/Admin/Patients';
import Layout from './components/Admin/Layout';
import Prescription from './components/Admin/Prescription';
import Schedule from './components/Admin/Schedule';
import DiagnosticTests from './components/Admin/DiagnosticTest';
import PatientDetail from './components/PatientDetail';

const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<Layout />}>
      <Route path = 'doctors' element = {<Doctors/>}/>
      <Route path = 'patients' element = {<Patients/>}/>
      <Route path = 'precriptions' element = {<Prescription/>}/>
      <Route path = 'diagnostictests' element = {<DiagnosticTests/>}/>
      <Route path = 'schedules' element = {<Schedule/>}/>
      <Route path = 'patient_detail' element = {<PatientDetail/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
