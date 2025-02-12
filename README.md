# 🛍️ Frontend Project for eCommerce

## 📖 Description

This project is the **frontend** for an **eCommerce platform**. The application is built using **React** and utilizes modern tools such as **Vite** for bundling, **Tailwind CSS** for styling, and **ESLint** for code quality. The platform allows users to manage different aspects of the online store, including adding products, categories, and interacting with the back-end via a GraphQL API.

The project is designed to be fast, scalable, and maintainable, leveraging modern web technologies to provide an optimal user experience.

## Technologies

This project is built with the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern build tool for fast development and optimized bundling.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **PostCSS**: A tool to process CSS with plugins like Tailwind and Autoprefixer.
- **ESLint**: A tool to ensure consistent coding style and prevent potential errors.
- **Prettier**: A code formatter that enforces consistent style across the codebase.
- **Apollo Client**: A client for interacting with a GraphQL API.

## 📦 Project Setup

To get started with this project on your local machine, follow the instructions below:

### 🔧 Prerequisites

- **Node.js** version 18 or higher
- **npm** (Node Package Manager)

### Installation

1. Clone the repository:
   
```bash
git clone: https://github.com/lxgonzalez/eternal-graphics-frontend
```
2. Install dependencies:

```bash
npm install
```
3. Run the development server:

```bash
npm run dev
```
The app will be available at http://localhost:3000

## 🔗 GraphQL Queries and Mutations

Here are some GraphQL examples used in this project to interact with Admins, Categories, and Products.

📂 Example Query for Categories:
Fetch the list of available categories:

```graphqñ
query {
  categories {
    id
    name
  }
}
```
🛍️ Example Mutation to Add a Product:
Add a new product to the database:
```bash
mutation {
  addProduct(input: { name: "New Product", price: 100.00 }) {
    id
    name
    price
  }
}
```
