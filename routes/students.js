const express = require("express");
const router = express.Router();
const data = require('../data');
const validate = require('../helper');
const students = data.students;
const courses = data.courses;
const reviews = data.reviews;
const xss = require('xss');

router
  .route('/logout')
  .get(async (req, res) => {
    res.clearCookie("AuthCookie");
    req.session.destroy();
    res.status(200).redirect("/");
    return;
  })

router
  .route('/login')
  .get(async (req, res) => {
   sessionValidate = validate.sessionValidation(req.session.AuthCookie)
   let studentId = sessionValidate.studentId;
   if (studentId) {
      res.status(200).redirect("/courses");
    } else {
      res.render("login");
    }
  })
  .post(async (req, res) => {
    let email = req.body.email
    let password = req.body.password;
    try{
      email = await validate.validateEmail("Post Login", email, "Email");
      email = email.toLowerCase()
    } catch (error) {
      return res.status(400).render("error", {error: error});
    }
    try{
      password = await validate.validatePassword("Post Login", password);
    } catch (error) {
      return res.status(400).render("error", {error: error});
    }
    try {
      const studentData = await students.checkStudent(xss(email),  xss(password));
      if (studentData.student) {
        let studentId = await students.getStudentsId(email);
        req.session.AuthCookie = studentId;
        req.session.student = studentData.student;
        res.status(200).redirect("/courses");
      } else {
        res.status(400).render("login", {
           error: "Either the email or password is invalid" 
          });
      }
    } catch (error) {
      return res.status(400).render("login", {error: error});
    }
});


  router.route('/register')
  .get(async (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    if (sessionValidate.studentId) {
      res.status(200).redirect("/students/profile");
    } else {
      let error = "Not Authorized"
      res.status(400).render("register", {
        error:error
      });
    }
  }).post(async (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    let firstName = req.body.firstname
    let lastName = req.body.lastname;
    let email = req.body.email
    let password = req.body.password;
    try{
      firstName = await validate.validateName("Post Register", firstName, "First Name" );
    } catch (error) {
      return res.status(400).render("register", {error: error});
    }
    try{
      lastName = await validate.validateName("Post Register", lastName, "Last Name" );
    } catch (error) {
      return res.status(400).render("register", {error: error});
    }
    try{
      email = await validate.validateEmail("Post Register", email, "Email");
    } catch (error) {
      return res.status(400).render("register", {error: error});
    }
    try{
      password = await validate.validatePassword("Post Register", password);
    } catch (error) {
      return res.status(400).render("register", {error: error});
    }
    try {
    const studentData =  await students.createStudents(xss(firstName), xss(lastName), xss(email),  xss(password));
    if (studentData) res.status(200).redirect("/students/login");
    else {
      return res.status(500).error("register", {
           error: "Internal Server Error"
           });
      }
    } catch (error) {
      return res.status(400).render("register", {error: error});
    }       
    
  });

  router.get("/myprofile", async (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    
    if (sessionValidate.studentId) {
      const currentStudents = await students.getStudents(sessionValidate.studentId);
        return res.status(307).render('myprofile', {
          id : sessionValidate.studentId,
          firstName: currentStudents.firstName,
          lastName: currentStudents.lastName,
          email: currentStudents.email
        });  
    } else {
      return res.redirect("/students/login");
    }
  });

  router.get("/profile", async (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    if (sessionValidate.studentId) {
      let studentData = await students.getStudents(sessionValidate.studentId);
      let reviewObject = [];
      for (i=0; i<studentData.reviewIds.length; i++) {
        let latestReview = await reviews.getReview(studentData.reviewIds[i]);
        let currcourse = await courses.getCourse(latestReview.courseId);
        let reviewInfo = {
          review: latestReview,
          course: currcourse
        }
        reviewObject.push(reviewInfo);
      }
      return res.status(307).render('profile', { 
        id: sessionValidate.studentId,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        reviews: reviewObject,
        studentLoggedIn: sessionValidate.studentLoggedIn});
    } else {
      res.status(403).render("login",{
        error: "something went wrong"
      });
    }  
});

router.get("/:id", async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  let id = req.params.id;
    try{
      id = await validate.validateId("Get id", id, "id");
    } catch (error) {
      return res.status(400).render("error", { 
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
  if (sessionValidate.studentId)

  if (id === sessionValidate.studentId) return res.redirect("/students/profile");
    try {
      let studentData = await students.getStudents(id);
      let reviewObj = [];
      for (i=0; i<studentData.reviewIds.length; i++) {
        let curReview = await reviews.getReview(studentData.reviewIds[i]);
        let curcourse = await courses.getCourse(curReview.courseId);
        let reviewDataInfo = {review: curReview, course: curcourse}
        reviewObj.push(reviewDataInfo);
      }
      res.status(200).render("student", { 
        id: studentData._id,
        firstName: studentData.firstName, 
        lastName: studentData.lastName, 
        reviews: reviewObj,
        studentLoggedIn: sessionValidate.studentLoggedIn,
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    } catch (error) {
      return res.status(404).render("error", { 
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
});

module.exports = router;