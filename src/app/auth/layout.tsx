import { Button } from '@/components/ui/button'
import { ArrowBigLeftIcon } from 'lucide-react'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-screen  flex-col items-center justify-center bg-slate-100 
          
          text-center  dark:bg-slate-800"
    >
      <div className="m-10 flex max-w-sm  items-center justify-center">
        <ArrowBigLeftIcon />
        <Button
          size="sm"
          variant="ghost"
          asChild
          className="text-muted-foreground"
        >
          <Link href="/">Home page</Link>
        </Button>
      </div>
      {children}
    </div>
  )
}

export default AuthLayout
