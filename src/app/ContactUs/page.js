"use client";

import Image from "next/image";
import ourStoryPic from "/public/images/home-image-1.jpg";
import styles from "./home.module.css";
import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");

  function validate(form) {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    if (!form.query.trim()) errs.query = "Query is required.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token: captchaToken }),
      });
      if (res.ok) {
        setStatus("Thank you! Your message has been sent.");
        setForm({ name: "", email: "", query: "" });
      } else {
        const data = await res.json();
        setStatus(data.error || "Failed to send. Try again later.");
      }
    } catch (err) {
      setStatus("Failed to send. Try again later.");
    }
  }

  useEffect(() => {
    if (status && status !== "Sending...") {
      const timeout = setTimeout(() => {
        setStatus("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <>
      <div className={styles.bgWrap}>
        <Image
          src={ourStoryPic}
          alt="Out story pic"
          placeholder="blur"
          quality={100}
          sizes="100vw"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <h1 className={styles.bgHeader}>Contact Us</h1>
      <form className={styles.contactForm} style={{ maxWidth: 400, margin: '40px auto 0', background: 'rgba(255,255,255,0.1)', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name" style={{ display: 'block', color: '#fff', marginBottom: 6 }}>Name</label>
          <input type="text" id="name" name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {errors.name && <div style={{ color: '#ffb3b3', fontSize: 13 }}>{errors.name}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', color: '#fff', marginBottom: 6 }}>Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {errors.email && <div style={{ color: '#ffb3b3', fontSize: 13 }}>{errors.email}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="query" style={{ display: 'block', color: '#fff', marginBottom: 6 }}>Query</label>
          <textarea id="query" name="query" value={form.query} onChange={e => setForm(f => ({ ...f, query: e.target.value }))} required rows={4} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          {errors.query && <div style={{ color: '#ffb3b3', fontSize: 13 }}>{errors.query}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "test"} onChange={(token) => setCaptchaToken(token || "")} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#0070f3', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }} disabled={status === "Sending..." || !captchaToken}>Submit</button>
        {status && <div style={{ marginTop: 16, color: status.startsWith("Thank") ? '#b3ffb3' : '#ffb3b3', fontWeight: 500 }}>{status}</div>}
      </form>
      {(status === "Sending..." || status.startsWith("Thank") || status.startsWith("Failed") || status.startsWith("All fields") || status.startsWith("Invalid")) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            color: '#222',
            borderRadius: 12,
            padding: '36px 32px',
            minWidth: 280,
            boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 500,
          }}>
            {status === "Sending..." ? "Sending..." : status}
          </div>
        </div>
      )}
    </>
  );
}
