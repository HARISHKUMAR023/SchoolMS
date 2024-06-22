// registerUser.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registerUser = async () => {
  try {
    const userRecord = await admin.auth().createUser({
      email: 'testuser@example.com',
      password: 'password123',
    });
    console.log('Successfully created new user:', userRecord.uid);
  } catch (error) {
    console.error('Error creating new user:', error);
  }
};

registerUser();
