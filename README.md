# 🍔 The Hungry Hub

A full-stack food ordering web application built with React and Node.js, featuring a modern UI with 3D animations, user authentication, and a rich menu experience.

---

## 🚀 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router DOM | Client-side routing |
| Three.js + React Three Fiber | 3D hero canvas |
| GSAP + Framer Motion | Animations |
| Axios | API requests |
| React Hot Toast | Notifications |
| Poppins + Playfair Display | Typography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Nodemailer | OTP email service |
| Cloudinary | Image uploads |
| Helmet + Rate Limiter | Security |

---

## 📁 Project Structure

```
The-Hungry-Hub/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/        # Auth page components
│   │   │   ├── home/        # Hero canvas & food cards
│   │   │   ├── menu/        # Menu hero & collage
│   │   │   └── Navbar.jsx
│   │   ├── pages/           # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── styles/          # Page-level CSS files
│   ├── .env.example
│   └── package.json
│
└── server/                  # Node.js backend (Express)
    ├── models/
    │   └── User.js
    ├── routes/
    │   └── auth.js
    ├── utils/
    │   └── sendOtp.js
    ├── .env.example
    └── index.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Gmail App Password (for OTP emails)

---

### 1. Clone the Repository

```bash
git clone https://github.com/manasvitiwari-08/The-Hungry-Hub.git
cd The-Hungry-Hub
```

---

### 2. Setup Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 3. Setup Client

```bash
cd client
npm install
```

Create a `.env` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

Client runs on `http://localhost:5173`

---

## 🌐 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | 3D hero canvas + food cards |
| `/menu` | Menu | Full menu with hero collage |
| `/about` | About | About the restaurant |
| `/contact` | Contact | Contact form |
| `/login` | Login | User login |
| `/register` | Register | User registration |

---

## 🔐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/send-otp` | Send OTP to email |
| POST | `/api/auth/verify-otp` | Verify OTP |

---

## 🛡️ Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 req / 15 min)
- JWT-based authentication
- Password hashing with bcryptjs
- CORS restricted to client URL
- Environment variables for all secrets

---

## 📦 Environment Files

Use the provided `.env.example` files as templates:

- `client/.env.example`
- `server/.env.example`

> ⚠️ Never commit your actual `.env` files. They are already in `.gitignore`.

---

## 👩‍💻 Author

**Manasvi Tiwari**
- GitHub: [@manasvitiwari-08](https://github.com/manasvitiwari-08)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
