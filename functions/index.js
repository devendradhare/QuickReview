/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getLikesInfo = functions.https.onCall(async (data, context) => {
  const {commentId, userId} = data; // Input parameters from the client
  const db = admin.firestore();

  const commentDoc = await db.collection("comments").doc(commentId).get();
  if (!commentDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Comment not found");
  }

  const likes = commentDoc.data().likes || []; // Get the likes array
  const likesCount = likes.length;
  // Check if the array contains the user's UID
  const isLiked = likes.includes(userId);

  return {likesCount, isLiked};
});
