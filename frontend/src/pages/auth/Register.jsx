import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Create an account
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Register to analyze your resume
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 mt-6 sm:mt-8" noValidate>
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} loadingText="Registering..." fullWidth={true}>
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-violet-600 hover:text-violet-700 hover:underline"
        >
          Login
        </Link>
      </p>
    </Card>
  );
};

export default Register;