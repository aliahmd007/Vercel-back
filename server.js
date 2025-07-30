// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// // const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // POST route

// app.get('/', (req, res) => {
//   res.send('API is running.');
// });

// app.post('/send-email', async (req, res) => {
//   const { name, email, message } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER, 
//         pass: process.env.EMAIL_PASS, 
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: `New message from ${name}`,
//       text: `Email: ${email}\n\nMessage: ${message}`,
//     });

//     res.json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Email failed to send' });
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on http://localhost:${process.env.PORT}`);
// });





const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'https://portfolio-hfwa.vercel.app', // Your frontend
    'http://localhost:3000' // For local development
  ],
  methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Email endpoint
app.post('/api/send-email', cors(corsOptions), async (req, res) => {
  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name} (Portfolio)`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});