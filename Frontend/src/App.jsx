import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="mesh-bg"><div className="orb3" /></div>
        <RouterProvider router={router}/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
