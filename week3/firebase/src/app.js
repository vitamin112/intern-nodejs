var admin = require("firebase-admin");

var serviceAccount = require("../serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

(async () => {
  const res = await db.collection("cities").add({
    name: "Tokyo",
    country: "Japan",
  });

  console.log("Added document with ID: ", res.id);
})();
