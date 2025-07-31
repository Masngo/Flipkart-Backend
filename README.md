Flipkart Clone Backend
This is the backend service for the Flipkart Clone e-commerce application. It handles user authentication, product data (dummy for now), and shopping cart management.

Technologies Used
Node.js

Express.js: Web framework

MongoDB Atlas: Cloud NoSQL database

Mongoose: MongoDB object modeling for Node.js

bcryptjs: For password hashing

jsonwebtoken: For JWT-based authentication

dotenv: For managing environment variables

cors: For handling Cross-Origin Resource Sharing

Setup and Running Locally
Prerequisites
Node.js (v14 or higher recommended)

npm (Node Package Manager)

MongoDB Atlas Account (with a cluster set up and Network Access configured for your IP)

Installation
Clone this repository (if you're setting up from scratch, otherwise you already have it):

git clone https://github.com/Masngo/Flipkart-Backend.git
cd Flipkart-Backend

Install dependencies:

npm install

Environment Variables
Create a .env file in the root of this Flipkart-Backend directory with the following content:

MONGO_URI=mongodb+srv://mdewhe:YOUR_URI_ENCODED_PASSWORD@cluster0.gi6ucnb.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=YOUR_VERY_STRONG_RANDOM_SECRET_KEY_HERE
PORT=5000

Replace YOUR_URI_ENCODED_PASSWORD with your actual MongoDB Atlas user password (ensure it's URL-encoded if it contains special characters like @, #, ?).

Replace YOUR_VERY_STRONG_RANDOM_SECRET_KEY_HERE with a long, random string.

Running the Server
node server.js

The server will run on http://localhost:5000. You should see "MongoDB connected successfully!" in your console.

API Endpoints
POST /api/auth/signup: Register a new user.

POST /api/auth/signin: Log in a user and receive a JWT token.

GET /api/products: Get a list of all products (currently dummy data).

GET /api/cart: Get the authenticated user's cart. (Requires JWT in Authorization: Bearer <token> header)

POST /api/cart: Add an item to the cart or update its quantity. (Requires JWT)

PUT /api/cart/:productId: Update the quantity of a specific item in the cart. (Requires JWT)

DELETE /api/cart/:productId: Remove an item from the cart. (Requires JWT)