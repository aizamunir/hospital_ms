import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

const DiagnosticTests = () => {

    const [showAddToast, setShowAddToast] = useState(false);

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    const [diagnosticTests, setDiagnosticTests] = useState([]);
    const [diagnostictest_id, setDiagnosticTestId] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [patient_id, setPatientId] = useState("");
    const [tests, setTests] = useState("");
    const [result, setResult] = useState("");
    const [description, setDescription] = useState("");
    const [updating, setUpdating] = useState(false);
    const [resMsg, setResMsg] = useState("");
    const [test_result, setTestResult] = useState("");

    const isEmpty = diagnosticTests && diagnosticTests.length === 0;

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

    const getDiagnosticTests = () => {
        fetch(apiUrl + 'diagnostictests')
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setDiagnosticTests(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Diagnostic Test Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }    

    const addDiagnosticTest = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(apiUrl + 'diagnostictest/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    doctor_id : doctor_id,
                    patient_id : patient_id,
                    tests : tests,
                    description : description,
                    result : result
                })
            });

            const r = await res.json()
            console.log(r);
            setResMsg(r.message);
            setShowAddToast(true);
            getDiagnosticTests();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    const addTestResult = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(apiUrl + 'testresult/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    diagnostictest_id : diagnostictest_id,
                    result : test_result
                })
            });

            const r = await res.json()
            console.log(r);
            setResMsg(r.message);
            setShowAddToast(true);
            getDiagnosticTests();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    const delDiagnosticTest = async (id) => {
        try{
            const res = await fetch(apiUrl + 'diagnostictest/delete/' + id, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
            });

            console.log(res);
            setResMsg(res.message);
            setShowAddToast(true);
            getDiagnosticTests();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editDiagnosticTest = (id, doctor_id, patient_id, tests, description, result) => {
        setDiagnosticTestId(id)
        setDoctorId(doctor_id);
        setPatientId(patient_id);
        setTests(tests);
        setDescription(description);
        setResult(result);
        setUpdating(true);
        handleShow();
    }

    const editTestResult = (id, doctor_id, patient_id, tests, description, result) => {
        setDiagnosticTestId(id)
        handleShow();
    }

    const updateDiagnosticTest = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('doctor_id',doctor_id);
        urlEncodedData.append('patient_id',patient_id);
        urlEncodedData.append('tests',tests);     
        urlEncodedData.append('description',description);
        urlEncodedData.append('result',result);

        try{
            const res = await fetch(apiUrl + 'diagnostictest/update/' + diagnostictest_id, { 
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
            getDiagnosticTests();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDiagnosticTests()
        getDoctors()
        getPatients()
    }, []);

    return (
        <div>
            <h2>Diagnostic Tests</h2>

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
                Add New Diagnostic Test
            </Button>

            <br></br>
            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Doctor ID</th>
                        <th>Patient ID</th>
                        <th>Tests</th>
                        <th>Desccription</th>
                        <th>Result</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {isEmpty ?
                    <tbody>
                        <tr>
                            <td colSpan='8' style={{textAlign: 'center'}}>
                                <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    </tbody>
                
                : 

                    <tbody>
                    {
                            diagnosticTests.map(item => (
                                <tr key={item.diagnostictest_id}>
                                    <td>{item.doctor.name}</td>
                                    <td>{item.patient.name}</td>
                                    <td>{item.tests}</td>
                                    <td>{item.description}</td>
                                    <td>{item.result}</td>
                                    <td>
                                        <Button 
                                            style={{marginRight: '5px'}}
                                            variant="secondary"
                                            onClick={()=>editDiagnosticTest(item.diagnostictest_id,item.doctor_id,item.patient_id,item.tests,item.description,item.result)}>
                                            Submit Result
                                        </Button>
                                        
                                        <Button 
                                            style={{marginRight: '5px'}}
                                            variant="secondary"
                                            onClick={()=>editDiagnosticTest(item.diagnostictest_id,item.doctor_id,item.patient_id,item.tests,item.description,item.result)}>
                                            Edit
                                        </Button>
                                        
                                        <Button 
                                            variant="danger"
                                            onClick={()=>delDiagnosticTest(item.diagnostictest_id)}>
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
                    <Modal.Title>{updating ? "Updating" : "Adding New"} Diagnostic Test</Modal.Title>
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
                            <Form.Label>Tests</Form.Label>
                            <Form.Control 
                                type="text"
                                value={tests}
                                onChange={(e) => setTests(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Result</Form.Label>
                            <Form.Control 
                                type="text"
                                value={result}
                                onChange={(e) => setResult(e.target.value)}/>
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
                        onClick={updateDiagnosticTest}>
                        Update
                    </Button>
                    :
                    <Button 
                        variant="primary"
                        onClick={addDiagnosticTest}>
                        Add
                    </Button>
                    }

                </Modal.Footer>
            </Modal>
            
            {/*Result Submission*/}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{updating ? "Updating" : "Adding New"} Diagnostic Test Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <h3>Patient Name: {diagnostictest_id}</h3>

                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Result</Form.Label>
                            <Form.Control 
                                type="text"
                                value={test_result}
                                onChange={(e) => setTestResult(e.target.value)}/>
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
                        onClick={updateDiagnosticTest}>
                        Update
                    </Button>
                    :
                    <Button 
                        variant="primary"
                        onClick={addTestResult}>
                        Add Test Result
                    </Button>
                    }

                </Modal.Footer>
            </Modal>


        </div>
    )
};

export default DiagnosticTests;