
# Gemini Chat App

A modern chat application with phone-based authentication, real-time messaging, and AI-powered features.








## 🚀 Setup & Run

1. **Install dependencies**:
    ```bash
    npm install
    ```
2. **Start development server:**:
    ```bash
    npm run dev
    ```
3. Open in browser:
    ```bash
    http://localhost:5173
    ```


 ## 📁 Folder Structure

 ``` 
     📁src
        └── 📁components
            └── 📁auth                      # All authentication components
                ├── CountryCodeSearch.jsx
                ├── OtpForm.jsx
                ├── PhoneForm.jsx
                ├── RegisterForm.jsx
            └── 📁chat                      # Chat components
                ├── ChatContainer.jsx
                ├── ChatHeader.jsx
                ├── ChatInput.jsx
                ├── ChatRoomList.jsx
                ├── Message.jsx
                ├── WelcomeScreen.jsx
            └── 📁layout
                ├── DashboardLayout.jsx
                ├── Header.jsx
                ├── Sidebar.jsx
        └── 📁hooks                         # Reusable hooks
            ├── useAuth.js
            ├── useDebounce.js
            ├── useTheme.js
        └── 📁pages
            ├── AuthPage.jsx
            ├── HomePage.jsx
        └── 📁schemas
            ├── authSchemas.js
        └── 📁services                      # Auth logic
            ├── authService.js
        └── 📁stores                        # State management
            ├── authStore.js
            ├── chatStore.js
        ├── App.jsx
        ├── index.css
        ├── main.jsx 
 ```






## Key Features


1. **🔐 Form Validation**
    
    Uses react-hook-form + zod for validation
    
    Example (phone number validation):

    ```
    phoneSchema = z.string().length(10, "Must be 10 digits")
    ```

2. **⏳ Throttling (Rate Limiting)**
Used in search inputs with useDebounce hook:

    ```
    const searchTerm = useDebounce(input, 500); // Waits 500ms
    ```
3. **📜 Pagination**
Chat messages load in pages:

    ```
    const loadMore = () => {
    setPage(prev => prev + 1);
    }
    ```

4. **♾️ Infinite Scroll**
Detects when user scrolls to bottom:
    ```
    <div 
    onScroll={handleScroll}
    ref={containerRef}
    >
    {messages.map(msg => (...))}
    </div>
    ```

5. Light/dark mode toggle



## Screenshots

<img width="1150" height="696" alt="Screenshot 2025-07-17 at 3 07 24 PM" src="https://github.com/user-attachments/assets/dc020f1e-8e53-48a2-b1d3-d47f79b21516" />
<img width="1223" height="686" alt="Screenshot 2025-07-17 at 3 07 08 PM" src="https://github.com/user-attachments/assets/0ef26feb-3051-442e-8c8b-0ca6543ed792" />
<img width="563" height="718" alt="Screenshot 2025-07-17 at 3 06 23 PM" src="https://github.com/user-attachments/assets/97af9314-ed53-42f0-8764-d17ae071ec74" />
<img width="605" height="724" alt="Screenshot 2025-07-17 at 3 06 05 PM" src="https://github.com/user-attachments/assets/46153fcb-2e9a-4130-bced-f1ff90fc70cc" />
<img width="425" height="683" alt="Screenshot 2025-07-17 at 3 05 26 PM" src="https://github.com/user-attachments/assets/e9b150f5-4a49-4902-b3ea-c0430f521df9" />
<img width="460" height="705" alt="Screenshot 2025-07-17 at 3 04 56 PM" src="https://github.com/user-attachments/assets/d102a415-a4c6-4acc-80b0-0e5ffdfd2629" />
<img width="375" height="683" alt="Screenshot 2025-07-17 at 3 04 26 PM" src="https://github.com/user-attachments/assets/9b8d15f9-57d6-4f30-91cc-a452a535979d" />


