const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Change to true if using HTTPS
}));

const uri = "mongodb+srv://hari:1234@cluster0.fdoweer.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Failed to connect to the database', err));

const db = client.db('Authentication');
const col = db.collection('Users');

app.post('/insert', async (req, res) => {
    const { name, email, password } = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const existingUser = await col.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, and include at least one uppercase letter, one number, and one special character",
        });
    }

    await col.insertOne({ name, email, password });
    res.status(200).json({ message: "User registered successfully" });
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await col.findOne({ email });

    if (user && user.password === password) {
        req.session.user = user;
        res.status(200).json({ message: "Sign-in successful" });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

app.get('/home', (req, res) => {
    res.send("Home Page");
});

// Middleware to check if user is authenticated
const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized: Please log in" });
    }
};

app.get('/protected-page', requireLogin, (req, res) => {
    res.send("This is a protected page, only accessible after login");
});

app.listen(8081, () => console.log("Server running on port 8081"));
