"use client";

import React, { useState } from "react";

interface FormProps {
  onSubmit: (data: { name: string; email: string }) => void;
}

const initialFormState = { name: "", email: "" };

export default function EmailForm({ onSubmit }: FormProps) {
  const [form, setForm] = useState(initialFormState);
    const emailRef = React.createRef<HTMLInputElement>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Submitting form:", form);
    e.preventDefault();

    let element = emailRef.current!;
    if ( !(form.name && form.email)
    || form.email.length < 10
    || !form.email.includes("@") ) {
        console.log("Invalid form data:", form);
        element.setCustomValidity("Please enter a valid name and email address.");
        emailRef.current!.reportValidity();
        return;
    } else {
        console.log("Valid form data:", form);
        element.setCustomValidity("");
        emailRef.current!.reportValidity();
    }
    onSubmit(form);
    setForm(initialFormState);
  };

  const handleInput = () => {
    emailRef.current!.setCustomValidity("");
    emailRef.current!.reportValidity();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
            type="email"
            name="email"
            ref={emailRef}
            value={form.email}
            onChange={handleChange}
            onInput={handleInput}
            className="input input-bordered w-full"
            required
        />
      </div>
      <div className="form-control w-auto">
        <input
          type="submit"
          className="btn btn-primary"
          value="Submit"
        />
      </div>
    </form>
  );
}
