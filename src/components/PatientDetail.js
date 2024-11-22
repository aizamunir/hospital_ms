import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Badge, CardBody, Tabs, Tab } from "react-bootstrap";


const PatientDetail = () => {

    const {patient_id} = useParams();

    const [PatientHistory, setPatientHistory] = useState([]);
    const [activitylog_id, setActivityLogId] = useState("");

    const [PatientPrescription, setPatientPrescription] = useState([]);
    const [prescription_id, setPrescriptionId] = useState("");

    const [PatientDiagnosticTest, setPatientDiagnosticTest] = useState([]);
    const [diagnostictest_id, setDiagnosticTestId] = useState("");

    const [PatientData, setPatientData] = useState([]);

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phn_num, setPhnNum] = useState("");
    const [disease, setDisease] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [status, setStatus] = useState("");
    const [attendee, setAttendee] = useState("");

    const apiURL = process.env.REACT_APP_API_URL

    const getPatientHistory = () => {
        fetch(apiURL + 'patienthistory/' + patient_id)
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

    const getPatientPrescription = () => {
        fetch(apiURL + 'patientprescription/' + patient_id)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setPatientPrescription(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Prescirpiton for this Patient Exists.");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            
    }

    const getDiagnosticTest = () => {
        fetch(apiURL + 'patientdiagnostictest/' + patient_id)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.data) {
                    setPatientDiagnosticTest(data.data);
                     console.log(data.data);
                }
                else {
                    console.log("No Diagnostic Test for this Patient Exists.");
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
                     setWeight(data.data.weight);
                     setHeight(data.data.height);
                     setStatus(data.data.status);
                     setAttendee(data.data.attendee);
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
        getPatientPrescription()
        getDiagnosticTest()
    }, [])


    return(
        <>
            <h1>Patient Name: {name}</h1>

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
                                        <Badge variant="light" className="ml-2">{weight} lb</Badge> | 
                                        <Badge variant="light" className="ml-2">{height} ft</Badge>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <Tabs
                                defaultActiveKey="prescriptions"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                                >
                                <Tab eventKey="prescriptions" title="Prescriptions">
                                    <Card className="bg-light text-dark">
                                        <Card.Body>
                                            {PatientPrescription.map(item => {
                                                const daysUntilNextVisit = Math.floor((new Date(item.next_visit) - new Date(item.created_at)) / (1000 * 60 * 60 * 24));

                                                return (
                                                    <Card key={item.prescription_id} style={{ marginBottom: '10px' }}>
                                                        <Card.Body>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <p style={{ margin: 0 }}>
                                                                    Dr. {item.doctor.name} prescribed
                                                                </p>
                                                                <p>{new Date(item.created_at).toLocaleDateString()}</p>
                                                            </div>

                                                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                                                                <p style={{ margin: 0 }}>{item.medicines}</p>
                                                                <p>({item.description})</p>
                                                            </div>

                                                            <hr />

                                                            <div style={{ textAlign: 'left' }}>
                                                                <p style={{ margin: 0 }}>
                                                                    Next visit in <strong>{daysUntilNextVisit} days</strong> on {new Date(item.next_visit).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                );
                                            })}
                                        </Card.Body>
                                    </Card>
                                </Tab>

                                <Tab eventKey="diagnostic_test" title="Diagnostic Test">
                                    <Card className="bg-light text-dark">
                                        <Card.Body>
                                            {PatientDiagnosticTest.map(item => {
                                                return (
                                                    <Card key={item.diagnostictest_id} style={{ marginBottom: '10px' }}>
                                                        <Card.Body>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <p style={{ margin: 0 }}>
                                                                    Dr. {item.doctor.name} prescribed the following test,
                                                                </p>
                                                                <p>{new Date(item.created_at).toLocaleDateString()}</p>
                                                            </div>

                                                            <div style={{ marginTop: '10px' }}>
                                                                <p style={{ margin: 0 }}> Test: {item.tests}</p>
                                                            </div>

                                                            <hr />

                                                            <div style={{ textAlign: 'left' }}>
                                                                <p style={{ margin: 0 }}>
                                                                    <strong>RESULT - {item.result}</strong>
                                                                </p>
                                                            </div>

                                                            <div style={{ marginTop: '10px' }}>
                                                                <p style={{ margin: 0 }}> Description: {item.description}</p>
                                                            </div>

                                                        </Card.Body>
                                                    </Card>
                                                );
                                            })}
                                        </Card.Body>
                                    </Card>
                                </Tab>

                                <Tab eventKey="patient-profile" title="Patient Profile">
                                    <Card className="bg-light text-dark">
                                        <CardBody>
                                            <Card>
                                                <CardBody>
                                                    <div>
                                                    <p>
                                                        <strong>Name: </strong> {name}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Age: </strong> {age}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Gender: </strong> {gender}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Phone Number: </strong> {phn_num}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Disease: </strong> {disease}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Weight: </strong> {weight}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Height: </strong> {height}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Status: </strong> {status}
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <p>
                                                        <strong>Attendee: </strong> {attendee}
                                                    </p>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </CardBody>
                                    </Card>
                                </Tab> 
                            </Tabs>
                            
                            <br></br>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={4}>
                    <Card className="bg-light text-dark">
                        <Card.Header>
                            <strong>History</strong>
                        </Card.Header>
                        <Card.Body>
                            {PatientHistory.map(item => {
                                
                                let remarksColor = {};

                                if (item.remarks.includes('deleted')) {
                                    remarksColor = { color: 'red' };
                                } else if (item.remarks.includes('added')) {
                                    remarksColor = { color: 'green' };
                                } else if (item.remarks.includes('updated')) {
                                    remarksColor = { color: 'blue' };
                                } else if (item.remarks.includes('admitted')) {
                                    remarksColor = { color: 'brown' };
                                }

                                return (
                                    <Card key={item.activitylog_id} style={{ marginBottom: '10px' }}>
                                        <Card.Body>
                                            <p style={{ margin: 0 }}>
                                                {name}
                                                <strong style={remarksColor}> {item.remarks}</strong>
                                            </p>
                                            <p>{item.date} {item.time}</p>
                                            <hr />
                                        </Card.Body>
                                    </Card>
                                );
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </>
    )

}

export default PatientDetail;