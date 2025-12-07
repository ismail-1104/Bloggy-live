import { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    setLoading(true);

    try {
      // Send to our own backend API
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Form Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="contactContainer">
        <div className="contactHeader">
          <h1 className="contactTitle">Get In Touch</h1>
          <p className="contactSubtitle">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="contactContent">
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label>Your Name</label>
              <input
                type="text"
                className="contactInput"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label>Your Email</label>
              <input
                type="email"
                className="contactInput"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label>Subject</label>
              <input
                type="text"
                className="contactInput"
                placeholder="What's this about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label>Message</label>
              <textarea
                className="contactTextarea"
                placeholder="Write your message here..."
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button 
              className="contactButton" 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="successMessage">
                ✓ Message sent successfully! I'll get back to you soon.
              </p>
            )}
            
            {error && (
              <p className="errorMessage">
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
