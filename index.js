const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyparser.json());
let staffdetails = [];
let studentdetails = [];

app.post("/studentdetails", (req, res) => {
  studentdetails.push(req.body);
  res.json({ message: "created" });
});

app.get("/studentdetails", (req, res) => {
  res.send(studentdetails);
});

app.post("/staffdetails", (req, res) => {
  staffdetails.push(req.body);
  res.json({ message: "created" });
});

app.get("/allstaff", (req, res) => {
  let staf = staffdetails.map((data) => {
    let count = studentdetails.filter((item) => item.staffid === data.id);
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      student_Count: count.length,
    };
  });
  res.json(staf);
});
app.listen(process.env.PORT || port, () => {
  console.log(`server is listening ${port}`);
});
