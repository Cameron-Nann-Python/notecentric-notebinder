import Form from "../components/Form"

/* Connects to backend url*/
function Register() {
    return <Form route="/api/user/register/" method="register" />
}

export default Register