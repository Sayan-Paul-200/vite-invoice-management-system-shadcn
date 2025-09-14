import {
  type LucideIcon,
} from "lucide-react"


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {

    const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                    asChild
                    tooltip={item.name}
                    className={
                        location.pathname === item.url
                        ? 'bg-secondary text-secondary-foreground transition-all hover:bg-secondary hover:text-secondary-foreground' // Active styles
                        : 'transition-all hover:bg-secondary/80 hover:text-secondary-foreground/80' // Inactive styles
                    }
                >
                <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
