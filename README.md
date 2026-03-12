# Product Management Mini App

This is a full MERN stack web application with a React frontend configured using Vite, and a Node.js Express backend communicating with a MongoDB database.

## Folder Structure

```
product_management/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   └── productController.js # API Logic 
│   ├── models/
│   │   └── Product.js       # Mongoose Schema
│   ├── routes/
│   │   └── productRoutes.js # Express routes
│   ├── server.js            # Express Entry point
│   └── package.json         # Backend dependencies
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js     # Axios instance configured to the backend
    │   ├── pages/
    │   │   ├── AddProduct.jsx  # Page to create a product
    │   │   ├── EditProduct.jsx # Page to update an existing product
    │   │   └── ProductList.jsx # Dashboard to view and search all products
    │   ├── App.jsx          # React Router setup
    │   ├── index.css        # Tailwind CSS entry
    │   └── main.jsx         # React DOM rendering
    ├── tailwind.config.js   # Tailwind Configuration
    └── package.json         # Frontend dependencies
```

## Instructions to Run

### Prerequisites
Make sure you have Node.js and MongoDB installed on your system.
1. Start your local MongoDB server (listening on default port 27017).

### Start the Backend
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000`*.

### Start the Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   *The application will open in your browser, typically at `http://localhost:5173`*.

## Features Included
- **CRUD Operations:** Create, Read, Update, Delete Products.
- **Search UI:** Quick filtering by product name or category in Frontend.
- **Responsive Layout:** Designed with full responsive Tailwind CSS styling.
