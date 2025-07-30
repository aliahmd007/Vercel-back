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

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage: ${message}`,
    });

    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email failed to send' });
  }
});

module.exports = app;





// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "server.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/send-email",
//       "dest": "server.js",
//       "methods": ["POST"]
//     },
//     {
//       "src": "/",
//       "dest": "server.js",
//       "methods": ["GET"]
//     }
//   ],
//   "env": {
//     "EMAIL_USER": "aliahmadgondal007@gmail.com",
//     "EMAIL_PASS": "jwwv bhvk lyci renf"
//   }
// }