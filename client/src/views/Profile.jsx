import React from "react";
import { useParams, useMatch } from "react-router-dom";
import AuthService from "../services/auth";

function Profile(props) {
    const currentUser = AuthService.getCurrentUser();
    const { token } = useParams();
    const match = useMatch("/confirm/:token");

    if (match) {
        AuthService.verifyUser(token);
    }

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                <p>{currentUser.email}</p>
                <p>{currentUser.pathway}</p>
            </div>
        </div>
    );
}

export default Profile;
