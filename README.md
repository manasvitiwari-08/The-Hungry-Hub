<div align="center">

# 🍔 The Hungry Hub
### *Taste the Difference — Order. Enjoy. Repeat.*

<br/>

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-FF6B00?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)

<br/>

[![GitHub stars](https://img.shields.io/github/stars/manasvitiwari-08/The-Hungry-Hub?style=social)](https://github.com/manasvitiwari-08/The-Hungry-Hub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/manasvitiwari-08/The-Hungry-Hub?style=social)](https://github.com/manasvitiwari-08/The-Hungry-Hub/network)
[![Last Commit](https://img.shields.io/github/last-commit/manasvitiwari-08/The-Hungry-Hub?color=FF6B00&style=flat-square)](https://github.com/manasvitiwari-08/The-Hungry-Hub/commits/main)

<br/>

> 🚀 A **modern full-stack food ordering web app** built with React 19 + Node.js,
> featuring **3D animations**, **JWT auth**, **OTP verification**, and a rich menu experience.

</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|:---|:---|
| 🎨 **3D Hero Canvas** | Interactive Three.js scene on the homepage |
| 🔐 **JWT Auth** | Secure login & register with token-based sessions |
| 📧 **OTP Verification** | Email OTP via Nodemailer for account security |
| 🍽️ **Menu Page** | Beautiful collage-style menu hero section |
| 💌 **Contact Form** | Reach out directly from the website |
| 📱 **Responsive Design** | Fully responsive across all screen sizes |
| ⚡ **Smooth Animations** | GSAP + Framer Motion powered transitions |
| ☁️ **Cloud Image Uploads** | Cloudinary integration |
| 🛡️ **Secure API** | Helmet, Rate Limiting, CORS protection |

</div>

---

## 🎨 Tech Stack

### 🖥️ Frontend

| Technology | Purpose |
|:---|:---|
| ⚛️ **React 19** | UI Framework |
| ⚡ **Vite 8** | Build Tool |
| 🛣️ **React Router DOM v7** | Client-side Routing |
| 🌐 **Three.js + React Three Fiber** | 3D Hero Canvas |
| 🎬 **GSAP 3** | Scroll & Timeline Animations |
| 🎭 **Framer Motion 12** | Page Transitions |
| 📡 **Axios** | HTTP API Requests |
| 🔔 **React Hot Toast** | Toast Notifications |
| 🔤 **Poppins + Playfair Display** | Custom Typography |

### 🔧 Backend

| Technology | Purpose |
|:---|:---|
| 🟢 **Node.js 18+** | JavaScript Runtime |
| 🚂 **Express 5** | REST API Framework |
| 🍃 **MongoDB + Mongoose** | NoSQL Database |
| 🔑 **JWT** | Authentication Tokens |
| 🔒 **Bcryptjs** | Password Hashing |
| 📧 **Nodemailer** | OTP Email Service |
| ☁️ **Cloudinary** | Image Upload & Storage |
| 🛡️ **Helmet** | HTTP Security Headers |
| 🚦 **Express Rate Limit** | API Rate Limiting (100 req/15min) |

---

## 📁 Project Structure

```
🍔 The-Hungry-Hub/
│
├── 📂 client/                          # React Frontend (Vite)
│   ├── 📂 public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 auth/
│   │   │   │   └── AuthLeft.jsx        # Auth page left panel
│   │   │   ├── 📂 home/
│   │   │   │   ├── HeroCanvas.jsx      # Three.js 3D canvas
│   │   │   │   └── HeroFoodCards.jsx   # Animated food cards
│   │   │   ├── 📂 menu/
│   │   │   │   ├── MenuHeroBg.jsx      # Menu hero background
│   │   │   │   └── MenuHeroCollage.jsx # Menu image collage
│   │   │   └── Navbar.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx                # / route
│   │   │   ├── Menu.jsx                # /menu route
│   │   │   ├── About.jsx               # /about route
│   │   │   ├── Contact.jsx             # /contact route
│   │   │   ├── Login.jsx               # /login route
│   │   │   └── Register.jsx            # /register route
│   │   ├── 📂 styles/                  # Page-level CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
└── 📂 server/                          # Node.js Backend (Express)
    ├── 📂 models/
    │   └── User.js                     # Mongoose User schema
    ├── 📂 routes/
    │   └── auth.js                     # Auth API routes
    ├── 📂 utils/
    │   └── sendOtp.js                  # OTP email utility
    ├── .env.example
    └── index.js                        # Server entry point
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

- ✅ Node.js v18+
- ✅ MongoDB Atlas account
- ✅ Cloudinary account
- ✅ Gmail App Password (for OTP emails)

---

### 🔽 Step 1 — Clone the Repo

```bash
git clone https://github.com/manasvitiwari-08/The-Hungry-Hub.git
cd The-Hungry-Hub
```

---

### 🔧 Step 2 — Setup Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/thehungryhub
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

```bash
npm run dev
# ✅ Server running on http://localhost:5000
```

---

### 🎨 Step 3 — Setup Frontend

```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
# ✅ Client running on http://localhost:5173
```

---

## 🌐 Pages & Routes

<div align="center">

| Route | Page | Description |
|:---:|:---:|:---|
| `/` | 🏠 Home | 3D hero canvas + animated food cards |
| `/menu` | 🍽️ Menu | Full menu with collage hero section |
| `/about` | ℹ️ About | About the restaurant |
| `/contact` | 📬 Contact | Contact form |
| `/login` | 🔐 Login | User login with JWT |
| `/register` | 📝 Register | New user registration + OTP |

</div>

---

## 🔐 API Endpoints

<div align="center">

| Method | Endpoint | Description |
|:---:|:---|:---|
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/auth/register` | Register new user |
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/auth/login` | Login & receive JWT |
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/auth/send-otp` | Send OTP to email |
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/auth/verify-otp` | Verify OTP code |

</div>

---

## 🛡️ Security

```
🔒  JWT Authentication      →  Secure token-based sessions
🔑  Bcrypt Hashing          →  Passwords never stored in plain text  
🛡️  Helmet.js              →  Secure HTTP response headers
🚦  Rate Limiting           →  100 requests per 15 minutes per IP
🌐  CORS Policy             →  Restricted to client URL only
🙈  .env Protection         →  All secrets in environment variables
```

---

## 🎨 Brand Colors

<div align="center">

| Swatch | Hex | Usage |
|:---:|:---:|:---|
| 🟠 | `#FF6B00` | Primary accent, buttons, highlights |
| ⚫ | `#1A1A1A` | Main background |
| ⚪ | `#FFFFFF` | Text & card content |
| 🟤 | `#2D2D2D` | Card & section backgrounds |

</div>

---

## 👩‍💻 Author

<div align="center">

**Manasvi Tiwari**

[![GitHub](https://img.shields.io/badge/GitHub-manasvitiwari--08-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manasvitiwari-08)

<br/>

*Made with ❤️ and lots of 🍔*

</div>

---

<div align="center">

![MIT License](https://img.shields.io/badge/License-MIT-FF6B00?style=for-the-badge)

</div>
