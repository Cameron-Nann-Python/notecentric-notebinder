import Form from "../components/Form"
import "../styles/Banner.css"

/* Connects to backend url*/
function Register() {
    return (
    <>
        <div>
            <header className="banner">
               <h1>NoteBinder</h1>
            </header>
        </div>  
         <div className="login-container">
            <Form route="/api/user/register/" method="register" />
             <p className="register-link">
                   Already have an account?{" "}
                    <a href="/login">Login here</a>
                </p>
        </div>
    </>)
}

export default Register