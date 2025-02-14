// lib/firebaseAdmin.ts
import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SDK_SERVICE_ACCOUNT_KEY || '{}'
)

console.log('Service account:', serviceAccount)

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const adminAuth = admin.auth()

export { adminAuth }
