const express = require("express");
const router = express.Router();
const data = require('../data/');
const comments = data.comments;
const validate = require('../helper');


router.get('/:id', async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  try {
    return res.redirect("/courses");
  } catch (error) {
    return res.status(404).render("error",
    {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

router.post('/:studentId/:reviewId/:courseId/add', async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  let reviewId = req.params.reviewId
  let studentId = req.params.studentId
  let courseId = req.params.courseId
  let commentVal = req.body.commentValue
  try {
    reviewId = await validate.validateId("Post Add", reviewId, "Review Id");
  } catch (error) {
    return res.status(400).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    studentId = await validate.validateId("Post Add", studentId, "Student Id");
  } catch (error) {
    return res.status(400).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    courseId = await validate.validateId("Post Add", courseId, "Course Id");
  } catch (error) {
    return res.status(400).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    commentVal = await validate.validateString("Post Add", commentVal, "Comment");
  } catch (error) {
    return res.status(400).render("error",{error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    coomentData = await comments.createComment(courseId, studentId, reviewId, commentVal)
    if (coomentData) return res.redirect("/courses/" + courseId);
    else return res.status(404).send();
  } catch (error) {
    return res.status(500).render("error",{error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

router.get('/:courseId/:commentId/delete', async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  let courseId = req.params.courseId
  let commentId = req.params.commentId
  try {
    courseId = await validate.validateId("Get delete", courseId, "Course Id");
  } catch (error) {
    return res.status(400).render("error",{error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
    
  }

  try {
    commentId = await validate.validateId("Get delete", commentId, "Comment Id");
  } catch (error) {
    return res.status(400).render("error",{error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    await comments.getComment(commentId);
  } catch (error) {
    return res.status(404).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    delComm = await comments.removeComment(commentId);
    if (delComm) {
      return res.redirect("/courses/" + courseId);
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    return res.status(500).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

router.post("/:courseId/:commentId/edit", async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  let courseId = req.params.courseId
  let commentId = req.params.commentId
  let commentVal = req.body.commentValue;
  try {
    courseId = await validate.validateId("Post Edit", courseId, "Course Id");
  } catch (error) {
    return res.status(400).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }

  try {
    commentId = await validate.validateId("Post Edit", commentId, "Comment Id");
  } catch (error) {
    return res.status(400).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }

  try {
    commentVal = await validate.validateId("Post Edit", commentVal, "Comment");
  } catch (error) {
    return res.status(400).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    await comments.updateComment(commentId, commentVal);
    return res.redirect("/courses/" + courseId);
  } catch (error) {
    return res.status(404).render("error",{
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

module.exports = router;