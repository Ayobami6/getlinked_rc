AI Help Conversational Chatbot Functionality Implementation Using Firebase Realtime Database

### The Basic Idea
![image](/public/AIChatBot.png)

User gets access to ChatBot Interface to get help and feedback, User then send message to the interface, from the interface user's message are being persisted to a real-time database and synced to all listening nodes, upon persisted the interface sends a request to a backend service which then gets the message from the database then passed to the AI Service, the AI Process the message and give a befitting answer, which is then saved to the real-time database to synced across all connected nodes.


## Requirements
- Create a firebase project and attach a webapp
- Generate the firbase config
- Create a `firebase.ts` in the `src` directory
- Update the `firebase.ts` with the firebase config object

```ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    databaseURL: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
```