import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import ComingSoon from "./pages/public/ComingSoon"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
        {/* <ComingSoon /> */}
        {/* <Login /> */}
        <Register />
      </div>
    </ThemeProvider>
  )
}

export default App
