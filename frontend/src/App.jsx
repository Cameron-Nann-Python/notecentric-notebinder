import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Forum from "./pages/Forum"
import ForumClass from "./pages/ForumClass"
import ForumModule from "./pages/ForumModule"
import NotFound from "./pages/NotFound"
import ProtectedPage from "./components/ProtectedPage"
import AdminPage from "./pages/AdminPage"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
        <Route path="/admin" element={<ProtectedPage><AdminPage /></ProtectedPage>} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/class/:classId" element={<ForumClass />} />
        <Route path="/forum/class/:classId/module/:moduleId" element={<ForumModule/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
