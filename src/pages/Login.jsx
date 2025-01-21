import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) {
            console.error("Login Error:", error.message);
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <div className="grid gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} className="btn-primary">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
