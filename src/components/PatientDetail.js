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

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phn_num, setPhnNum] = useState("");
    const [disease, setDisease] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [status, setStatus] = useState("");

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
                                defaultActiveKey="prescriptions"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                                >
                                <Tab eventKey="prescriptions" title="Prescriptions">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Doctor_ID</th>
                                                <th>Description</th>
                                                <th>Medicines</th>
                                                <th>Next Visit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PatientPrescription.map(item => (
                                                <tr key={item.prescription_id}>
                                                    <td>{item.doctor_id}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.medicines}</td>
                                                    <td>{item.next_visit}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Tab>

                                <Tab eventKey="diagnostic_test" title="Diagnostic Test">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Doctor_ID</th>
                                                <th>Description</th>
                                                <th>Tests</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PatientDiagnosticTest.map(item => (
                                                <tr key={item.diagnostictest_id}>
                                                    <td>{item.doctor_id}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.tests}</td>
                                                    <td>{item.results}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                        {disease}
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
                                    <Card key={item.activitylog_id}>
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