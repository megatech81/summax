const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // replace with your email
    pass: 'your_email_password' // replace with your email password
  }
});

// POST route for form submission
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate form data (you can add more validation as needed)

  // Setup email data
  const mailOptions = {
    from: 'your_email@gmail.com', // replace with your email
    to: 'info@summaxsolutions.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error sending email' });
    }
    res.json({ success: true, message: 'Email sent successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
