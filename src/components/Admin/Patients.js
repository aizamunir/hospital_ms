import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import PatientDetail from "../PatientDetail";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
 
const Patients = () => {

    const [showAddToast, setShowAddToast] = useState(false);

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [patient_id, setPatientId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [attendee, setAttendee] = useState("");
    const [phn_num, setPhnNum] = useState("");
    const [disease, setDisease] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [status, setStatus] = useState("");
    const [updating, setUpdating] = useState(false);
    const [resMsg, setResMsg] = useState("");

    const isEmpty = patients && patients.length === 0;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const apiURL = process.env.REACT_APP_API_URL

    const navigate = useNavigate();

    const getDoctors = () => {
        fetch(apiURL + 'doctors')
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                setDoctors(data.data);
                console.log(data.data);
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }    

    const goToDetails = (id) => {
        alert('hello');
        return <PatientDetail/>;
    }


    const getPatients = () => {
        fetch(apiURL + 'patients')
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

    const addPatient = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(apiURL + 'patient/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    name: name,
                    gender: gender,
                    height: height,
                    weight: weight,
                    attendee: attendee,
                    age: age,
                    disease: disease,
                    phn_num: phn_num,
                    doctor_id: doctor_id,
                    status: status
                })
            });

            const result = await res.json()
            console.log(result);
            setResMsg(result.message);
            setShowAddToast(true);
            getPatients();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    const delPatient = async (id) => {
        try{
            const res = await fetch(apiURL + 'patient/delete/' + id, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
            });

            console.log(res);
            setResMsg(res.message);
            setShowAddToast(true);
            getPatients();

        }
        catch (err) {
            console.log(err);
        }
    }

    const editPatient = (id, name, gender, height, weight, attendee, age, disease, phn_num, doctor_id, status) => {
        setPatientId(id);
        setName(name);
        setGender(gender);
        setHeight(height);
        setWeight(weight);
        setAttendee(attendee);
        setAge(age);
        setDisease(disease);
        setPhnNum(phn_num);
        setDoctorId(doctor_id);
        setStatus(status);
        setPatientId(id);
        setUpdating(true);
        handleShow();
    }

    const updatePatient = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('name',name);
        urlEncodedData.append('gender',gender);
        urlEncodedData.append('height',height);
        urlEncodedData.append('weight',weight);
        urlEncodedData.append('attendee',attendee);
        urlEncodedData.append('age',age);
        urlEncodedData.append('disease',disease);
        urlEncodedData.append('phn_num',phn_num);
        urlEncodedData.append('doctor_id',doctor_id);
        urlEncodedData.append('status',status);

        try{
            const res = await fetch(apiURL + 'patient/update/' + patient_id, { 
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
            //alert(result.message);
            getPatients();
            handleClose();

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPatients()
        getDoctors()
    }, [])

    return(
        <div>
            <h2>Patients</h2>

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
                Add New Patient
            </Button>            
            
            <br></br>
            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Disease</th>
                        <th>Contact</th>
                        <th>Referred Doctor</th>
                        <th>Status</th>
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
                        patients?.map(item => (
                            <tr key={item.patient_id}>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.age}</td>
                                <td>{item.disease}</td>
                                <td>{item.phn_num}</td>
                                <td>{item.doctor.name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Button 
                                        style={{marginRight: '5px'}}
                                        variant="primary"
                                        href={`/patient_detail/${item.patient_id}`}>
                                            View
                                    </Button>

                                    <Button 
                                        style={{marginRight: '5px'}}
                                        variant="secondary"
                                        onClick={()=>editPatient(item.patient_id,item.name,item.gender,item.age,item.disease,item.phn_num,item.doctor.doctor_id,item.status)}>
                                            Edit
                                    </Button>

                                    <Button 
                                        variant="danger"
                                        onClick={()=>delPatient(item.patient_id)}>
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
                    <Modal.Title>{updating ? "Updating" : "Adding New"} Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control 
                                type="text"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Disease</Form.Label>
                            <Form.Control 
                                type="text"
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control 
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Height</Form.Label>
                            <Form.Control 
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control 
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Attendee</Form.Label>
                            <Form.Control 
                                type="text"
                                value={attendee}
                                onChange={(e) => setAttendee(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <MaskedInput
                                mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                placeholder="Enter Phone Number"
                                className="form-control"
                                value={phn_num}
                                onChange={(e) => setPhnNum(e.target.value)}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Referred Doctor</Form.Label>
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
                            <Form.Label>Status</Form.Label>
                            <Form.Control 
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}/>
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
                        onClick={updatePatient}>
                        Update
                    </Button>
                    :
                    <Button 
                        variant="primary"
                        onClick={addPatient}>
                        Add
                    </Button>
                    }

                </Modal.Footer>
            </Modal>

        </div>
    )
};


export default Patients;