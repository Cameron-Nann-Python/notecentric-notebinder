import Form from "../components/Form"
import "../styles/Banner.css"

function Login() {
    return (
    <>
        <div>
            <header className="banner">
               <h1>NoteBinder</h1>
            </header>
        </div>
        <div className="login-container">
            <Form route="/api/token/" method="login" />
             <p className="register-link">
                    Don't have an account?{" "}
                    <a href="/register">Register here</a>
                </p>
        </div>
    </>)
}

export default Login