import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userClient from "../../Clients/userClient";
import { User } from "../../Clients/userClient";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";

// Component for the login form displayed on the landing page
function LoginForm() {
    const navigate = useNavigate();
    // Represents the inputted credentials as a User 
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: ""
    });
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await userClient.signin(credentials);
            console.log("User signed in:", response);
            navigate("/home");
        } catch (error) {
            console.error("Error signing in:", error);
            setLoginFailed(true);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case "usernameInput":
                setCredentials({ ...credentials, username: value })
                break;
            case "passwordInput":
                setCredentials({ ...credentials, password: value })
                break;
        }
    }

    return (
        <div className="create-account-container">
            <h1 className="login-form-title">Hello!</h1>
            <form onSubmit={handleSubmit} className="create-account-form">
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="usernameInput"><b>USERNAME</b> <span className="error-message">{loginFailed && <i>- Login failed</i>}</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="usernameInput"
                            value={credentials.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput"><b>PASSWORD</b> <span className="error-message">{loginFailed && <i>- Login failed</i>}</span></label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"><b>Log In</b></button>
                <Link to='/register' className="register-text">Register here!</Link>
            </form>
        </div>
    );
}

export default LoginForm;