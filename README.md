
README.md for Legitly-v5.0 (yes this is th e actually the 105th version, give or take.)

## 🚀 Legitly – Legal Assistance Made Easy

Legitly is a **modern legal assistance platform** that helps users navigate legal issues efficiently. Built with **Next.js**, **Tailwind CSS**, and powered by **Firebase Firestore**, Legitly enables users to submit legal cases, store case details securely, and access legal resources.

___

### 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS  <br>
- **Backend:** Firebase Firestore (NoSQL), Firebase Authentication  <br>
- **Storage:** Firebase Storage  <br>
- **Authentication:** Firebase Auth  <br>
- **Deployment:** Vercel (Frontend), Firebase Hosting (if applicable)  <br>

___

### ⚡ Features
1. ✅ **User Authentication** – Secure login & signup with Firebase Auth  <br>
2. ✅ **Case Management** – Users can submit, update, and view their legal cases  <br>
3. ✅ **Cloud Firestore Integration** – Secure NoSQL database for case storage  <br>
4. ✅ **Secure Access Control** – Firestore rules ensure only users can access their own cases  <br>
5. ✅ **Responsive Design** – Fully responsive UI with Tailwind CSS  <br>

___

## 📦 Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/1urbanotter/legitly-v5.0.git
cd legitly
```

### 2️⃣ ** Install Dependencies**
```
npm install
```

### 3️⃣ **Setup Environment Variables**
```
Create a .env.local file in the root directory and add the following:
```

### **API URLs**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
// or 3001
```

### **Firebase Configuration**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### **Firebase Admin SDK (For Server-side operations)**
```
FIREBASE_ADMIN_SDK_SERVICE_ACCOUNT_KEY='{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "your_private_key",
  "client_email": "your_client_email",
  "client_id": "your_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your_client_x509_cert_url"
}'
```

### 4️⃣ **Run the Development Server**
```
npm run dev
```

**Open http://localhost:3000 in your browser.**

___

### 🔥 **Firebase Firestore Rules**

**Legitly enforces strong Firestore security rules to protect user data:**
```
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User Collection: Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Cases Collection: Users can only access their own cases
    match /cases/{caseId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

📌 **Note:** Update Firestore rules in the Firebase Console under **Firestore Database > Rules**.

___

## 🚀 **Deployment**

###  Deploy to Vercel (Frontend)
```
vercel deploy
```

### Deploy Firebase Functions (If Used)
```
firebase deploy --only functions
```
___

## 🛠 **Project Structure**

<details>
  <summary>### CLICK to Expand Directory Tree</summary>
  
  **your/path/to/legitly-v5.0/**
  
    ── README.md
    ├── app
    │   ├── (auth)
    │   │   ├── login
    │   │   │   └── page.tsx
    │   │   └── signup
    │   │       └── page.tsx
    │   ├── api
    │   │   ├── case
    │   │   │   └── analyze
    │   │   │       └── [id]
    │   │   │           └── route.tsx
    │   │   ├── cases
    │   │   │   ├── [caseId]
    │   │   │   │   └── route.tsx
    │   │   │   └── route.ts
    │   │   ├── login
    │   │   │   └── route.tsx
    │   │   ├── signup
    │   │   │   └── route.tsx
    │   │   └── users
    │   │       └── [userId]
    │   │           └── route.ts
    │   ├── case
    │   │   ├── [userId]
    │   │   │   └── page.tsx
    │   │   ├── edit
    │   │   │   └── [userId]
    │   │   │       └── page.tsx
    │   │   └── new
    │   │       └── page.tsx
    │   ├── dashboard
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── CaseItem.tsx
    │   ├── common
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorBoundary.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Loading.tsx
    │   │   ├── Navbar.tsx
    │   │   └── SignOutButton.tsx
    │   ├── dashboard
    │   │   ├── CaseItem.tsx
    │   │   ├── CaseList.tsx
    │   │   ├── CaseStats.tsx
    │   │   ├── DashboardHeader.tsx
    │   │   └── QuickActionsPanel.tsx
    │   ├── landing
    │   │   ├── Features.tsx
    │   │   ├── Hero.tsx
    │   │   ├── SignupCTA.tsx
    │   │   └── ValueProp.tsx
    │   ├── providers
    │   │   └── Providers.tsx
    │   └── ui
    │       ├── CaseButton.tsx
    │       └── Select.tsx
    ├── eslint.config.cjs
    ├── jsconfig.json
    ├── lib
    │   ├── api-utils.ts
    │   ├── auth.ts
    │   ├── config.ts
    │   ├── date.ts
    │   ├── firebase.ts
    │   ├── firebaseAdmin.ts
    │   ├── mongodb.ts
    │   └── utils.ts
    ├── models
    │   ├── Case.ts
    │   └── User.ts
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── tailwind.config.js
    ├── tsconfig.json
    └── types
        ├── analysisResults.ts
        ├── case.
        ├── jwt.ts
        └── user.ts
</details>

___

### 🏗️ Future Roadmap

  - Multi-Tenant Support – Allow law firms to manage multiple cases
  - Real-time Chat – Secure communication between users and legal experts
  - AI-powered Legal Insights – Use OpenAI’s GPT to provide case recommendations

### 👨‍💻 **Contributors**
  - Paul B. – Creator & Maintainer
  - Just Me Currently (2/14/2025) – Feel free to contribute!

### 📝 License

No Idea. Please help me understand. I use AI for help, often. 

### 📌 **Disclaimer:** This app **does not provide legal advice**. Always consult a licensed attorney for legal matters.

### 🎯 Final Notes

✅ Ready for production? Make sure to:
  - Set up Firebase Firestore Security Rules 
	- Use Firebase Hosting (or Vercel) for deployment 
	- Monitor Firestore costs (since Spark Plan has limits) 

### 🚀 Happy Coding!

___

### **Why This README is Great??**<br>
1. ✅ **Complete & Clear Setup Instructions** – So contributors can onboard quickly  <br>
2. ✅ **Security Best Practices** – `.gitignore` & Firestore rules to protect user data  <br>
3. ✅ **Future Roadmap** – Shows long-term goals and encourages contribution  <br>
4. ✅ **Professional Formatting** – Makes it easy to read and scan <br>
5. ✅ **ChatGPT Seal of Approval!** – What a time to be alive, am I right?!<br>


**Would you like to tweak anything or add specific details? 🚀**

Yes. Please hit me up! I mean do contact me, lets colaborate.<br>
This is a rough shell of even coming close to half of a piece of something MVP worthy. All help is appreciated and please don't mind my mess. lEgitly is my passion and I am determined to create it even if it's unpopular or unwise to do so.<br>
# Cheers! 🍻
