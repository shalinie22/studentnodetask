const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const port = process.env.PORT || 3000;
let student_details = [];
let staff_details = [];
app.listen(port, () => {
  console.log("hello", port);
});
app.get("/staffget", (req, res) => {
  console.log("staff data is created");
  res.json(staff_details);
});
app.post("/staff", (req, res) => {
  staff_details.push(req.body);
  console.log(staff_details);
  res.json({
    message: "staff-details are created",
  });
});
app.get("/studentget", (req, res) => {
  student_details.push(req.body);
  console.log("students data is created");
  console.log(student_details);
  res.json(student_details);
});
app.post("/student", (req, res) => {
  student_details.push(req.body);
  res.json({ message: "students-details are created" });
});

app.put("/api/staff/:id", (req, res) => {
  let staffId = req.params.id;

  console.log(staffId);
  let c = 0;
  let a = staff_details.find((value, index) => {
    return value.id == staffId;
  });
  let b = student_details.reduce((acc, cur) => {
    if (cur.staffId == staffId) {
      acc = acc + 1;
    }
    return acc;
  });
  a.studentCount = b;
  res.json({
    message: "id created",
  });
});

app.delete("/api/student/:id", (req, res) => {
  let studentsId = req.params.id;
  console.log(studentsId);

  let todeletestudent = student_details.filter((student) => {
    return student.id == studentsId;
  })[0];

  const index = student.indexOf(todeletestudent);

  student_details.splice(index, 1);
  console.log(student_details);

  res.json({ message: `User ${studentsId} deleted.` });
});

