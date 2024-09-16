

const PatientDashboard = (props) => {
    
    
    const logOut=() => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div>
            <h2>Welcome {props.name}</h2>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default PatientDashboard;