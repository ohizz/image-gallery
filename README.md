A drag and drop image gallery where you can quickly upload your photos and see it.


TECHNOLOGY
Nextjs
Tailwindcss
Firebase Authentication
Firebase Storage

FEATURES
-Sign up
-Sign in
-Image upload

INSTALLATION
Clone the repository and run npm install if you use npm as package manager or yarn install if you use yarn as package manager.

Step by step tutorial

Activate Firebase Authentication Providers

Authentication -> Sign-in-method -> Enable Email/Password & Google provider

Configure your firebase configuration src/environments/firebaseConfig.js

export const FireBaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID"
};


Run the Server.