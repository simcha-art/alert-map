import { useState } from "react";
import "./css/LoginForm.css"
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    async function login() {
        setLoading(true);
        setError("");
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        `Http Error, status: ${res.status}, message: ${res.json().then((err) => err.err)}`,
                    );
                }
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("token", data.data)
                navigate("/")
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }
    return (
        <form className="login-form"
            onSubmit={(e) => {
                e.preventDefault();
                login()
            }}
        >
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                placeholder="enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                placeholder="enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? "loading..." : "login"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default LoginForm;
