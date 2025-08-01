# Patient Management System

A full-stack application  with langchain and blockchain implement system to manage patient records, appointments, and healthcare data.

---

## Project Structure

- **Frontend**: React-based user interface  
- **Backend**: Node.js/Express API server
- **contract**: Etherium Blockchain(solidity)

---

## Prerequisites

- Node.js (v14 or higher recommended)  
- npm (comes bundled with Node.js)  
- A running database (MongoDB) configured in backend `.env`  
- Browser extention for Metamask for blockchain transactions
---

## Setup Instructions

1. clone the repository
   ```
   git clone https://github.com/induwrawithanage/Patient_Management_System.git
   ```

### Frontend Initialization

1. Open your terminal and navigate to the frontend folder:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
2. Open your terminal and navigate to the backend folder:
   ```bash
    cd Backend
    npm install
    npm run dev

3. set the .env file in the backend
   ``` bash
   MONGODB_URI='your mongouri'
   PORT='your port number'
   JWT_SECRET='your secret'
   JWT_REFRESH_SECRET='your refresh number'
   Emailpassword="email secret"
   Email="idelaize email or like that"
   GOOGLE_API_KEY="google api key"
    ```

  
