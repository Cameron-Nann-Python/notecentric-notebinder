import { useState } from "react"
import api from "../api"
import { useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"

/*Handles user registration and login*/
function Form({route, method}) {
    /* Handle username and password */
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    /* Sets name of the form to Login or Register */
    const name = method === "login" ? "Login" : "Register"

    /* Use an asynchronous function to handle form submission */
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(route, {username, password})
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                /* If login is successful, navigate to home */
                navigate("/")
            }
            else {
                navigate("/login")
            }
        }
        catch (error) {
            alert(error)
        }
    }

    /* Create inputs for username and password, button to submit */

    return <form onSubmit={submit} className="form-container">
        <h1>{name}</h1>
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form