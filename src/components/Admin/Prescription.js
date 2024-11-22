import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

const Prescription = () => {

    const [showAddToast, setShowAddToast] = useState(false);

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    const [prescriptions, setPrescriptions] = useState([]);
    const [prescription_id, setPrescriptionId] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [patient_id, setPatientId] = useState("");
    const [medicine, setMedicine] = useState("");
    const [description, setDescription] = useState("");
    const [next_visit, setNextVisit] = useState("");
    const [updating, setUpdating] = useState(false);
    const [resMsg, setResMsg] = useState("");

    const isEmpty = prescriptions && prescriptions.length === 0;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const apiUrl = process.env.REACT_APP_API_URL

    const getDoctors = () => {
        fetch(apiUrl + 'doctors')
            .then((res)=>{
                return res.json();
                console.log(res.json());
            })
            .then((data)=>{
                if(data.data) {
                    setDoctors(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Doctor Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }

    const getPatients = () => {
        fetch(apiUrl + 'patients')
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setPatients(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Patient Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const getPrescriptions = () => {
        fetch(apiUrl + 'prescriptions')
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setPrescriptions(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Prescription Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }    

    const addPrescription = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(apiUrl + 'prescription/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    doctor_id : doctor_id,
                    patient_id : patient_id,
                    medicines : medicine,
                    description : description,
                    next_visit : next_visit

                })
            });

            const result = await res.json()
            console.log(result);
            setResMsg(result.message);
            setShowAddToast(true);
            getPrescriptions();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    const delPrescription = async (id) => {
        try{
            const res = await fetch(apiUrl + 'prescription/delete/' + id, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
            });

            console.log(res);
            setResMsg(res.message);
            setShowAddToast(true);
            getPrescriptions();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editPrecription = (id, doctor_id, patient_id, medicine, description, next_visit) => {
        setPrescriptionId(id);
        setDoctorId(doctor_id);
        setPatientId(patient_id);
        setMedicine(medicine);
        setDescription(description);
        setNextVisit(next_visit);
        setUpdating(true);
        handleShow();
    }

    const updatePrescription = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('doctor_id',doctor_id);
        urlEncodedData.append('patient_id',patient_id);
        urlEncodedData.append('medicines',medicine);
        urlEncodedData.append('description',description);
        urlEncodedData.append('next_visit',next_visit);

        try{
            const res = await fetch(apiUrl + 'prescription/update/' + prescription_id, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: urlEncodedData.toString()
            });

            const result = await res.json()
            console.log(result);
            setResMsg(result.message);
            setShowAddToast(true);
            getPrescriptions();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPrescriptions()
        getDoctors()
        getPatients()
    }, []);

    return (
        <div>
            <h2>Prescriptions</h2>

            <Toast onClose={() => setShowAddToast(false)} show={showAddToast} delay={3000} autohide>
                <Toast.Header>
                    <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                    />
                    <strong className="me-auto"></strong>
                    <small>Just now...</small>
                </Toast.Header>
                <Toast.Body>{resMsg}</Toast.Body>
            </Toast>

            <br></br>

            <Button variant="primary" onClick={handleShow}>
                Add New Prescription
            </Button>

            <br></br>
            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Doctor</th>  
                        <th>Patient</th>
                        <th>Medicine Prescribed</th>
                        <th>Description</th>
                        <th>Next Visit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                {isEmpty ?
                    <tbody>
                        <tr>
                            <td colSpan='6' style={{textAlign: 'center'}}>
                                <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    </tbody>
                
                : 
                    <tbody>
                    {
                            prescriptions.map(item => (
                                <tr key={item.prescription_id}>
                                    <td>{item.doctor.name}</td>
                                    <td>{item.patient.name}</td>
                                    <td>{item.medicines}</td>
                                    <td>{item.description}</td>
                                    <td>{item.next_visit}</td>
                                    <td>
                                        <Button 
                                            style={{marginRight: '5px'}}
                                            variant="secondary"
                                            onClick={()=>editPrecription(item.prescription_id,item.doctor_id,item.patient_id,item.medicines,item.description,item.next_visit)}>
                                            Edit
                                        </Button>
                                        
                                        <Button 
                                            variant="danger"
                                            onClick={()=>delPrescription(item.prescription_id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                }

            </Table>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{updating ? "Updating" : "Adding New"} Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Select aria-label="Default select example" value={doctor_id} onChange={(e) => setDoctorId(e.target.value)}>
                                <option value=''>Select...</option>
                                {
                                    doctors.map(item => (
                                        <option key={item.doctor_id} value={item.doctor_id}>{item.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Patient</Form.Label>
                            <Form.Select aria-label="Default select example" value={patient_id} onChange={(e) => setPatientId(e.target.value)}>
                                <option value=''>Select...</option>
                                {
                                    patients.map(item => (
                                        <option key={item.patient_id} value={item.patient_id}>{item.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Medicine</Form.Label>
                            <Form.Control 
                                type="text"
                                value={medicine}
                                onChange={(e) => setMedicine(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Next Visit</Form.Label>
                            <Form.Control 
                                type="date"
                                value={next_visit}
                                onChange={(e) => setNextVisit(e.target.value)}/>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {updating ? 
                    <Button 
                        variant="primary"
                        onClick={updatePrescription}>
                        Update
                    </Button>
                    :
                    <Button 
                        variant="primary"
                        onClick={addPrescription}>
                        Add
                    </Button>
                    }

                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default Prescription;