<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&size=42&duration=3000&pause=1000&color=FF6B00&center=true&vCenter=true&width=600&lines=🍔+The+Hungry+Hub;Taste+the+Difference!" alt="Typing SVG" />

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<br/>

![Stars](https://img.shields.io/github/stars/manasvitiwari-08/The-Hungry-Hub?style=social)
![Forks](https://img.shields.io/github/forks/manasvitiwari-08/The-Hungry-Hub?style=social)
![Last Commit](https://img.shields.io/github/last-commit/manasvitiwari-08/The-Hungry-Hub?color=FF6B00)

<br/>

> **A modern full-stack food ordering web app** with 3D animations, smooth transitions, and a delicious UI 🍕🍜🍣

</div>

---

## 🌟 Features at a Glance

<div align="center">

| ✨ Feature | 📝 Description |
|:---:|:---|
| 🎨 **3D Hero Canvas** | Interactive Three.js scene on the homepage |
| 🔐 **Auth System** | Register, Login with JWT + OTP email verification |
| 🍽️ **Menu Page** | Beautiful collage-style menu hero section |
| 💌 **Contact Form** | Reach out directly from the website |
| 📱 **Responsive** | Fully responsive across all devices |
| ⚡ **Animations** | GSAP + Framer Motion powered transitions |
| 🛡️ **Secure API** | Helmet, Rate Limiting, CORS protection |
| ☁️ **Cloud Images** | Cloudinary integration for image uploads |

</div>

---

## 🎨 Tech Stack

<details>
<summary><b>🖥️ Frontend</b></summary>
<br/>

| Technology | Version | Purpose |
|---|---|---|
| ⚛️ React | 19 | UI Framework |
| ⚡ Vite | 8 | Build Tool |
| 🛣️ React Router DOM | 7 | Client-side Routing |
| 🌐 Three.js + R3F | Latest | 3D Hero Canvas |
| 🎬 GSAP | 3 | Scroll & Timeline Animations |
| 🎭 Framer Motion | 12 | Page Transitions |
| 📡 Axios | 1 | API Requests |
| 🔔 React Hot Toast | 2 | Notifications |
| 🔤 Poppins + Playfair | - | Typography |

</details>

<details>
<summary><b>🔧 Backend</b></summary>
<br/>

| Technology | Version | Purpose |
|---|---|---|
| 🟢 Node.js | 18+ | Runtime |
| 🚂 Express | 5 | REST API |
| 🍃 MongoDB + Mongoose | 9 | Database |
| 🔑 JWT | 9 | Authentication |
| 🔒 Bcryptjs | 3 | Password Hashing |
| 📧 Nodemailer | 8 | OTP Email Service |
| ☁️ Cloudinary | 2 | Image Uploads |
| 🛡️ Helmet | 8 | HTTP Security Headers |
| 🚦 Express Rate Limit | 8 | API Rate Limiting |

</details>

---

## 📁 Project Structure

```
🍔 The-Hungry-Hub/
│
├── 📂 client/                        # React Frontend (Vite)
│   ├── 📂 public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 auth/
│   │   │   │   └── AuthLeft.jsx      # Auth page left panel
│   │   │   ├── 📂 home/
│   │   │   │   ├── HeroCanvas.jsx    # Three.js 3D canvas
│   │   │   │   └── HeroFoodCards.jsx # Animated food cards
│   │   │   ├── 📂 menu/
│   │   │   │   ├── MenuHeroBg.jsx    # Menu hero background
│   │   │   │   └── MenuHeroCollage.jsx
│   │   │   └── Navbar.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx              # / route
│   │   │   ├── Menu.jsx              # /menu route
│   │   │   ├── About.jsx             # /about route
│   │   │   ├── Contact.jsx           # /contact route
│   │   │   ├── Login.jsx             # /login route
│   │   │   └── Register.jsx          # /register route
│   │   ├── 📂 styles/                # Page-level CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
└── 📂 server/                        # Node.js Backend (Express)
    ├── 📂 models/
    │   └── User.js                   # Mongoose User schema
    ├── 📂 routes/
    │   └── auth.js                   # Auth routes
    ├── 📂 utils/
    │   └── sendOtp.js                # OTP email utility
    ├── .env.example
    └── index.js                      # Entry point
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

```
✅ Node.js v18+
✅ MongoDB Atlas account
✅ Cloudinary account
✅ Gmail App Password (for OTP)
```

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
```

Create `server/.env` from the example:

```bash
cp .env.example .env
```

Fill in your values:

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
npm run dev     # starts on http://localhost:5000
```

---

### 🎨 Step 3 — Setup Frontend

```bash
cd client
npm install
```

Create `client/.env` from the example:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev     # starts on http://localhost:5173
```

---

## 🌐 Pages & Routes

<div align="center">

| 🔗 Route | 📄 Page | 📝 Description |
|:---:|:---:|:---|
| `/` | 🏠 Home | 3D hero canvas + animated food cards |
| `/menu` | 🍽️ Menu | Full menu with collage hero |
| `/about` | ℹ️ About | About the restaurant |
| `/contact` | 📬 Contact | Contact form |
| `/login` | 🔐 Login | User login |
| `/register` | 📝 Register | New user registration |

</div>

---

## 🔐 API Reference

<div align="center">

| Method | Endpoint | Description | Auth |
|:---:|:---|:---|:---:|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login & get token | ❌ |
| `POST` | `/api/auth/send-otp` | Send OTP to email | ❌ |
| `POST` | `/api/auth/verify-otp` | Verify OTP code | ❌ |

</div>

---

## 🛡️ Security

```
🔒  JWT Authentication       →  Secure token-based sessions
🔑  Bcrypt Password Hashing  →  Passwords never stored in plain text
🛡️  Helmet.js               →  Secure HTTP response headers
🚦  Rate Limiting            →  100 requests per 15 minutes
🌐  CORS                     →  Restricted to client URL only
🙈  .env Protection          →  All secrets in environment variables
```

---

## 📸 Color Palette

<div align="center">

| Color | Hex | Usage |
|:---:|:---:|:---|
| 🟠 Orange | `#FF6B00` | Primary accent, CTAs |
| ⚫ Dark | `#1A1A1A` | Background |
| ⚪ White | `#FFFFFF` | Text, cards |
| 🟤 Warm | `#2D2D2D` | Card backgrounds |

</div>

---

## 👩‍💻 Author

<div align="center">

**Manasvi Tiwari**

[![GitHub](https://img.shields.io/badge/GitHub-manasvitiwari--08-181717?style=for-the-badge&logo=github)](https://github.com/manasvitiwari-08)

</div>

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License** — feel free to use and modify it.

---

*Made with ❤️ and lots of 🍔 by Manasvi Tiwari*

</div>
