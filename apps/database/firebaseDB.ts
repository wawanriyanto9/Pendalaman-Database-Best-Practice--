import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-cd239.firebaseio.com',
});

const dbfire = admin.firestore(); 
//
export default dbfire;

