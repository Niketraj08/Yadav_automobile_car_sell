# Client Car Services Panta

A full-stack web application for car services that allows users to browse, book, and purchase cars while providing administrators with comprehensive management tools.

## 🚗 Features

### For Users
- **Browse Cars**: View detailed listings of available cars with images and specifications
- **Car Details**: In-depth information about each vehicle including features and pricing
- **User Authentication**: Secure login and registration system
- **Booking System**: Easy car booking with integrated payment processing
- **Sell Your Car**: Submit sell requests for your vehicles
- **Contact Support**: Get in touch with the service team

### For Administrators
- **Admin Dashboard**: Comprehensive control panel for managing the platform
- **Car Management**: Add, edit, and remove car listings
- **User Management**: View and manage user accounts
- **Booking Management**: Track and manage all bookings
- **Sell Request Management**: Handle car sell requests from users

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Component library for consistent UI
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication 
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting and management
- **Razorpay** - Payment gateway integration
- **Multer** - File upload handling

## 📁 Project Structure

```
client-car-services-panta/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   │   └── Admin/      # Admin-specific pages
│   │   ├── context/        # React context providers
│   │   ├── api/            # API service functions
│   │   └── assets/         # Static assets
│   ├── public/             # Public static files
│   └── dist/               # Build output
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Database configuration
│   ├── uploads/            # File uploads directory
│   └── index.js            # Server entry point
└── package.json            # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client-car-services-panta
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   npm run build
   ```

3. **Environment Setup**

   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the development servers**
   ```bash
   # Start both client and server concurrently
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Terminal 1: Start the server
   npm run server

   # Terminal 2: Start the client
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📜 Available Scripts

### Root Level Scripts
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build the client and install server dependencies
- `npm run server` - Start only the server
- `npm run client` - Start only the client

### Client Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts
- `npm start` - Start production server
- `npm run dev` - Start with nodemon for development
- `npm run fix-images` - Fix broken car images
- `npm run update-pexels` - Update car images from Pexels API

## 🔐 Authentication

The application uses JWT (JSON Web Token) for authentication:
- User registration and login
- Protected routes for authenticated users
- Admin-specific routes with role-based access
- Token-based session management

## 💳 Payment Integration

Integrated with Razorpay for secure payment processing:
- Booking payments
- Secure checkout flow
- Payment verification and confirmation

## 🖼 Image Management

Uses Cloudinary for image hosting and optimization:
- Car listing images
- User profile pictures
- Automatic image resizing and optimization

## 📊 Database Models

- **User**: User accounts with authentication
- **Car**: Car listings with detailed specifications
- **Booking**: Car booking records
- **SellRequest**: User sell car requests

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Add new car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/admin` - Get all bookings (Admin)

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/sell-requests` - Get sell requests
- `POST /api/admin/cars` - Add car

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please contact @niketrajkvs@gmail.com and  development team or create an issue in the repository.

---


