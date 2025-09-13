import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import { Route, Routes } from "react-router"
import ComingSoon from "./pages/public/ComingSoon"
import AuthLayout from "./layouts/AuthLayout"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import DashboardLayout from "./layouts/DashboardLayout"
import Dashboard from "./pages/dashboard/Dashboard"
import Invoices from "./pages/dashboard/Invoices"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <div className="flex min-h-svh flex-col items-center justify-center"> */}
          <Routes>

            <Route index element={<ComingSoon />} />

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route element={<DashboardLayout />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
            </Route>

          </Routes>
        {/* </div> */}
      </ThemeProvider>
    </>
  )
}

export default App
