import { useState, useEffect } from "react";
import "../styles/Banner.css"
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const navigate = useNavigate();

    return (
        <div>
            <header className="banner" >
            <h1>NoteBinder</h1>

            <div className="header-actions">
                <span className="page-title">Home</span>
                <button type="button" className="logout-button"onClick={() => navigate("/logout")}>
                    Logout
                </button>
            </div>
        </header>
        </div>
    );
}


export default AdminPage;