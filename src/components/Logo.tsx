import { BriefcaseIcon } from "lucide-react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  }
  
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-light rounded-lg blur opacity-30"></div>
        <div className="relative bg-surface p-2 rounded-lg shadow-md">
          <BriefcaseIcon className={`${sizeClasses[size]} text-primary`} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-foreground tracking-tight`}>
            JobTracker
          </h1>
          <p className="text-xs text-muted-foreground">Dashboard de Candidaturas</p>
        </div>
      )}
    </div>
  )
}