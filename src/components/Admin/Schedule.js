import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

const Schedule = () => {

    const [showAddToast, setShowAddToast] = useState(false);

    const [schedules, setSchedules] = useState([]);
    const [schedule_id, setScheduleId] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [resMsg, setResMsg] = useState("");
    
    const isEmpty = schedules && schedules.length === 0;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const apiUrl = process.env.REACT_APP_API_URL

    const getSchedules = () => {
        fetch(apiUrl + 'schedules')
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setSchedules(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Schedule Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }    

    const addSchedule = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(apiUrl + 'schedule/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify({
                    doctor_id : doctor_id,
                    date : date,
                    description : description,
                    start_time : start_time,
                    end_time : end_time

                })
            });

            const result = await res.json()
            console.log(result);
            setResMsg(result.message);
            setShowAddToast(true);
            getSchedules();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    const delSchedule = async (id) => {
        try{
            const res = await fetch(apiUrl + 'schedule/delete/' + id, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
            });

            console.log(res);
            setResMsg(res.message);
            setShowAddToast(true);
            getSchedules();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editSchedule = (id, doctor_id, date, description, start_time, end_time) => {
        setScheduleId(id);
        setDoctorId(doctor_id);
        setDate(date);
        setDescription(description);
        setStartTime(start_time);
        setEndTime(end_time);
        setUpdating(true);
        handleShow();
    }

    const updateSchedule = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('doctor_id',doctor_id);
        urlEncodedData.append('date',date);
        urlEncodedData.append('description',description);
        urlEncodedData.append('start_time',start_time);
        urlEncodedData.append('end_time',end_time);


        try{
            const res = await fetch(apiUrl + 'schedule/update/' + schedule_id, { 
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
            getSchedules();
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSchedules()
    }, []);

    return (
        <div>
            <h2>Schedules</h2>

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
                Add New Schedule
            </Button>

            <br></br>
            <br></br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Doctor ID</th>  
                        <th>Date</th>
                        <th>Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
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
                            schedules.map(item => (
                                <tr key={item.schedule_id}>
                                    <td>{item.doctor_id}</td>
                                    <td>{item.date}</td>
                                    <td>{item.description}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                    <td>
                                        <Button 
                                            style={{marginRight: '5px'}}
                                            variant="secondary"
                                            onClick={()=>editSchedule(item.schedule_id,item.doctor_id,item.date,item.description,item.start_time,item.end_time)}>
                                            Edit
                                        </Button>
                                        
                                        <Button 
                                            variant="danger"
                                            onClick={()=>delSchedule(item.schedule_id)}>
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
                    <Modal.Title>{updating ? "Updating" : "Adding New"} Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Doctor ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={doctor_id}
                                onChange={(e) => setDoctorId(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control 
                                type="time"
                                value={start_time}
                                onChange={(e) => setStartTime(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control 
                                type="time"
                                value={end_time}
                                onChange={(e) => setEndTime(e.target.value)}/>
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
                        onClick={updateSchedule}>
                        Update
                    </Button>
                    :
                    <Button 
                        variant="primary"
                        onClick={addSchedule}>
                        Add
                    </Button>
                    }

                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default Schedule;