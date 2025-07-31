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
Built With
•	Node.js
•	Express
•	MongoDB Atlas
•	Mongoose
•	bcryptjs
•	jsonwebtoken
•	dotenv

 Image Uploads
Uploaded images are stored in the /images folder. You can serve them statically via Express like this:
app.use('/images', express.static('images'));
![4k-smart-tv](https://github.com/user-attachments/assets/9fbb8351-e825-48d5-8ecb-c7e6e6f7686e) 
![bluetooth-speaker](https://github.com/user-attachments/assets/a50831d9-5c31-4b35-b00f-dcfc953a0a68)
![coffee-maker](https://github.com/user-attachments/assets/30a517ea-3545-47db-b5f2-2bb766682850)
![digital-camera](https://github.com/user-attachments/assets/dc65a6f3-8053-445d-8a12-b51eb62f8daa) 
![external-hard-drive](https://github.com/user-attachments/assets/a8e3b1ef-cbfb-40ce-a5b8-c0ff2e8d140c) 
![fitness-tracker](https://github.com/user-attachments/assets/369eccca-6f7a-4983-998d-e825e0ee51dc) 
![gaming-console](https://github.com/user-attachments/assets/3675c644-c441-4637-9ed6-db935127ac78)
![laptop-ultra](https://github.com/user-attachments/assets/5ab46bad-e593-4f70-8f3c-087f7ae2cda9)
![robot-vacuum](https://github.com/user-attachments/assets/f840a96e-db01-4890-9a78-a4739e1b2675)
![smartphone-pro](https://github.com/user-attachments/assets/2d650961-e47b-4533-8f82-30348079fa86)
![smartwatch-x](https://github.com/user-attachments/assets/06036db9-f672-4d04-ba54-5218f71be395)
![wireless-earbuds](https://github.com/user-attachments/assets/c36cf006-876b-495b-9eca-b28296571f9a)
![wireless-earbuds](https://github.com/user-attachments/assets/0cff1590-61b8-4000-abca-5459f7ab5d1c)



Troubleshooting
MongoDB Connection Error?
•	Ensure your IP is whitelisted in MongoDB Atlas.
•	Double-check your MONGO_URI is valid.
•	Use encoded special characters in your MongoDB password.
________________________________________
Future Improvements
•	Admin & User roles
•	Payment integration
•	Product reviews & ratings
•	Search and filter functionality
________________________________________
License
This project is licensed under the MIT License.
