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
  let staffdet = staffdetails.map((data) => {
    let studentcount = studentdetails.filter((item) => item.staffid === data.id);
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      student_Count: studentcount.length,
    };
  });
  res.json(staffdet);
});

app.delete("/studentdetails/:id", (req, res) => {
 const id=req.params.id
  let filterVal = studentdetails.filter((a) => {
    if (a.id == id) {
      return a;
    }
  })[0];
  let index = studentdetails.indexOf(filterVal);
  studentdetails.splice(index, 1);
  res.send(studentdetails);
});

app.listen(process.env.PORT || port, () => {
  console.log(`server is listening ${port}`);
});
