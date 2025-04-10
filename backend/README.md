# E-Commerce System Backend

This is the backend API for an e-commerce system built with Laravel. It provides APIs for product management, cart management, checkout, and order tracking.

## Features

- **Authentication**
  - User registration and login
  - Role-based authorization (Customer, Employee, Admin)
  - API token authentication using Laravel Sanctum

- **Product Management**
  - CRUD operations for products
  - Product search
  - Stock management
  - Product image upload

- **Cart Management**
  - Add items to cart
  - Update cart item quantities
  - Remove items from cart
  - Cart total calculation
  - Stock validation (cannot add out-of-stock items)

- **Order Processing**
  - Checkout process
  - Order history for customers
  - Order monitoring for employees
  - Filter orders by date and status

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   composer install
   ```
4. Create a copy of `.env.example` and rename it to `.env`:
   ```
   cp .env.example .env
   ```
5. Generate an application key:
   ```
   php artisan key:generate
   ```
6. Configure your database in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=ecommerce
   DB_USERNAME=root
   DB_PASSWORD=
   ```
7. Run migrations to create the database tables:
   ```
   php artisan migrate
   ```
8. Create a symbolic link for storage:
   ```
   php artisan storage:link
   ```
9. Start the development server:
   ```
   php artisan serve
   ```

## API Routes

### Public Routes
- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user
- `GET /api/products` - Get all products
- `GET /api/products/{product}` - Get a specific product
- `GET /api/products/search/{query?}` - Search products

### Protected Routes (Customer)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{cart}` - Update cart item
- `DELETE /api/cart/{cart}` - Remove item from cart
- `DELETE /api/cart` - Clear cart
- `POST /api/checkout` - Process checkout
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{order}` - Get a specific order

### Protected Routes (Employee/Admin)
- `POST /api/products` - Create a product
- `PUT /api/products/{product}` - Update a product
- `DELETE /api/products/{product}` - Delete a product
- `GET /api/orders/all` - Get all orders
- `GET /api/orders/all/{order}` - Get a specific order
- `GET /api/orders/filter` - Filter orders

## Data Models

- **User**: Manages user accounts and roles
- **Product**: Stores product information (name, description, price, stock, image)
- **Cart**: Manages shopping cart items
- **Order**: Stores order information
- **OrderItem**: Stores items within an order

## Validation Rules

- Products cannot be deleted if they are part of an existing order
- Items cannot be added to cart if stock is zero
- Cart quantity cannot exceed available stock

## Authentication

The API uses Laravel Sanctum for token-based authentication. All protected routes require a valid Bearer token in the Authorization header.
