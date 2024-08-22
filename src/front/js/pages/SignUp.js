import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            name: name,
            email: email,
            password: password
        };
        let url = String(process.env.BACKEND_URL + "api/signup");
        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                alert("User created successfully");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error creating user");
            });
    };

    return (
        <div className="container-fluid d-flex justify-content-center mt-5 mb-5">
            <div className="container-form">
                <h2>REGISTER</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="container d-flex justify-content-end mb-3">
                        <button type="submit" className="btn btn-form">Accept</button>
                    </div>
                </form>
            </div>
        </div>
    );
};