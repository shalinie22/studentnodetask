const express = require("express");
const app = express();
const body = require("body-parser");
app.use(body.json());
const port = process.env.PORT || 3000;
let student = [];
let staff = [];
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
app.get("/staff", (req, res) => {
  console.log(" create");
  res.json(staff);
});
app.post("/staffDetails", (req, res) => {
  staff.push(req.body);
  console.log(staff);
  res.json({
    message: "created",
  });
});
app.get("/student", (req, res) => {
  student.push(req.body);
 
  res.json(student);
});
app.post("/studentDetails", (req, res) => {
  student.push(req.body);
  res.json({ message: " created" });
});

app.put("/api/staff/:id", (req, res) => {
  let Id = req.params.id;

  console.log(Id);
  let c = 0;
  let a = staff.find((value, index) => {
    return value.id == Id;
  });
  let b = student.reduce((acc, cur) => {
    if (cur.staffId == Id) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  a.studentCount = b;
  res.json({
    message: " created",
  });
});

app.delete("/api/student/:id", (req, res) => {
  let studentId = req.params.id;
  

  let stu = student.filter((s) => {
    return s.id == studentId;
  })[0];

  const index = student.indexOf(stu);

  student.splice(index, 1);
 
  res.json({ message: `deleted.` });
  res.send(student)
});

