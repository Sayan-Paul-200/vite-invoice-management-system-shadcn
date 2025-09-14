import { GalleryVerticalEnd, AudioWaveform, Command, LayoutDashboard, ReceiptText } from "lucide-react";

export const data = {
  user: {
    name: "Sayan Paul",
    email: "sayanpaul666.ap@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Invoices",
      url: "/invoices",
      icon: ReceiptText,
    },
  ],
}