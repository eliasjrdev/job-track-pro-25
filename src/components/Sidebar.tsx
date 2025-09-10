import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { 
  PlusIcon, 
  LayoutDashboardIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const { toast } = useToast()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Cadastrar Candidatura",
      href: "/candidatura",
      icon: PlusIcon,
    },
  ]

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
    // Navigate to login would be handled here
    window.location.href = "/"
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full bg-surface border-r border-border transition-all duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-72 lg:w-72'}
          lg:relative lg:translate-x-0 shadow-lg
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          {!isCollapsed && (
            <Logo size="md" showText={true} />
          )}
          {isCollapsed && (
            <div className="mx-auto">
              <Logo size="sm" showText={false} />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? <MenuIcon className="w-4 h-4" /> : <XIcon className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-primary-foreground' : ''}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                  {isCollapsed && (
                    <span className="absolute left-16 bg-foreground text-background px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.title}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10
              ${isCollapsed ? 'justify-center' : 'justify-start'}
            `}
          >
            <LogOutIcon className="w-5 h-5" />
            {!isCollapsed && <span>Sair</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile toggle button - fixed position */}
      <Button
        variant="surface"
        size="icon"
        onClick={() => setIsCollapsed(false)}
        className={`
          lg:hidden fixed top-4 left-4 z-30 shadow-lg
          ${!isCollapsed ? 'hidden' : 'flex'}
        `}
      >
        <MenuIcon className="w-4 h-4" />
      </Button>
    </>
  )
}