# Dev-Chat

A simple messenger/chat app for developers. Full OpenAI integration to allow developers to test/tryout code with the new ChatGPT3.5-turbo verion, and share with other dvelopers in the community.

Built using:

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [React-Chat-Engine](https://chatengine.io/)
- [React-Dropzone](https://react-dropzone.js.org/)
- [React-Router](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [Redux-Tookit](https://redux-toolkit.js.org/)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [OpenAI](https://openai.com/)
- [ChatGPT3.5-turbo](https://openai.com/blog/chatgpt-3-5-turbo/)
- [Axios](https://www.npmjs.com/package/axios)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [CORS](https://www.npmjs.com/package/cors)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Express-Async-Handler](https://www.npmjs.com/package/express-async-handler)
- [Express-Rate-Limit](https://www.npmjs.com/package/express-rate-limit)
- [UUID](https://www.npmjs.com/package/uuid)
- [Date-FNS](https://date-fns.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Installation

Clone the repository and install the dependencies.

```bash
git clone
cd dev-chat
npm install
```

Add environment variables in a .env file in the server directory.

```bash
PORT=8000 || <your_port_number>
NODE_ENV=<development> || <production>
PROJECT_ID=your_react_chat_engine_project_id
PRIVATE_KEY=your_react_chat_engine_private_key
BOT_USER_NAME=your_react_chat_engine_ai_bot_user_name
BOT_USER_SECRET=your_react_chat_engine_ai_bot_user_password
OPENAI_API_KEY=your_openai_api_key
```

Run the app on both the client and server

```bash
client => npm run dev
server => nodemon server.js
```

## Usage

1. Create a new account or login to an existing account.
2. Create a new chat room or join an existing chat room.
3. Start chatting with other developers in the community.
4. Share code snippets with other developers in the community.
5. Test/tryout code with the new ChatGPT3.5-turbo verion.
