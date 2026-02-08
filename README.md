 

COFFEE SHOP WEB APPLICATION 

 

Final Project Report 

 

Astana IT University (AITU) 

Faculty of Information Technologies 

 

Course: Advanced DataBases (NoSQL) 

 

Project Type: Full-Stack Web Application 

 

Team Members: 

Zayniddin Tursunaliev 

Adilbek Zhetpyspayev 

 

Group: SE-2406 

 

 

 

 

 

 

 

 

 

1. Introduction 

This report describes the development and implementation of a full-stack web application called Coffee Shop. 
The goal of the project is to demonstrate practical skills in backend development, database design using MongoDB, REST API creation, and frontend integration. 

The report follows the chronological flow of the system, supported by screenshots that visually demonstrate each stage of the application. 

System Architecture 

Browser (Frontend) 

   ↓ HTTP (fetch) 

Express REST API (Backend) 

   ↓ 

MongoDB Atlas (Database) 

Architecture Layers 

Frontend: HTML + CSS + JavaScript (served by backend) 

Backend: Express REST API 

Database: MongoDB with Mongoose ODM 

Security: JWT-based authentication & authorization 

 

 

Database Design (MongoDB) 

Collections Used 

users 

products 

orders 

  

 

  

Authentication & Authorization 

Implemented Features 

User Registration 

User Login 

JWT token generation 

Token stored in localStorage 

Protected routes 

Logout (clears token) 

Security Rules 

Only authenticated users can: 

Place orders 

View their orders 

Each user sees only their own orders 

 

 

 

REST API Endpoints 

  

Authentication 

Method 

Endpoint 

Description 

POST 

/api/auth/register 

Register new user 

POST 

/api/auth/login 

Login user 

Products 

Method 

Endpoint 

Description 

GET 

/api/products 

Get all coffee products 

POST 

/api/products 

Create product (admin-ready) 

PUT 

/api/products/:id 

Update product 

DELEE 

/api/products/:id 

Delete product 

Orders 

Method 

Endpoint 

Description 

POST 

/api/orders 

Create order 

GET 

/api/orders/my 

Get logged-in user's orders 

DELETE 

/api/orders/:id 

Delete an order 

 

 

 

2. System Entry Point (Home Page) 

Figure 1. Home Page of the Application 

 

Description: 
The home page is the main entry point of the Coffee Shop application. It provides navigation links to the menu, cart, orders, and authentication pages. 
This page introduces the system and allows users to start interacting with the application. 

 

3. User Registration Process 

Figure 2. User Registration Page 

 

Description: 
This page allows new users to create an account by providing a username, email, and password. 
Passwords are securely hashed on the backend using bcrypt before being stored in the database. 
After successful registration, the user receives a JWT token and becomes authenticated. 

 

4. User Authentication (Login) 

Figure 3. Login Page 

 

Description: 
The login page enables registered users to authenticate using their email and password. 
After successful login, the server generates a JWT token, which is stored on the client side and used to access protected routes such as orders and cart. 

 

5. Product Menu with Images 

Figure 4. Menu Page with Product Cards 

 

Description: 
This screenshot demonstrates the menu page where all available products are displayed. 
Each product card contains an image, name, price, and an “Add to cart” button. 
Product data is fetched dynamically from the backend database and rendered on the frontend. 

Images are handled using static file hosting, and fallback images are used to prevent broken UI elements. 

 

6. Shopping Cart Functionality 

Figure 5. Shopping Cart Page 

 

Description: 
The shopping cart page displays products selected by the user. 
Users can increase or decrease the quantity of items or remove products entirely. 
The cart state is managed on the client side using localStorage, and the total price is calculated dynamically. 

 

7. Order Placement 

Figure 6. Order Creation Process 

 

Description: 
When the user places an order, the frontend sends the selected product IDs and quantities to the backend API. 
The server validates the data, calculates the total price, and creates a new order in the database. 

The total order price is calculated server-side to ensure data integrity. 

 

8. Order History 

Figure 7. User Orders Page 

 

Description: 
This page displays the user’s order history. 
 

Each order includes a unique order ID, order status, list of purchased items, and total price. 

Only authenticated users can access their own orders. 

 

 

9. Backend Architecture 

The backend is implemented using Node.js and Express.js and follows a modular structure: 

Models define database schemas 

Controllers handle business logic 

Routes expose RESTful API endpoints 

Middleware ensures authentication, validation, and error handling 

MongoDB is used as the database, with Mongoose providing schema validation and indexing. 

 

10. Database Design 

The application uses three main collections: 

Users – stores authentication data 

Products – stores product information and images 

Orders – stores order history with embedded order items 

Embedded documents and references are used appropriately to balance performance and data consistency. 

Advanced MongoDB Operations (Aggregation Framework) 

The project requires a multi-stage aggregation pipeline. You can add this example to your Database Design section: 

Sales Statistics Pipeline 

const stats = await Order.aggregate([ 

  { $match: { status: "completed" } }, // Filter only successful orders 

  { $unwind: "$items" },               // Flatten the items array 

  { $group: {  

      _id: "$items.productId",  

      totalSold: { $sum: "$items.quantity" }, 

      revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } 

    }  

  }, 

  { $sort: { revenue: -1 } }           // Sort by highest revenue 

]); 

Indexing and Optimization 

Compound Index: { email: 1, status: 1 } – Optimized for fetching specific orders for a logged-in user. 

Unique Index: { email: 1 } – Applied to the Users collection to ensure data integrity and fast authentication lookups. 

Advanced Update/Delete Operators 

$inc: Used to increment/decrement product quantities in the cart. 

$push / $pull: Used to add or remove items from the user's shopping cart array. 

$set: Used for updating user profile information. 

 

11. Team Responsibilities 

Zayniddin Tursunaliev 

Backend development and architecture 

MongoDB schema design 

Order logic and data validation 

Authentication and JWT handling 

Database seeding and data integrity 

Adilbek Zhetpyspayev 

Frontend development 

User interface and styling 

Cart and order visualization 

Frontend–backend integration 

User experience improvements 

 

14. Conclusion 

The Coffee Shop web application demonstrates a complete full-stack development cycle. 
The system is functional, secure, and user-friendly, with clear separation between frontend and backend components. 

The chronological presentation supported by screenshots confirms the correctness and completeness of the implementation. 

 

 
