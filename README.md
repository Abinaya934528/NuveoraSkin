# NuveoraSkin - Premium AI-Powered Skincare E-Commerce Platform

NuveoraSkin is a luxury, modern e-commerce platform focused on personalized skincare. This project combines aesthetic excellence with robust functional requirements including multi-step checkout, user authentication, and AI skin analysis.

## Features

- **Premium UI/UX:** Built with a custom design system focusing on luxury skincare aesthetics.
- **Dynamic Homepage:** Features Hero section, trust propositions, curated products, concern-based shopping, and routine builders.
- **E-Commerce Functionality:** Full cart and checkout flows.
- **AI Skin Analysis:** A dedicated module for personalized skincare guidance.
- **RESTful Backend API:** Express.js backed system to manage authentication, products, orders, and user data.
- **Admin Dashboard:** Tools to manage products, users, and orders (in progress).

## Tech Stack

- **Frontend:** HTML5, Vanilla JavaScript, CSS3 (Custom Variables)
- **Backend:** Node.js, Express.js
- **Database:** MySQL2
- **Authentication:** JWT, bcryptjs
- **Security:** Helmet, CORS, Express Rate Limit

## Folder Structure

```
/
├── frontend/           # HTML frontend pages
├── backend/            # Express.js backend API
│   ├── config/         # Database and server config
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   └── routes/         # Express routes
├── database/           # Schema and migrations
├── images/             # Product and UI assets
├── index.html          # Main landing page
├── styles.css          # Global Design System
└── script.js           # Global frontend logic
```

## Installation & Setup

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=your_mysql_connection_string
   AUTH_SECRET=your_jwt_secret
   ```

4. **Database Setup:**
   Run the SQL scripts located in `database/schema.sql` to initialize the database tables.

5. **Running the Application:**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

- `GET /api/products` - Retrieve all products
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user
- `POST /api/orders` - Create an order

## Development

To continue development:
1. Validate the UI against the design principles (Feminine-neutral, soft organic shapes, modern typography).
2. Expand the `frontend/products.html` and `frontend/checkout.html` functionalities.
3. Hook up frontend API calls in `script.js` to match the backend Express routes.

## Troubleshooting

- **CORS Errors:** Ensure the backend `server.js` CORS configuration matches the frontend origin.
- **Database Connection:** Verify your MySQL server is running and the `.env` credentials are correct.
