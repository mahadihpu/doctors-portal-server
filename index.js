const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const ObjectId = require("mongodb").ObjectId;

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://doctors:raddrums123@cluster0.e0z6a.mongodb.net/doctors-portal?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

client.connect((err) => {
  const appointmentCollection = client
    .db("doctors-portal")
    .collection("appointment");

  app.post("/appointmentsByDate", (req, res) => {
    const time = req.body;
    console.log(time.date);
    appointmentCollection.find({date: time.date})
      .toArray((err, documents) => {
        res.send(documents);
        console.log(documents)
      });
  });

  app.post("/addAppointment", (req, res) => {
    const appointment = req.body;
    console.log(appointment);
    appointmentCollection.insertOne(appointment).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.get("/", function (req, res) {
  res.send("Hello World ");
});

app.listen(process.env.PORT || 5000);
