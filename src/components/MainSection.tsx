import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface MainSectionProps extends HTMLAttributes<"main"> {
      children: React.ReactNode
}

const MainSection = ({children, className} : MainSectionProps) => {
   return (
   <main className={cn("mb-5", className)}>
      {children}
   </main>
   )
}

export default MainSection
