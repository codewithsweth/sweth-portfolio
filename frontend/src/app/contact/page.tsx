"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) setSubmitted(true);
  };

  useEffect(() => {
    console.log("formData", formData)
  }, [formData])
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Contact Me</h1>
      {submitted ? (
        <p className="text-green-600 text-center">Thanks for your message!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            required
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <Button
            type="submit"
            variant={"default"}
            className="rounded cursor-pointer"
          >
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}
