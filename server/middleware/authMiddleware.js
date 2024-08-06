const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with service account
admin.initializeApp({
  credential: admin.credential.cert(
    require("../path/to/your/firebase-adminsdk.json")
  ),
});

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { _id: decodedToken.uid };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
