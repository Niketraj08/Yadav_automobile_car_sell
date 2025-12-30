# 🚀 Render Deployment Guide - Separate Frontend & Backend

This guide provides step-by-step instructions for deploying the Client Car Services application to Render with separate frontend and backend services.

## 📋 Prerequisites

1. GitHub/GitLab account with your code pushed
2. MongoDB Atlas account (free tier available)
3. Render account (free tier available)

## 🔧 Step-by-Step Deployment

### Part 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create an account
2. Create a new cluster (Free tier M0 is sufficient)
3. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
4. Whitelist IP addresses:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/your-database-name`

### Part 2: Deploy Backend Service

1. **Create New Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub/GitLab repository
   - Select the repository and branch

2. **Configure Backend Settings**:
   ```
   Name: yadav-automobile-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main (or your default branch)
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free (or choose paid for better performance)
   ```

3. **Add Backend Environment Variables**:
   Go to "Environment" tab and add:
   ```env
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
   JWT_SECRET=27b8ec68381c8039d39f576809964813e2d75677d032f9e50315d2bfc0286685f4a861554e10b53c374954ff43d5a84edce7dbf6fcd738050353fd2a96929641
   PORT=10000
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```
   
   **Important Notes**:
   - Replace `MONGO_URI` with your actual MongoDB Atlas connection string
   - Replace `FRONTEND_URL` with your frontend URL (you'll update this after frontend deployment)
   - `JWT_SECRET` is provided - keep it secure!

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://your-backend-app.onrender.com`

### Part 3: Deploy Frontend Service

1. **Create New Static Site** (Recommended):
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect the same GitHub/GitLab repository
   - Select the repository and branch

2. **Configure Frontend Settings**:
   ```
   Name: yadav-automobile-frontend
   Environment: Static Site
   Region: Choose closest to your users
   Branch: main (or your default branch)
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   Plan: Free
   ```

3. **Add Frontend Environment Variables**:
   Go to "Environment" tab and add:
   ```env
   VITE_API_URL=https://your-backend-app.onrender.com
   ```
   
   **Important**: Replace `your-backend-app` with your actual backend service URL from Part 2.

4. **Deploy**:
   - Click "Create Static Site"
   - Wait for deployment (5-10 minutes)
   - Note your frontend URL: `https://your-frontend-app.onrender.com`

### Part 4: Update Backend CORS

1. Go back to your **Backend Service** in Render
2. Navigate to **Environment** tab
3. Update `FRONTEND_URL`:
   ```env
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```
   (Replace with your actual frontend URL)
4. Click "Save Changes" - Render will automatically redeploy

### Part 5: Seed Production Database

1. Go to your **Backend Service** → "Shell" tab
2. Run the seeder:
   ```bash
   node seeder.js
   ```
3. This creates:
   - Admin account: `admin@gmail.com` / `admin123`
   - User account: `niket@gmail.com` / `niket123`
   - 10 sample car listings

## ✅ Verification

1. **Test Backend API**:
   - Visit: `https://your-backend-app.onrender.com`
   - Should show: "Yadav Automobile API is running"

2. **Test Frontend**:
   - Visit: `https://your-frontend-app.onrender.com`
   - Should load the application homepage

3. **Test Login**:
   - Go to: `https://your-frontend-app.onrender.com/login`
   - Login with: `admin@gmail.com` / `admin123`

## 🔐 Environment Variables Reference

### Backend Environment Variables (Render)
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
JWT_SECRET=27b8ec68381c8039d39f576809964813e2d75677d032f9e50315d2bfc0286685f4a861554e10b53c374954ff43d5a84edce7dbf6fcd738050353fd2a96929641
PORT=10000
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### Frontend Environment Variables (Render)
```env
VITE_API_URL=https://your-backend-app.onrender.com
```

### Local Development Environment Variables

**Server (`server/.env`):**
```env
MONGO_URI=mongodb://127.0.0.1:27017/yadav-automobile
JWT_SECRET=your-super-secure-jwt-secret-here-make-it-long-and-random
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000
```

## 🛠️ Troubleshooting

### Backend Issues

**Problem**: Backend fails to start
- **Solution**: Check environment variables are set correctly
- **Solution**: Verify MongoDB Atlas connection string format
- **Solution**: Check Render logs for specific error messages

**Problem**: CORS errors
- **Solution**: Verify `FRONTEND_URL` matches your frontend URL exactly
- **Solution**: Ensure no trailing slashes in URLs

**Problem**: Database connection fails
- **Solution**: Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- **Solution**: Check database user credentials
- **Solution**: Verify connection string format

### Frontend Issues

**Problem**: Frontend can't connect to backend
- **Solution**: Verify `VITE_API_URL` is set correctly
- **Solution**: Check backend is deployed and running
- **Solution**: Verify CORS is configured on backend

**Problem**: Build fails
- **Solution**: Check all dependencies are in package.json
- **Solution**: Review build logs for specific errors
- **Solution**: Ensure Node version is compatible

### General Issues

**Problem**: Cold starts are slow
- **Solution**: This is normal on free tier (first request after inactivity)
- **Solution**: Upgrade to paid plan for better performance

**Problem**: Service goes to sleep
- **Solution**: Free tier services sleep after 15 minutes of inactivity
- **Solution**: Upgrade to paid plan for always-on services

## 📊 Service URLs

After deployment, you'll have:
- **Frontend**: `https://your-frontend-app.onrender.com`
- **Backend API**: `https://your-backend-app.onrender.com`
- **Admin Dashboard**: `https://your-frontend-app.onrender.com/admin/login`

## 🔄 Updating Your Deployment

1. **Push changes to GitHub/GitLab**
2. Render automatically detects changes and redeploys
3. Monitor deployment logs in Render dashboard

## 💡 Tips

1. **Use Environment Variables**: Never hardcode secrets
2. **Monitor Logs**: Check Render logs for debugging
3. **Test Locally First**: Always test changes locally before deploying
4. **Backup Database**: Regularly backup your MongoDB Atlas database
5. **Use Custom Domains**: Render allows custom domains on paid plans

## 📞 Support

- Render Documentation: https://render.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Project Issues: Check GitHub issues or contact maintainer

