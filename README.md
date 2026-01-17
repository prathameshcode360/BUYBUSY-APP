# 🛒 BuyBusy – E-Commerce React App

BuyBusy is a modern e-commerce web application built using **React**, **Firebase**, and **Context API**.  
It supports user authentication, product filtering, cart management, and order history with **real-time Firestore updates**.

---

## 🚀 Features

### 🔐 Authentication

- User Signup & Login using **Firebase Authentication**
- Protected routes for Cart and Orders
- Conditional Navbar rendering based on auth state

### 🛍️ Products

- View products without login
- Search products by name
- Filter by price range
- Filter by categories

### 🛒 Cart (User Specific)

- Add / remove products
- Increase / decrease quantity
- Real-time cart sync using Firestore
- Cart data is **user-specific**

### 📦 Orders

- Place order from cart
- Orders stored per user in Firestore
- Order history with itemized breakdown
- Real-time order updates

### 🎨 UI & UX

- Clean and modern UI
- Global styling with CSS variables
- Page-level CSS Modules
- Toast-style message notifications
- Proper 404 error page

---

## 🧠 Tech Stack

- **Frontend:** React (Hooks, Context API)
- **Routing:** react-router-dom
- **Backend / DB:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Styling:** CSS Modules + Global CSS
- **State Management:** Context API

---
