# Yadav Automobile - Setup & Run Guide

## 🚀 Quick Start

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows - MongoDB should be running as a service
# Or start manually if needed
```

### 2. Populate Database with Sample Cars
```bash
cd server
node seeder.js
```
This will add:
- 2 users (admin@gmail.com / admin123, niket@gmail.com / niket123)
- 10 premium cars (Audi, Mercedes, BMW, Range Rover, Porsche, Volvo, Jaguar, Lexus, Maserati, Tesla)

### 3. Start Backend Server
```bash
cd server
npm run dev
```
Server runs on: http://localhost:5000

### 4. Start Frontend
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

## 📝 Test Accounts

**Admin Account:**
- Email: admin@gmail.com
- Password: admin123

**Regular User:**
- Email: niket@gmail.com
- Password: niket123

## ✨ Features Implemented

### Public Features:
- ✅ Home page with featured cars
- ✅ Car listing with filters
- ✅ Car details page
- ✅ About page
- ✅ Contact page with form
- ✅ Dark/Light mode toggle
- ✅ Responsive design

### User Features (Login Required):
- ✅ Buy car with checkout
- ✅ Book test drive
- ✅ Sell car request
- ✅ Fake payment gateway (Card, UPI, Net Banking)

### Admin Features:
- ✅ Dashboard with stats
- ✅ Add new cars
- ✅ Manage cars (view, delete)
- ✅ Manage sell requests (approve/reject)
- ✅ View all users

## 🎨 Theme Toggle
Click the sun/moon icon in the navbar to switch between dark and light modes.

## 🔧 Troubleshooting

### 500 Error on Home Page:
1. Make sure MongoDB is running
2. Make sure backend server is running (`npm run dev` in server folder)
3. Run seeder to populate database: `node seeder.js`

### Dark Mode Not Working:
- Clear browser cache
- Check that ThemeContext is properly imported
- Verify Tailwind config has `darkMode: 'class'`

### No Cars Showing:
- Run the seeder: `node seeder.js` in server folder
- Check backend is running on port 5000
- Check browser console for API errors

## 📦 Database Schema

**Users:**
- name, email, password (hashed), isAdmin

**Cars:**
- name, brand, price, year, fuelType, transmission, mileage, description, images[], status

**SellRequests:**
- user (ref), carDetails, status (Pending/Approved/Rejected)

## 🌐 API Endpoints

### Auth:
- POST /api/auth/login
- POST /api/auth/register

### Cars:
- GET /api/cars (with filters)
- GET /api/cars/:id
- POST /api/cars (admin)
- PUT /api/cars/:id (admin)
- DELETE /api/cars/:id (admin)

### Admin:
- GET /api/admin/dashboard-stats
- GET /api/admin/users
- GET /api/admin/sell-requests
- PUT /api/admin/sell-requests/:id

### Upload:
- POST /api/upload (single image)
- POST /api/upload/multiple (multiple images)

## 🎯 Next Steps

1. Test all features
2. Add more cars via Admin Dashboard
3. Customize branding/colors if needed
4. Deploy to production when ready

Enjoy your Yadav  Automobile platform! 🚗✨
