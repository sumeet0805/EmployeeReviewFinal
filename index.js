const express = require("express");
const bodyParser = require("body-parser");
const port = 1000;
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));
const db = require("./config/mongoose");
const Employee = require("./models/employee");
const review = require("./models/reviews");
app.use(express.urlencoded());
app.get("/", function (req, res) {
  res.render("home", {
    title: "Issue Tracker Mechanism",
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error inside the code", err);
  }
  console.log("Server is running smoothly on port,", port);
});
app.post("/submitReviewerName", function (req, res) {
  const employeeFullName = req.body.employeeFullName;
  const submittedData = req.body.reviewerFullName2;
  const Username=req.body.employeeUsername;
  const fullNameStartIndex = submittedData.indexOf("FullName: '") + 11; // Adding 11 to skip the length of "FullName: '"
  const fullNameEndIndex = submittedData.indexOf("'", fullNameStartIndex);
  const fullName = submittedData.substring(
    fullNameStartIndex,
    fullNameEndIndex
  );

  updateReviewerAssigned(employeeFullName, true, fullName);

  Employee.find({ username: Username})
    .then((result1) => {
      if (result1[0] != null && !result1[0].isAdmin) {
        Employee.find({})
          .then((result2) => {
            return res.render("EmployeeDetails", {
              employee: result1[0],
              list: result2,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.send({ kq: 0, msg: "kết nối DB thất bại" });
          });
      } else {
        Employee.find({})
          .then((result2) => {
            return res.render("AdminDetails", {
              employee: result1[0],
              list: result2,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.send({ kq: 0, msg: "kết nối DB thất bại" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send({ kq: 0, msg: "kết nối DB thất bại" });
    });
});

app.post("/Login", function (req, res) {
  console.log(req.body);
  const { Username, Password } = req.body;

  Employee.find({ username: Username, password: Password })
    .then((result1) => {
      if (result1[0] != null && !result1[0].isAdmin) {
        Employee.find({})
          .then((result2) => {
            return res.render("EmployeeDetails", {
              employee: result1[0],
              list: result2,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.send({ kq: 0, msg: "kết nối DB thất bại" });
          });
      } else {
        Employee.find({})
          .then((result2) => {
            return res.render("AdminDetails", {
              employee: result1[0],
              list: result2,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.send({ kq: 0, msg: "kết nối DB thất bại" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send({ kq: 0, msg: "kết nối DB thất bại" });
    });
});

app.post("/submitReviewe", function (req, res) {
  const { employeeFullName, Review ,loggedinpassword,loggedinusername} = req.body;
  updateReviewe(employeeFullName, Review, true);

  Employee.find({ username: loggedinusername, password: loggedinpassword })
  .then((result1) => {
    if (result1[0] != null && !result1[0].isAdmin) {
      Employee.find({})
        .then((result2) => {
          return res.render("EmployeeDetails", {
            employee: result1[0],
            list: result2,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.send({ kq: 0, msg: "kết nối DB thất bại" });
        });
    } else {
      Employee.find({})
        .then((result2) => {
          return res.render("AdminDetails", {
            employee: result1[0],
            list: result2,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.send({ kq: 0, msg: "kết nối DB thất bại" });
        });
    }
  })
  .catch((err) => {
    console.log(err);
    return res.send({ kq: 0, msg: "kết nối DB thất bại" });
  });
});

app.post("/createEmployee", function (req, res) {
  console.log(req.body);
  const { Username, Password, EID, FullName, Designation } = req.body;

  Employee.create({
    EID: EID,
    username: Username,
    password: Password,
    Designation: Designation,
    isAdmin: false,
    FullName: FullName,
    isReviewerAssigned: false,
    isReviewSubmitted: false,
    ReviewedBy: "NA",
    Review: "NA",
  })
    .then((result) => {
      Employee.find({ username: Username, password: Password })
        .then((result1) => {
          if (result1[0] != null && !result1[0].isAdmin) {
            Employee.find({})
              .then((result2) => {
                return res.render("EmployeeDetails", {
                  employee: result1[0],
                  list: result2,
                });
              })
              .catch((err) => {
                console.log(err);
                return res.send({ kq: 0, msg: "kết nối DB thất bại" });
              });
          } else {
            Employee.find({})
              .then((result2) => {
                return res.render("AdminDetails", {
                  employee: result1[0],
                  list: result2,
                });
              })
              .catch((err) => {
                console.log(err);
                return res.send({ kq: 0, msg: "kết nối DB thất bại" });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.send({ kq: 0, msg: "kết nối DB thất bại" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send({ kq: 0, msg: "kết nối DB thất bại" });
    });
});

const updateReviewerAssigned = async (fullName, isAssigned, reviewedby) => {
  try {
    const result = await Employee.findOneAndUpdate(
      { FullName: fullName },
      { 
        isReviewerAssigned: isAssigned,
        ReviewedBy: reviewedby
      },
      { new: true } // Return the updated document
    );

    if (result) {
      console.log("Employee updated:", result);
    } else {
      console.log("Employee not found.");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};

const updateReviewe = async (fullName, review, isAsigned) => {
  try {
    const result = await Employee.findOneAndUpdate(
      { FullName: fullName },
      { isReviewSubmitted: isAsigned ,
       Review: review },
      { new: true } // Return the updated document
    );

    if (result) {
      console.log("Employee updated:", result);
    } else {
      console.log("Employee not found.");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};
