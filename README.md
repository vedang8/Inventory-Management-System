# 📦 Inventory Management System

A modern inventory management system built with Angular, TypeScript, RxJS, and a backend using NestJS, WebSockets, and JWT Authentication with Passport. This system allows users to manage products in real-time, with features such as product addition, updates, stock monitoring, and category filtering.

## 🚀 Features

- **User Registration & Login**: Users can register and authenticate using JWT tokens.
- **Dashboard**: The central hub where users can add, edit, and delete products in the inventory.
- **Real-Time Stock Updates**: Users get low stock updates in real-time via WebSockets when products are added or updated.
- **Product Management**: Add new products, edit existing products, and delete products from the inventory.
- **Low Stock Alerts**: Automatic real-time alerts when a product’s stock falls below a predefined threshold.
- **Product Filtering**: Filter products by category for better management.
- **Low Stock Product List**: View a list of products that are running low on stock.

## 🛠️ Tech Stack

### Frontend
- **Angular**: A platform for building web applications.
- **TypeScript**: Superset of JavaScript for type safety and better tooling.
- **RxJS**: Reactive programming library for handling asynchronous events and data streams.
- **WebSockets**: Real-time communication between client and server for instant updates on low stock.

### Backend
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **WebSockets (Socket.IO)**: Real-time bidirectional communication for updating the client with low stock notifications.
- **JWT Authentication**: JSON Web Tokens for secure authentication using Passport.
- **PassportJS**: Middleware for handling authentication in Node.js.
- **TypeORM**: ORM for interacting with the database (MySQL/PostgreSQL).
- **PostgreSQL**: Database used to store product and user data.

## ⚙️ Setup Instructions

### Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14.x or above)
- [Angular CLI](https://angular.io/cli) (installed globally using `npm install -g @angular/cli`)
- [NestJS CLI](https://docs.nestjs.com/): For easy project scaffolding
- [PostgreSQL](https://www.postgresql.org/download/): For the database

### Frontend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/inventory-management-system.git
   cd inventory-management-system/frontend
   
2. **Install the dependencies**:
   ```bash
   npm install

3. **Run the Angular Application**
   ```bash
   ng server

## Setup Instructions
 
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
 
### Backend Setup
 
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
 
2. Install dependencies:
   ```bash
   npm install
   ```
 
3. Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=inventoryManagement
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1h
   ```
 
4. Start the development server:
   ```bash
   npm run start:dev
   ```
 
5. The backend API will be available at http://localhost:8000

 
 ## API Documentation
 
The complete API documentation is available on Postman:
[Neo Learn API Documentation](https://documenter.getpostman.com/view/26606017/2sB2cRD4dV)
 
 
# 📽️ Inventory Management - Demo Video  
 
Watch the demo of the **Inventory Management**:  
🔗 **[Click here to watch the demo](https://drive.google.com/file/d/1jvWhiwdgzw9Gugj9MDzUbByLlRLe5mmT/view)**  

 
