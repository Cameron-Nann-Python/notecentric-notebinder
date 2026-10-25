import api from "../api"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    return <div>
        Home
        <div>
            <button type="button" onClick={() => navigate("/logout")}>
                Logout
            </button>
        </div>
    </div>
}

export default Home
