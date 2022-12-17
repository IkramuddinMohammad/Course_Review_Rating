const { ObjectId } = require('mongodb');

const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const reviews = mongoCollections.reviews;
<<<<<<< Updated upstream
const students = mongoCollections.students;
// const uuid = require('uuid/v4');

module.exports = {
    // I think it makes sense to also add the review id that the comment is being written on
    async addComment(studentId, reviewId, commentText) {
        if (!studentId || (typeof studentId != "string")) throw "studentId must be given as a string";
        if (!reviewId || (typeof reviewId != "string")) throw "reviewId must be given as a string";
        if (!commentText || (typeof commentText != "string")) throw "must give comment text as a string";
=======
const validate = require('../helper');
const { ObjectId } = require('mongodb');

module.exports = {
    async createComment(studentId, reviewId, commentInput) {
        id = await validate.validateId("createComment", studentId, "studentId");
        id = await validate.validateId("createComment", reviewId, "validateId");
        commentInput = await validate.validateString("createComment", commentInput, "commentInput")
>>>>>>> Stashed changes
        const commentCollection = await comments();
        let newComment = {
            studentId: studentId,
            reviewId: reviewId,
            commentText: commentText
        }
<<<<<<< Updated upstream
        const insertInfo = await commentCollection.insertOne(newComment);
        
        const revCollection = await reviews();
        const studentsCollection = await students();
        const objIdForRev = ObjectId.createFromHexString(reviewId);
        const objIdForStudents = ObjectId.createFromHexString(studentId);
        
        if (insertInfo.insertedCount === 0) {
            throw 'Could not add new Review';
        } else {
            //Add the comment id to the review
            const updatedInfo = await revCollection.updateOne({ _id: objIdForRev }, { $push: { comments: String(newComment._id) } });
            if (updatedInfo.modifiedCount === 0) {
                throw 'Could not update Review Collection with Review Data!';
=======
        const insertInfo = await commentCollection.insertOne(addNewComment);
        const reviewCollection = await reviews();
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw 'createComment: Could not add new Review';
        } else {
            const updatedInfo = await reviewCollection.updateOne({
                _id: ObjectId(reviewId)
            }, {
                $push:
                {
                    comments: addNewComment._id.toString()
                }
            });
            if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
                throw 'createComment: Could not update Review Collection with Review Data!';
>>>>>>> Stashed changes
            }
            //Add the comment id to the user
            // const updatedInfo2 = await studentsCollection.updateOne({ _id: objIdForStudents }, { $push: { commentIds: String(newComment._id) } });
            // if (updatedInfo2.modifiedCount === 0) {
            //     throw 'Could not update Studentss Collection with Review Data!';
            // }
        }
<<<<<<< Updated upstream

        const newId = insertInfo.insertedId;
        const newIDString = String(newId);
        const recentComment = await this.getComment(newIDString);
        return recentComment;
    },

    async getComment(id) {
        if (!id) throw "id must be given";
        if (typeof(id) === "string") id = ObjectId.createFromHexString(id);
        const commentCollection = await comments();
        const comment = await commentCollection.findOne({ _id: id});
        if (!comment) throw "Comment with that id does not exist";
=======
        const commentId = insertInfo.insertedId.toString();
        return await this.getComment(commentId);
    },

    async getAllComments() {
        const commentCollection = await comments();
        const allComment = await commentCollection.find({}).toArray();
        if (!allComment) throw "getAllComments: No comments available";
        return allComment;
    },

    async getComment(id) {
        id = await validate.validateId("getComment", id, "commentId");
        const commentCollection = await comments();
        const comment = await commentCollection.findOne({ _id: ObjectId(id) });
        if (!comment) throw `getComment: No comment exists with the ${id}`;
>>>>>>> Stashed changes
        return comment;
    },

    async getAllComments() {
        const commentCollection = await comments();
        const commentList = await commentCollection.find({}).toArray();
        if (commentList.length === 0) throw "no Comments in the collection";
        return commentList;
    },

    async removeComment(id) {
        if (!id) throw "id must be given";
        if (typeof(id) === "string") id = ObjectId.createFromHexString(id);
        const commentCollection = await comments();
        let comment = await this.getComment(id);
        const deleteInfo = await commentCollection.removeOne({ _id: id});
        if (deleteInfo.deletedCount === 0) {
<<<<<<< Updated upstream
            throw "could not delete comment with id of ${id}";
        }
        try {
            const reviewCollection = await reviews();
            const { ObjectId } = require('mongodb');
            const objStudentsId = ObjectId.createFromHexString(comment.reviewId);
            const deletionInfoForCommentFromReview = await reviewCollection.updateOne({ _id: objStudentsId }, { $pull: { comments: String(id) } });
            
            if (deletionInfoForCommentFromReview.deletedCount === 0) {
                throw `Could not delete Comment with id of ${id}`;
            }
        } catch (e) {
            throw "Could not Delete Comment from Review while Deleting Comment!";
=======
            throw `removeComment: No comment exists with the ${id}`;
        }
        try {
            const reviewCollection = await reviews();
            const deletionInfoForCommentFromReview = await reviewCollection.updateOne({
                _id: ObjectId(comment.reviewId)
            }, {
                $pull: {
                    comments: id.toString()
                }
            });
            if (deletionInfoForCommentFromReview.deletedCount === 0) {
                throw `removeComment: Could not delete Comment ${id}`;
            }
        } catch (error) {
            throw "removeComment: Not able delete comment from review comments";
>>>>>>> Stashed changes
        }

        return true;
    },
    
    async updateComment(id, commentText) {
<<<<<<< Updated upstream
        if (!id) throw "Comment Id is missing";
        
        const updatedCommentData = {};
        if (!commentText){
            throw "Please Enter a Comment";
        } else {
            updatedCommentData.commentText = commentText;
        }
    
        if (typeof(id) === "string") id = ObjectId.createFromHexString(id);
        const commentCollection = await comments();
        const updateCommentInfo = await commentCollection.updateOne({ _id: id }, { $set: updatedCommentData });
        if (updateCommentInfo.modifiedCount === 0) throw "Could not update comment";
=======
        id = await validate.validateId("updateComment", id, "commentId");
        commentText = await validate.validateString("updateComment", commentText, "commentInput")
        const updateCommentData = {};
        updateCommentData.commentText = commentText;
        const commentCollection = await comments();
        const updateCommentInfo = await commentCollection.updateOne({
            _id: ObjectId(id)
        },
            {
                $set: updateCommentData
            });
        if (!updateCommentInfo.modifiedCount) throw "updateComment: Could not able update Comment";
>>>>>>> Stashed changes
        return await this.getComment(id);
    }
}