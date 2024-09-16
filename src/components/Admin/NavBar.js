import Nav from 'react-bootstrap/Nav';

function NavBar() {


    const logOut=() => {
        localStorage.clear();
        window.location.reload();
    }


  return (
    <Nav>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/doctors">Doctors</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/patients">Patients</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/prescriptions">Prescriptions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/diagnostictest">Diagnostic Tests</Nav.Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
      <Nav.Item>
        <Nav.Link href="/schedules">Schedules</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" onClick={logOut}>Log Out</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;