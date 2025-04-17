# 📚 Bestseller Backend API

This is the backend server for the Bestseller application. It provides RESTful APIs for books and categories management, cart, wishlist crud operations, user address management, order management.

## 🚀 Features

- 📚 **Book and Categories Data**: Fetch books and categories data, add and delete them
- ⭐ **Wishlist CRUD**: Add, Remove books in Wishlist
- 🛒 **Cart CRUD**: Add, update and remove books in Cart
- 🔒 **User Address Management**: Manage multiple addresses for user
- 📦 **Order Management**: Manage user orders
- 🌐 **RESTful APIs**: Standardized, scalable routes for frontend integration.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose

## 📂 API Routes

### 🎭 Categories Routes

`/categories`

- `GET /` – Get all categories
- `POST /` – Create a new categories
- `GET /:categoryId` – Get category by Id.

### 📚 Books Routes

`/books`

- `GET /` – Get books data
- `POST /`- Add Book
- `GET /:bookId` - Get Book by Id

### ⭐ Wishlist Routes

`/wishlist`

- `GET /` - Get wishlist data.
- `POST /` - Add book to wishlist
- `DELETE /:bookId` - Delete book from Wishlist

### 🛒 Cart Routes

`/cart`

- `GET /` - Get cart data
- `POST /` -  Add book to cart
- `PUT /:bookId` - Update book cart
- `DELETE /:bookId` - Remove book from cart
- `DELETE /cart/clear` - Clear Cart Data

### 👤 User Routes

`/user/address`

- `GET /` - Get user addresses
- `POST /` - Add a new user address
- `PUT /:addressId` - Update user address
- `DELETE /:addressId` -  Remove user address

### 📦 Order Routes

`/orders`

- `GET /` - Get orders
- `POST /` - Save order
- `POST /:orderId` - Update order
- `DELETE /:orderId` - Delete Order
