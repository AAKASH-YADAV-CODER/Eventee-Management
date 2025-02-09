# 🎉 Eventee - Event Management Platform

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Powered by Node.js](https://img.shields.io/badge/Powered%20by-Node.js-43853D?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Eventee is a modern event management platform that allows users to create, manage, and explore events. With robust authentication and role-based access, users can easily organize and participate in various events.Additionally,there is a guest user access to explore the events but limited to only view the events.

## ✨ Features

- 🔐 Secure user authentication
- 📅 Create and manage events
- 🗑️ Delete your own events
- 👥 Guest user access
- 🎨 Modern and responsive UI
- ⚡ Fast and efficient performance

## 🚀 Tech Stack

### Frontend

- React + Vite
- TailwindCSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary for image storage

## 🛠️ Installation & Setup

### Frontend Setup

1. Clone the repository
   git clone
   https://github.com/AAKASH-YADAV-CODER/Eventee-Management.git

cd eventee/frontend 2. Install dependencies
npm install

3. Start the development server
   npm run dev

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Backend Setup

1. Navigate to the backend directory

cd ../backend

2. Install dependencies
   npm install

3. Start the development server
   npm run server

4. Create a `.env` file in the backend directory
   env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eventee
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development

## 🔑 User Roles

### Authenticated Users

- Create new events
- Delete their own events
- View all events
- Update their profile

### Guest Users

- View all events
- Limited access to event details
- Cannot create or delete events

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `DELETE /api/events/:id` - Delete event
- `GET /api/events/:id` - Get single event

## 📝 Environment Variables

### Frontend (.env)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/eventee/issues).

## 📄 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

Aakash Yadav

- GitHub: [@AAKASH-YADAV-CODER](https://github.com/AAKASH-YADAV-CODER)
