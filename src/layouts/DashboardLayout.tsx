import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar2"
import { Outlet, useLocation } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { data } from "@/constants"

export default function DashboardLayout() {

  const location = useLocation()
  const pageName = data.projects.find(
                        (page) => page.url === location.pathname)
                        ?.name || location.pathname;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="size-9" variant='outline' />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-6"
              />
              <h1 className="text-xl font-medium">{pageName}</h1>
            </div>
          <ModeToggle />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}