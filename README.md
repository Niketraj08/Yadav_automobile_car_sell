# Yadav Automobile - Premium Car Dealership Platform

A professional, full-stack MERN (MongoDB, Express, React, Node.js) web application designed for modern car dealerships. This platform offers a seamless experience for buyers to browse and book cars, and for sellers to reach potential buyers, all managed through a robust administrative panel.

## 🌟 Key Features

### 🚗 Vehicle Management
- **Smart Catalog**: High-performance car listing with advanced search and multi-parameter filtering (Brand, Fuel Type, Price Range).
- **Rich Media**: Multi-image support (up to 10 images per car) showing exterior, interior, and engine details.
- **Detailed Insights**: Comprehensive vehicle specifications including mileage, transmission, and history.

### 💼 Professional Services
- **Online Booking**: Secure checkout system for purchasing vehicles or booking test drives.
- **Test Drive Scheduling**: Integrated calendar for users to pick their preferred date and time.
- **Sell Your Car**: dedicated portal for users to submit their car details for dealership appraisal.

### 🔐 Security & UX
- **Theme Engine**: Seamless Dark/Light mode toggle with system persistence.
- **Advanced Auth**: Secure JWT-based authentication for users and administrators.
- **Responsive Design**: Fluid UI optimized for mobile, tablet, and desktop screens.
- **Accessibility**: ARIA-compliant forms and semantic HTML for broad accessibility.

### 🛠️ Admin Ecosystem
- **Command Dashboard**: Live statistics on inventory, users, and pending requests.
- **Inventory Control**: Full CRUD operations for vehicle listings.
- **Request Management**: Approve or reject user-submitted sell requests.
- **Booking Tracking**: Centralized view of all payments and test drive appointments.
- **User Analytics**: Manage registered users and permissions.

## 🚀 Technology Stack

### Frontend Dependencies
- **React**: ^19.2.0 - Modern JavaScript library for building user interfaces
- **React DOM**: ^19.2.0 - React rendering library for the web
- **React Router DOM**: ^7.11.0 - Declarative routing for React applications
- **Axios**: ^1.13.2 - HTTP client for making API requests
- **Framer Motion**: ^12.23.26 - Animation library for React
- **React Icons**: ^5.5.0 - Popular icon library for React
- **Material-UI (MUI)**: ^7.3.6 - React components implementing Material Design
- **Emotion React**: ^11.14.0 - CSS-in-JS library for styling
- **Emotion Styled**: ^11.14.1 - Styled components library

### Frontend DevDependencies
- **Vite**: ^7.2.4 - Fast build tool and development server
- **Tailwind CSS**: ^3.4.3 - Utility-first CSS framework
- **ESLint**: ^9.39.1 - Code linting tool
- **PostCSS**: ^8.4.38 - Tool for transforming CSS with JavaScript
- **Autoprefixer**: ^10.4.19 - PostCSS plugin for adding vendor prefixes
- **@types/react**: ^19.2.5 - TypeScript definitions for React
- **@types/react-dom**: ^19.2.3 - TypeScript definitions for React DOM
- **@vitejs/plugin-react**: ^5.1.1 - Vite plugin for React
- **ESLint plugins**: React hooks and refresh plugins for better development experience

### Backend Dependencies
- **Express.js**: ^5.2.1 - Fast, unopinionated web framework for Node.js
- **MongoDB (Mongoose)**: ^9.0.2 - Elegant MongoDB object modeling for Node.js
- **JSON Web Tokens (JWT)**: ^9.0.3 - Implementation of JSON Web Tokens
- **Bcryptjs**: ^3.0.3 - Password hashing library
- **Multer**: ^2.0.2 - Middleware for handling file uploads
- **Cloudinary**: ^2.8.0 - Image and video management platform (SDK)
- **CORS**: ^2.8.5 - Cross-Origin Resource Sharing middleware
- **Dotenv**: ^17.2.3 - Environment variable loader
- **Nodemon**: ^3.1.11 - Development utility for auto-restarting Node.js applications

### Root Dependencies
- **Concurrently**: ^8.2.2 - Run multiple commands concurrently

## 📥 Setup Instructions

### Prerequisites
- Node.js (v16 or higher) installed on your machine
- MongoDB instance (Local or MongoDB Atlas)
- Git for version control

### Local Development Setup

#### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd client-car-services-panta

# Install all dependencies (client, server, and root)
npm install
```

#### 2. Environment Configuration
Create environment files for local development:

**For Server (`server/.env`):**
```env
# MongoDB Connection (Local)
MONGO_URI=mongodb://127.0.0.1:27017/yadav-automobile
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/your-database-name

# JWT Secret for token signing (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-here-make-it-long-and-random

# Node Environment
NODE_ENV=development
# For production: NODE_ENV=production

# Server Port
PORT=5000

# Frontend URL (for CORS - required when deploying separately)
FRONTEND_URL=http://localhost:5173
# For production: FRONTEND_URL=https://your-frontend-app.onrender.com
```

**For Client (`client/.env`):**
```env
# Backend API URL
VITE_API_URL=http://localhost:5000
# For production: VITE_API_URL=https://your-backend-app.onrender.com
```

**Note**: Create these `.env` files in the respective directories. They are gitignored for security.

**Development URLs:**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

#### 3. Database Setup
1. **Start MongoDB** (if using local):
   ```bash
   # Windows (MongoDB as service) or start manually
   mongod
   ```

2. **Seed the database** with sample data:
   ```bash
   cd server
   node seeder.js
   ```
   *This creates:*
   - Admin account: `admin@gmail.com` / `admin123`
   - User account: `niket@gmail.com` / `niket123`
   - 10 premium car listings

#### 4. Start Development Servers
```bash
# Start both client and server concurrently
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🚀 Render Deployment Guide

This guide covers deploying both **Frontend** and **Backend** as separate services on Render.

### Step 1: Prepare Your Project
1. **Push to GitHub/GitLab** (required for Render deployment)
2. **Ensure all dependencies are listed** in respective package.json files
3. **Verify build scripts** are properly configured

### Step 2: Set Up MongoDB Atlas
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (Free tier available)
3. Set up database user and whitelist IP (0.0.0.0/0 for Render)
4. Get your connection string from "Connect" → "Connect your application"
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/your-database-name`

### Step 3: Deploy Backend (API Server)

1. **Create Backend Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub/GitLab repository
   - Select the repository and branch

2. **Configure Backend Settings**:
   - **Name**: `yadav-automobile-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Root Directory**: `server` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (this runs `node index.js` from server directory)
   - **Plan**: Free tier (or higher for better performance)
   
   **⚠️ Critical Configuration Note**: 
   - When Root Directory is set to `server`, the working directory is already the server folder
   - Start Command should be: `npm start` (which executes `node index.js` from server/package.json)
   - **DO NOT** use `node server/index.js` when Root Directory is `server` - this causes path errors!

3. **Backend Environment Variables** (Add in Render dashboard):
   ```env
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
   JWT_SECRET=27b8ec68381c8039d39f576809964813e2d75677d032f9e50315d2bfc0286685f4a861554e10b53c374954ff43d5a84edce7dbf6fcd738050353fd2a96929641
   PORT=10000
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```
   
   **Important**: Replace `your-frontend-app` with your actual frontend service name after deployment.

4. **Save and Deploy** - Wait for backend deployment to complete (5-10 minutes)
   - Note your backend URL: `https://your-backend-app.onrender.com`

### Step 4: Deploy Frontend (React App)

1. **Create Frontend Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site" (or "Web Service" if using Node)
   - Connect the same GitHub/GitLab repository
   - Select the repository and branch

2. **Configure Frontend Settings**:
   - **Name**: `yadav-automobile-frontend` (or your preferred name)
   - **Environment**: `Static Site` (recommended) or `Node`
   - **Root Directory**: `client` (important!)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free tier

3. **Frontend Environment Variables** (Add in Render dashboard):
   ```env
   VITE_API_URL=https://your-backend-app.onrender.com
   ```
   
   **Important**: Replace `your-backend-app` with your actual backend service URL from Step 3.

4. **Save and Deploy** - Wait for frontend deployment to complete (5-10 minutes)
   - Note your frontend URL: `https://your-frontend-app.onrender.com`

### Step 5: Update Backend CORS (After Frontend Deployment)

1. Go back to your **Backend Service** in Render
2. Navigate to **Environment** tab
3. Update `FRONTEND_URL` to match your frontend URL:
   ```env
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```
4. **Redeploy** the backend service (this will update CORS settings)

### Step 6: Post-Deployment Setup

1. **Seed Production Database**:
   - Go to your **Backend Service** → "Shell" tab
   - Run: `node seeder.js`
   - This creates admin and test user accounts

2. **Verify Deployment**:
   - Frontend: Visit `https://your-frontend-app.onrender.com`
   - Backend API: Visit `https://your-backend-app.onrender.com` (should show "Yadav Automobile API is running")

### Step 7: Access Your Application

- **Frontend URL**: `https://your-frontend-app.onrender.com`
- **Backend API**: `https://your-backend-app.onrender.com`
- **Admin Dashboard**: `https://your-frontend-app.onrender.com/admin/login`

**Test Accounts** (created by seeder):
- **Admin**: admin@gmail.com / admin123
- **User**: niket@gmail.com / niket123

### 📝 Environment Variables Summary

**Backend (`server/.env` or Render Environment Variables):**
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
JWT_SECRET=27b8ec68381c8039d39f576809964813e2d75677d032f9e50315d2bfc0286685f4a861554e10b53c374954ff43d5a84edce7dbf6fcd738050353fd2a96929641
PORT=10000
FRONTEND_URL=https://your-frontend-app.onrender.com
```

**Frontend (`client/.env` or Render Environment Variables):**
```env
VITE_API_URL=https://your-backend-app.onrender.com
```

### 🔄 Alternative: Monolith Deployment (Single Service)

If you prefer to deploy as a single service (backend serves frontend):

1. **Create Web Service** with root directory as project root
2. **Build Command**: `npm run render-build`
3. **Start Command**: `npm start`
4. **Environment Variables**:
   ```env
   NODE_ENV=production
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=10000
   SERVE_STATIC=true
   ```
5. Only one service needed, but less flexible for scaling

## 🔧 Build Commands Reference

### Root Level Scripts
```bash
npm run build          # Build for production
npm run render-build   # Render-specific build command
npm run dev           # Start development servers
npm run server        # Start only backend server
npm run client        # Start only frontend client
```

### Server Scripts (`cd server`)
```bash
npm start    # Start production server
npm run dev  # Start development server with nodemon
```

### Client Scripts (`cd client`)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car details
- `POST /api/cars` - Add new car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)

### Admin
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/sell-requests` - Pending sell requests
- `PUT /api/admin/sell-requests/:id` - Approve/reject requests

### Upload
- `POST /api/upload` - Single image upload
- `POST /api/upload/multiple` - Multiple images upload

## 🛠️ Troubleshooting

### Common Issues
- **Build fails**: Check all dependencies are installed
- **Database connection**: Verify MONGO_URI format and network access
- **Port issues**: Ensure PORT environment variable is set
- **Static files**: Make sure client build completes successfully

### Render-Specific Issues
- **Memory limits**: Free tier has limitations; upgrade for better performance
- **Cold starts**: First request after inactivity may be slow
- **File uploads**: Ensure uploads directory exists (handled automatically)

### Performance Tips
- Use MongoDB Atlas for better performance than local MongoDB
- Enable caching for static assets
- Monitor usage and upgrade Render plan as needed

## 📂 Project Structure
```text
├── client/                 # React Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── context/        # State & Theme management
│   │   ├── pages/          # Page components (Home, Shop, Admin)
│   │   └── api/            # Axios configurations
└── server/                 # Express Backend API
    ├── models/             # Mongoose schemas
    ├── routes/             # API endpoints
    ├── controllers/        # Business logic
    └── middleware/         # Auth & Error handling
```

## 📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ for Niket Raj.*
