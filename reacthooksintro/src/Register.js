import React, { useState } from "react";

const initialFormState = {
  username: "",
  email: "",
  password: ""
};

export default function Register() {
  const [form, setForm] = useState({});
  const [user, setUser] = useState(null);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUser(form);
    setForm(initialFormState)
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Register</h2>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <label htmlFor="">E-mail</label>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Submit</button>
      </form>

      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
