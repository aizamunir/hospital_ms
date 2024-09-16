import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Badge, CardBody, Tabs, Tab } from "react-bootstrap";


const PatientDetail = () => {

    const {patient_id} = useParams();

    const [PatientHistory, setPatientHistory] = useState([]);
    const [activitylog_id, setActivityLogId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phn_num, setPhnNum] = useState("");
    const [disease, setDisease] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [status, setStatus] = useState("");

    const apiURL = process.env.REACT_APP_API_URL

    const getPatientHistory = () => {
        fetch(apiURL + 'patienthistory' + patient_id)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setPatientHistory(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Patient History Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }    

    const getPatient = () => {
        fetch(apiURL + 'patient/' + patient_id)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                     console.log(data.data);
                     setName(data.data.name);
                     setAge(data.data.age);
                     setGender(data.data.gender);
                     setPhnNum(data.data.phn_num);
                     setDisease(data.data.disease);
                     setDoctorId(data.data.doctor.doctor_id);
                     setStatus(data.data.status);
                }
                else {
                    console.log("No Patient Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    useEffect(() => {
        getPatient()
        getPatientHistory()
    }, [])


    return(
        <>
            <h1>Patient ID: {patient_id}</h1>

            <Row>
                <Col md={8}>
                    <Card className="bg-light text-dark">
                        <Card.Header>
                            <Row>
                                <Col md={8}>
                                    <div>
                                        <strong>{name}</strong>
                                        <br></br>
                                        <Badge variant="secondary" className="ml-2">{gender}</Badge> | 
                                        <Badge variant="light" className="ml-2">{age}</Badge> | 
                                        <Badge variant="light" className="ml-2">112 lb</Badge> | 
                                        <Badge variant="light" className="ml-2">5'5 ft</Badge>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <Tabs
                                defaultActiveKey="anamnesis"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                                >
                                <Tab eventKey="anamnesis" title="Anamnesis">
                                    Tab content for Home
                                </Tab>
                                <Tab eventKey="care-plan" title="Care Plan">
                                    Tab content for Profile
                                </Tab>
                                <Tab eventKey="lab-results" title="Lab Results">
                                    Tab content for Loooonger Tab
                                </Tab>
                                <Tab eventKey="patient-profile" title="Patient Profile">
                                    Tab content for Contact
                                </Tab> 
                            </Tabs>
                            
                            <br></br>

                            <Col md={12}>
                                <div style={{color:"blue"}}>
                                    <strong>Complaints and Symptoms</strong>
                                    <br></br>
                                    <br></br>
                                    <div style={{color:"black"}}>
                                        Acute abdominal pain
                                    </div>
                                    <div style={{color:"black"}}>
                                        Throat pain
                                    </div>
                                </div>
                            </Col>
                            
                        </Card.Body>

                    </Card>

                </Col>

                <Col md={4}>
                    <Card className="bg-light text-dark">
                        <Card.Header>
                            <strong>History</strong>
                        </Card.Header>
                        <Card.Body>
                            {PatientHistory.map(item => (
                            <Card key={item.activitylog_id}>
                                <Card.Body>
                                    <p style={{ margin: 0 }}>
                                        {name}
                                        <strong> {item.remarks}</strong>
                                    </p>
                                    <p>{item.date} {item.time}</p>
                                    <hr/>
                                </Card.Body>
                            </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </>
    )

}

export default PatientDetail;