AI Help Conversational Chatbot Functionality Implementation Using Firebase Realtime Database

### The Basic Idea
![image](/public/AIChatBot.png)

User gets access to ChatBot Interface to get help and feedback, User then send message to the interface, from the interface user's message are being persisted to a real-time database and synced to all listening nodes, upon persisted the interface sends a request to a backend service which then gets the message from the database then passed to the AI Service, the AI Process the message and give a befitting answer, which is then saved to the real-time database to synced across all connected nodes.


## Requirements
- Create a firebase project and attach a webapp
- Generate the firbase config
- Create a `firebase.ts` in the `src` directory
- Update the `firebase.ts` with the firebase config object

## Test Functionality
Run dev server and send a new message.

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

```ts
// functional implementation
export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const username = "Ayo";

  useEffect(() => {
    const messagesRef = ref(db, `${username}_messages`);
    // listening to realtime update on the database
    const unsubsribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setMessages(Object.values(data));
      }
    });
    return () => {
      unsubsribe();
    };
  }, []);

    // submit send message
  const sendMessage = async (text: string) => {
    const newMessageRef = ref(db, `${username}_messages`)
    const messageRef = push(newMessageRef);
    console.log("This is the message ref", messageRef.key);
    const newMessage = {
      text: text,
      userType: "user",
      timestamp: new Date().toISOString(),
      username: username,
    };
    await set(messageRef, newMessage);
    // sends a post request to the server for ai to process the question and persist the response
    // add the API request here.

  }
  return (
    <div className="text-center py-4">
      <h1>Welcome to the Next.js Firebase Starter</h1>
      <h1>Chat Messages</h1>
      <ul className="my-4">
        {messages.map((message, index) => (
          <li className="text-white" key={index}>{message.text}</li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = (e.target as HTMLFormElement).elements.namedItem("message") as HTMLInputElement;
          console.log(text.value);
          sendMessage(text.value);
          (e.target as HTMLFormElement).reset();
        }}
      >
        <input type="text" className="text-black p-2" name="message" placeholder="Type your message" />
        <button className="mx-2" type="submit">Send</button>
      </form>
    </div>
  );
}
```

