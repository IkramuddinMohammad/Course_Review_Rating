const comments = require("./comments");
const courses = require("./courses");
const reviews = require("./reviews");
const students = require("./students");
const validate = require('../helper');

const constructorMethod = app => {
  app.use("/comments", comments);
  app.use("/courses", courses);
  app.use("/reviews", reviews);
  app.use("/students", students);

  app.get("/", (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    res.status(200).render("index", { studentLoggedIn: sessionValidate.studentLoggedIn, adminLoggedIn: sessionValidate.adminLoggedIn });
  });

  app.use('*', (req, res) => {
    res.status(404).render("error", {
      error: 'Not found'
    });
  });
};

module.exports = constructorMethod;