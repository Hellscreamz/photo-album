const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const adminRoutes = require('../routes/adminRoutes');
const contactsRoutes = require('../routes/contactsRoutes');
const photoRoutes = require('../routes/photoRoutes');
const userRoutes = require('../routes/userRoutes');

const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(adminRoutes);
app.use(contactsRoutes)
app.use(photoRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
