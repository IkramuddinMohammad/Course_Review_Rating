const express = require("express");
const router = express.Router();
const data = require('../data/');
const comments = data.comments;

<<<<<<< Updated upstream
router.get("/:id", async (req, res) => {
    try {
      const comment = await comments.getComment(req.params.id);
      res.status(200).render("comment", {commentText: comment.commentText})
    } catch (e) {
      res.status(404).json({ message: "Comment not found!" });
    }
});

router.get("/", async (req, res) => {
    try {
      const commentList = await comments.getAllComments();
      res.status(200).json(commentList)
    } catch (e) {
      // Something went wrong with the server!
      res.status(404).send();
    }
});

router.post('/:studentId/:reviewId/:courseId/add', async (req, res) => {
    if (!req.params.reviewId || !req.params.studentId) {
      res.status(400).json({ error: 'You must Supply an ID to add comment to!' });
      return;
	}
	const commentVal = req.body.commentValue;
    try {
      addCommentOnReview = await comments.addComment(req.params.studentId, req.params.reviewId, commentVal)
      if(addCommentOnReview){
        return res.redirect("/courses/" + req.params.courseId);
      } else {
        return res.status(404).send();
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

router.get('/:courseId/:commentId/delete', async (req, res) => {
	if (!req.params.commentId) {
		res.status(400).json({ error: 'You must Supply an ID to delete' });
		return;
	}
	try {
		await comments.getComment(req.params.commentId);
	} catch (e) {
		res.status(404).json({ error: 'Comment not found!' });
		return;
	}
	try {
    deleteCommentsFromReview = await comments.removeComment(req.params.commentId);
    if(deleteCommentsFromReview){
      return res.redirect("/courses/" + req.params.courseId);
    } else {
      return res.status(404).send();
    }
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.post("/:courseId/:commentId/edit", async (req, res) => {
  const data = req.body;
  const rating = data.rating;
  const commentVal = req.body.commentValue;
  let hasError = false;
  let error = [];

  try {
    const updatedComment = await comments.updateComment(req.params.commentId, commentVal);
    return res.redirect("/courses/" + req.params.courseId);
  } catch (e) {
    console.log(e);
    res.status(404).json ({message: "Could not update comment!"});
=======
router.get('/:id', async (req, res) => {
  try {
    return res.redirect("/courses");
  } catch (error) {
    return res.status(404).render("error",{error: error});
  }
});

router.post('/:studentId/:reviewId/:courseId/add', async (req, res) => {
  let reviewId = req.params.reviewId
  let studentId = req.params.studentId
  let courseId = req.params.courseId
  let commentVal = req.body.commentValue
  try {
    reviewId = await validate.validateId("Post Add", reviewId, "Review Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }
  try {
    studentId = await validate.validateId("Post Add", studentId, "Student Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }
  try {
    courseId = await validate.validateId("Post Add", courseId, "Course Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }
  try {
    commentVal = await validate.validateString("Post Add", commentVal, "Comment");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }
  try {
    coomentData = await comments.createComment("Post Add", studentId, reviewId, commentVal)
    if (coomentData) return res.redirect("/courses/" + courseId);
    else return res.status(404).send();
  } catch (error) {
    return res.status(500).render("error",{error: error});
  }
});

router.get('/:courseId/:commentId/delete', async (req, res) => {
  let courseId = req.params.courseId
  let commentId = req.params.commentId
  try {
    courseId = await validate.validateId("Get delete", courseId, "Course Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
    
  }

  try {
    commentId = await validate.validateId("Get delete", commentId, "Comment Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }
  try {
    await comments.getComment(commentId);
  } catch (error) {
    return res.status(404).render("error",{error: error});
  }
  try {
    delComm = await comments.removeComment(commentId);
    if (delComm) {
      return res.redirect("/courses/" + courseId);
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    return res.status(500).render("error",{error: error});
  }
});

router.post("/:courseId/:commentId/edit", async (req, res) => {
  let courseId = req.params.courseId
  let commentId = req.params.commentId
  let commentVal = req.body.commentValue;
  try {
    courseId = await validate.validateId("Post Edit", courseId, "Course Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }

  try {
    commentId = await validate.validateId("Post Edit", commentId, "Comment Id");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }

  try {
    commentVal = await validate.validateId("Post Edit", commentVal, "Comment");
  } catch (error) {
    return res.status(400).render("error",{error: error});
  }
  try {
    await comments.updateComment("Post Edit", commentId, commentVal);
    return res.redirect("/courses/" + courseId);
  } catch (error) {
    return res.status(404).render("error",{error: error});
>>>>>>> Stashed changes
  }
});

module.exports = router;