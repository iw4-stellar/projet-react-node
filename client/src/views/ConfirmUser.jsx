import React from "react";
import AuthService from "../services/auth";
import { Link, useParams, useMatch } from "react-router-dom";

function ConfirmUser(props) {
    const { token } = useParams();
    const match = useMatch("/confirm/:token");
    
    if (match) {
        AuthService.verifyUser(token);
    }

    return (
        <div>
            <h1>Confirm User</h1>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default ConfirmUser;