# 🚀 BlinkFlow AI – Frontend

This is the frontend of **BlinkFlow AI**, a simple and interactive web app where users can enter a prompt and instantly see the AI-generated response.

Built using modern React tools and libraries, the app focuses on a clean UI and smooth user interaction.

---

## ✨ Features

* 🔹 Interactive flow-based UI using **React Flow**
* 🔹 Global state management with **Zustand**
* 🔹 Toast notifications using **React Toastify**
* 🔹 Simple and minimal design
* 🔹 Real-time prompt → response flow

---

## 🧠 How It Works

* The app contains **2 nodes**:

  * **Input Node** → User enters their prompt
  * **Result Node** → Displays the AI response

* A **Run button** triggers the process:

  1. User types a prompt in the Input Node
  2. Clicks the Run button
  3. Request is sent to the backend API
  4. Response is displayed in the Result Node

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rahulsr-ai/BlinkFlow-frontend.git
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```env
VITE_API_URL="http://localhost:8080"
```

👉 Replace the URL with your backend server URL if different.

---

### 4. Setup Backend

You can clone the backend from this repository:

```bash
git clone https://github.com/rahulsr-ai/BlinkFlow-backend.git
```

Then follow backend setup instructions and make sure it is running.

---

### 5. Run the Frontend

```bash
npm run dev
```

---

## 🌐 Usage

1. Open the app in your browser
2. Enter your prompt in the **Input Node**
3. Click the **button**
4. View the response in the **Result Node**

---

## 🛠️ Tech Stack

* React (Vite)
* React Flow
* Zustand
* React Toastify
* Tailwind CSS

---

## 📌 Notes

* Make sure the backend server is running before using the app
* Ensure `VITE_API_URL` is correctly set
* If the API fails, a toast notification will show the error

---

## 💡 Future Improvements


* Drag & connect custom flows
* Better UI/UX enhancements

---

## 👨‍💻 Author

Developed by Rahul
Feel free to explore, modify, and improve 🚀

---
