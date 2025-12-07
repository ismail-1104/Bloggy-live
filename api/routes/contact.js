const router = require("express").Router();
const Contact = require("../models/Contact");

// Contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    console.log("Contact Form Submission Saved:");
    console.log("From:", name, `<${email}>`);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("---");

    res.status(200).json({ 
      success: true,
      message: "Message received successfully! We'll get back to you soon." 
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to send message" 
    });
  }
});

// Get all contact messages (for admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
