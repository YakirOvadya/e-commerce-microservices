import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [searchUsername, setSearchUsername] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://prod-service:3002/api/auth/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products from prod-service:", err);
      }
    };
    fetchProducts();
  }, []);

  const toggleProduct = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://users-service:3001/api/auth/register", {
        ...form,
        products: selectedProducts,
      });
      alert("User registered!");
      setForm({ username: "", email: "", password: "" });
      setSelectedProducts([]);
    } catch (err) {
      console.error("Registration error in users-service:", err);
      alert("Registration failed.");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://users-service:3001/api/auth/login/${searchUsername}`
      );
      setFoundUser(res.data);
    } catch (err) {
      console.error("User search error in users-service:", err);
      alert("User not found.");
      setFoundUser(null);
    }
  };

  return (
    <div className="container">
      {/* DevOps Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Devops-toolchain.svg"
        alt="DevOps Logo"
        style={{ height: "200px", marginBottom: "1rem" }}
      />

      {/* Tech Icons */}
      <div className="tech-logos">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
          alt="Docker"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
          alt="Kubernetes"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          alt="React"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
          alt="Node.js"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
          alt="MongoDB"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
          alt="NGINX"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg"
          alt="OpenShift"
        />
      </div>

      {/* Register */}
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <h3>Select Products</h3>
        {products.map((p) => (
          <label key={p.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={!!selectedProducts.find((sp) => sp.id === p.id)}
              onChange={() => toggleProduct(p)}
            />
            {p.name}
          </label>
        ))}

        <button type="submit">Register</button>
      </form>

      <hr />

      {/* Search User */}
      <h2>Find User</h2>
      <input
        placeholder="Enter username"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {foundUser && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>
            <strong>Username:</strong> {foundUser.username}
          </p>
          <p>
            <strong>Email:</strong> {foundUser.email}
          </p>
          <p>
            <strong>Products:</strong>
          </p>
          <ul>
            {foundUser.products.map((p, idx) => (
              <li key={idx}>{p.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
