const express = require("express");
const router = express.Router();
const data = require('../data/');
const reviews = data.reviews;
const validate = require('../helper');

router.get("/", async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  try {
    return res.redirect("/courses");
  } catch (error) {
    return res.status(404).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});
router.get('/:id', async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  try {
    return res.redirect("/");
  } catch (error) {
    return res.status(404).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

router.post("/:id/add", async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  let id = req.params.id;
  let rating = Number(req.body.rating);
  let reviewText = req.body.reviewText;
  let semesterVal = req.body.selectSemester
  let studentId = sessionValidate.studentLoggedIn;
  try {
    id = await validate.validateId("Post Add", id, "id");
  } catch (error) {
    return res.status(404).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    rating = validate.validateNumber("Post Add", rating, "rating");
  } catch (error) {
    return res.status(400).render("error", {error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn});
  }
  try {
    semesterVal = validate.validateString("Post Add", semesterVal, "semester");
  } catch (error) {
    return res.status(400).render("error", {error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    reviewText = await validate.validateString("Post Add", reviewText, "reviewText");
  } catch (error) {
    return res.status(400).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    await reviews.createReview(id, studentId, semesterVal, rating, reviewText,);
    return res.redirect("/courses/" + id);
  } catch (error) {
    return res.status(404).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

router.route("/:id/edit")
  .get(async (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    let id = req.params.id;
    let studentId = sessionValidate.studentId ;
    try {
      id = await validate.validateId("Get Edit", id, "id");
    } catch (error) {
      return res.status(400).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
    try {
      const review = await reviews.getReview(id);
      let semesterVal= review.semesterVal;
      if (studentId != review.studentId) {
        return res.redirect("/reviews");
      } else {
        res.status(200).render("editReview", {
          reviewId: id,
          reviewData: review.reviewData,
          rating: review.rating,
          semesterVal: semesterVal,
          studentLoggedIn: sessionValidate.studentLoggedIn
        });
      }
    } catch (error) {
      return res.status(404).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
  }).post(async (req, res) => {
    sessionValidate = validate.sessionValidation(req.session.AuthCookie)
    let id = req.params.id
    let rating = Number(req.body.rating);
    let reviewData = req.body.reviewData;
    let semesterVal = req.body.semesterVal;
    let studentId = sessionValidate.studentId
    try {
      id = validate.validateId("Post Edit", id, "id");
    } catch (error) {
      return res.status(400).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
    try {
      rating = validate.validateNumber("Post Edit", rating, "rating");
    } catch (error) {
      return res.status(400).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
    if (rating > 5 || rating < 1) {
      return res.status(400).render("error", {
        error: "Post Edit: Rating should between 1 and 5", 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
    try {
      reviewData = validate.validateString("Post Edit", reviewData, "reviewData");
    } catch (error) {
      return res.status(400).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
    try {
      const reviewInfo = await reviews.getReview(id);
      await reviews.updateReview(id, semesterVal, rating, reviewData);
      if (studentId === reviewInfo.studentId) {
        isStudentReviewer = true;
      }
      return res.status(200).redirect("/courses");
    } catch (error) {
      return res.status(404).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
  });

router.get('/:courseId/:reviewId/delete', async (req, res) => {
  sessionValidate = validate.sessionValidation(req.session.AuthCookie)
  let courseId = req.params.courseId
  let reviewId = req.params.reviewId
  try {
      id = validate.validateId("Get Delete", courseId, "course Id");
    } catch (error) {
      return res.status(400).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
    try {
      id = validate.validateId("Get Delete", reviewId, "review Id");
    } catch (error) {
      return res.status(400).render("error", {
        error: error, 
        studentLoggedIn: sessionValidate.studentLoggedIn, 
        adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
  try {
    await reviews.getReview(reviewId);
  } catch (error) {
    return res.status(404).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
  try {
    delRev = await reviews.removeReview(req.params.reviewId);
    if (delRev) {
      return res.redirect("/courses/" + req.params.courseId);
    } else {
      return res.status(404).render("error", {
        error: "not able to delete comments",
        studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
      });
    }
  } catch (error) {
    return res.status(400).render("error", {
      error: error, 
      studentLoggedIn: sessionValidate.studentLoggedIn, 
      adminLoggedIn: sessionValidate.adminLoggedIn
    });
  }
});

module.exports = router;