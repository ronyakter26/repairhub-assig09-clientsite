# FixMate — Repair Service Marketplace

FixMate is a full-stack repair service marketplace that connects customers with technicians. Customers can find repair services, request repairs, track job progress, and pay securely after service completion. Technicians can manage their services and repair requests, while administrators manage users, services, bookings, and transactions.

## 🌐 Live Website

- **Live Site:** https://repairhub-assig09-clientsite-m7c8.vercel.app/
- **Backend API:** https://repair-hub-assig09-server.vercel.app/

## 🔐 Admin Demo Credentials

Use the following credentials to explore the admin dashboard:

- **Email:** ronyakter418@gmail.com
- **Password:** Rony@123456

## ✨ Key Features

### Customer
- Register and log in securely.
- Browse, search, filter, and sort approved repair services.
- View service details and technician information.
- Submit repair requests.
- Track booking and repair progress.
- Cancel requests while they are still pending.
- Pay for completed repair jobs using Stripe.
- View payment history.
- Update profile information and photo.

### Technician
- Manage technician profile.
- Add repair services with images.
- Update and delete personal service listings.
- Manage service availability.
- Accept or reject repair requests.
- Update job status.
- Set the final repair amount when completing a job.

### Admin
- View dashboard statistics.
- Manage users and user roles.
- Approve or reject repair services.
- Monitor all bookings.
- View payment transactions and total revenue.

### Additional Features
- Role-based dashboards and protected routes.
- BetterAuth authentication.
- JWT-based API authorization.
- Responsive design for mobile, tablet, and desktop.
- Toast notifications and confirmation dialogs.
- Stripe test-mode payment integration.
- ImgBB image upload integration.

## 🛠️ Technology Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Sonner

**Authentication & Database**
- BetterAuth
- MongoDB
- JWT

**Backend & Payment**
- Node.js
- Express.js
- Stripe
- ImgBB API

## 📦 NPM Packages

### Frontend Dependencies
- `next`
- `react`
- `react-dom`
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `lucide-react`
- `sonner`

### Development Dependencies
- `typescript`
- `tailwindcss`
- `eslint`
- `eslint-config-next`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@tailwindcss/turbopack`
- `babel-plugin-react-compiler`

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ronyakter26/repairhub-assig09-clientsite.git
```

### 2. Go to the Project Directory

```bash
cd repairhub-assig09-clientsite
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and configure the required environment variables.

Example:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
```

Add any other environment variables required by your authentication and image-upload configuration.

**Never commit `.env.local` or expose secret keys in your repository.**

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
```

## 📁 GitHub Repository

- **Client Repository:** https://github.com/ronyakter26/repairhub-assig09-clientsite
- **Server Repository:** https://github.com/ronyakter26/repairhub-assig09-serversite

## 👨‍💻 Project Purpose

FixMate aims to make repair services easier to find and manage through a simple and user-friendly online platform. It provides a complete workflow for customers, technicians, and administrators, including service management, repair requests, job tracking, and secure online payments.

---

**Developed as a Full-Stack Web Development Project.**