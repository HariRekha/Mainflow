const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const uri = "mongodb+srv://hari:1234@cluster0.fdoweer.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Failed to connect to the database', err));

const db = client.db('2200080036');
const col = db.collection('taskmanager');

// API to add a new task
app.post('/add-task', async (req, res) => {
    const { task } = req.body;
    try {
        const result = await col.insertOne({ task, status: 'incomplete' });
        res.status(200).send(result.ops[0]);
    } catch (error) {
        res.status(500).send({ message: 'Failed to add task' });
    }
});

// API to update task status
app.put('/update-task/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await col.updateOne(
            { _id: ObjectId(id) },
            { $set: { status } }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Task status updated' });
        } else {
            res.status(404).send({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to update task status' });
    }
});

// API to get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await col.find({}).toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve tasks' });
    }
});

// API to get incomplete tasks
app.get('/tasks/incomplete', async (req, res) => {
    try {
        const tasks = await col.find({ status: 'incomplete' }).toArray();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve incomplete tasks' });
    }
});

app.listen(8081, () => console.log("Server running on port 8081"));
