import { useEffect, useState } from "react";
import { auth, database } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AdminDashboard from "./Admin/AdminDashboard";
import { doc, getDoc } from "firebase/firestore";
import DoctorDashboard from "./Doctor/DoctorDashboard";
import PatientDashboard from "./Patient/PatientDashboard";
import AdminLayout from "./Admin/AdminLayout";


const Login = () => {

        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [isLogin, setIsLogin] = useState(false)
        const [role, setRole] = useState("")
        const [name, setName] = useState("")

        const renderComponent=()=>{
            switch (role) {
                case 'admin':
                    return <AdminLayout name={name}/>;
                case 'doctor':
                    return <DoctorDashboard name={name}/>;
                case 'patient':
                    return <PatientDashboard name={name}/>
                default:
                    return null;
            }
        }



        const login = () => {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res.user.uid)
                    setIsLogin(true)

                    getDoc(doc(database, "Users", res.user.uid))
                    .then((user) => {
                        console.log(user.data().role)
                        setRole(user.data().role)
                        setName(user.data().name)
                        localStorage.setItem("role", user.data().role)
                        localStorage.setItem("name", user.data().name)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }


        useEffect(() => {
            if(localStorage.getItem('role')) {
                setRole(localStorage.getItem('role'));
                setName(localStorage.getItem('name'));
                setIsLogin(true);
            }
        })

        return(
            <div>
                {
                    isLogin ?
                    renderComponent()
                    :
                
                    <div>
                        <h2>Login</h2>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required/>

                            <br></br>
                            <br></br>

                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required/>

                            <br></br>
                            <br></br>

                            <button onClick={login}>Login</button>
                        
                        </div>
                    </div>
                }
            </div>
        )




}


export default Login;