
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

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

