import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import MaskedInput from "react-text-mask";

const Doctors = () => {

    const [showAddToast, setShowAddToast] = useState(false);

    const [doctors, setDoctors] = useState([]);
    const [doctorId, setdoctorId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phn_num, setPhnNum] = useState("");
    const [speciality, setSpecaility] = useState("");
    const [salary, setSalary] = useState("");
    const [updating, setUpdating] = useState(false);
    const [resMsg, setResMsg] = useState("");
    
    const isEmpty = doctors && doctors.length === 0;

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

    const addDoctor = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(apiUrl + 'doctor/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    name: name,
                    gender: gender,
                    age: age,
                    speciality: speciality,
                    phn_num: phn_num,
                    salary: salary
                })
            });

            const result = await res.json()
            console.log(result);
            setResMsg(result.message);
            setShowAddToast(true);
            getDoctors();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    const delDoctor = async (id) => {
        try{
            const res = await fetch(apiUrl + 'doctor/delete/' + id, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
            });

            console.log(res);
            setResMsg(res.message);
            setShowAddToast(true);
            getDoctors();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editDoctor = (id, name, gender, age, speciality, phn_num, salary) => {
        setdoctorId(id)
        setName(name);
        setGender(gender) ;
        setAge(age);
        setSpecaility(speciality);
        setPhnNum(phn_num);
        setSalary(salary);
        setUpdating(true);
        handleShow();
    }

    const updateDoctor = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('name',name);
        urlEncodedData.append('gender',gender);
        urlEncodedData.append('age',age);
        urlEncodedData.append('speciality',speciality);
        urlEncodedData.append('phn_num',phn_num);
        urlEncodedData.append('salary',salary);

        try{
            const res = await fetch(apiUrl + 'doctor/update/' + doctorId, { 
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
            getDoctors();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDoctors()
    }, []);

    return (
        <div>
            <h2>Doctors</h2>

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
                Add New Doctor
            </Button>

            <br></br>
            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>  
                        <th>Speciality</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Phone Number</th>
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
                            doctors.map(item => (
                                <tr key={item.doctor_id}>
                                    <td>{item.name}</td>
                                    <td>{item.speciality}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.age}</td>
                                    <td>{item.phn_num}</td>
                                    <td>
                                        <Button 
                                            style={{marginRight: '5px'}}
                                            variant="secondary"
                                            onClick={()=>editDoctor(item.doctor_id,item.name,item.gender,item.age,item.speciality,item.phn_num,item.salary)}>
                                            Edit
                                        </Button>
                                        
                                        <Button 
                                            variant="danger"
                                            onClick={()=>delDoctor(item.doctor_id)}>
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
                    <Modal.Title>{updating ? "Updating" : "Adding New"} Doctor</Modal.Title>
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
                            <Form.Label>Speciality</Form.Label>
                            <Form.Control 
                                type="text"
                                value={speciality}
                                onChange={(e) => setSpecaility(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <MaskedInput
                                mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                placeholder="Enter Phone Number"
                                className="form-control"
                                value={phn_num}
                                onChange={(e) => setPhnNum(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                type="text"
                                value={phn_num}
                                onChange={(e) => setPhnNum(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control 
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}/>
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
                        onClick={updateDoctor}>
                        Update
                    </Button>
                    :
                    <Button 
                        variant="primary"
                        onClick={addDoctor}>
                        Add
                    </Button>
                    }

                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default Doctors;

  