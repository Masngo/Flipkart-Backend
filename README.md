# Flipkart-Backend

##  Flipkart Backend

This is the backend server for the **Flipkart Clone** project built with **Node.js**, **Express.js**, and **MongoDB Atlas**. It provides API endpoints for user authentication, product management, and more.

## Features

- User Registration & Login (JWT-based authentication)
- Product CRUD operations
- Secure password storage with bcrypt
- MongoDB Atlas integration
- .env configuration support

## Project Structure

Flipkart-Backend/
├── images/ # Uploaded product images
├── models/ # Mongoose schemas (User, Product)
├── routes/ # Express routes
├── controllers/ # Route logic handlers
├── middleware/ # Auth middleware
├── .env # Environment variables
├── server.js # Entry point
└── package.json

## Setup Instructions

### 1. Clone the Repository

bash
git clone https://github.com/Masngo/Flipkart-Backend.git
cd Flipkart-Backend
2. Install Dependencies
npm install
3. Create a .env File
Create a .env file in the root directory and add:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.gi6ucnb.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key

Note: Replace <username> and <password> with your real MongoDB Atlas credentials. URL-encode special characters like @ as %40.
4. Start the Server
node server.js
If successful, you’ll see:
Server running on port 5000
MongoDB connected
________________________________________
API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Login and get token
Product Routes
Method	Endpoint	Description
POST	/products	Add new product
GET	/products	List all products
GET	/products/:id	Get single product
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product
Protected routes require a valid JWT in the Authorization header.
________________________________________
Built With
•	Node.js
•	Express
•	MongoDB Atlas
•	Mongoose
•	bcryptjs
•	jsonwebtoken
•	dotenv
________________________________________
 Image Uploads
Uploaded images are stored in the /images folder. You can serve them statically via Express like this:
app.use('/images', express.static('images'));
Access URL:
http://localhost:5000/images/<filename>.jpeg
________________________________________
Troubleshooting
MongoDB Connection Error?
•	Ensure your IP is whitelisted in MongoDB Atlas.
•	Double-check your MONGO_URI is valid.
•	Use encoded special characters in your MongoDB password.
________________________________________
✅ Future Improvements
•	Admin & User roles
•	Payment integration
•	Product reviews & ratings
•	Search and filter functionality
________________________________________
License
This project is licensed under the MIT License.
