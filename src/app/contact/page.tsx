"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await fetch("https://getform.io/f/akkngrza", {
      method: "POST",
      body: formData,
    });

    setForm({ name: "", email: "", message: "" });
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {submitted ? (
        <div className="bg-[#606C38] p-4 rounded-lg">
          <p className="text-[#FEFAE0]">Thank you! Your message has been sent. We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">Name</label>
            <input
              className="w-full border rounded px-3 py-2 focus-visible:outline-[#283618]"
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              className="w-full border rounded px-3 py-2 focus-visible:outline-[#283618]"
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="message">Message</label>
            <textarea
              className="w-full border rounded px-3 py-2 focus-visible:outline-[#283618]"
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <button
            type="submit"
              className="bg-[#BC6C25] text-[#FEFAE0] px-4 py-2 rounded hover:bg-[#606C38] cursor-pointer"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
