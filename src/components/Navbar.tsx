import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { ThemeToggle } from './ThemeToggle'
import SigninButton from './auth/SigninButton'

export async function Navbar() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  var myDate = new Date()
  var hrs = myDate.getHours()

  var greet

  if (hrs < 12) greet = 'Good Morning'
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon'
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening'

  return (
    <nav className=" flex h-[10vh] items-center border-b bg-slate-200 dark:bg-slate-700">
      <div className="container mx-auto  flex items-center justify-between">
        <Link href="/" className="">
          <h1 className="text-3xl font-bold">
            WpFile<span className="text-primary">Notes</span>
          </h1>
        </Link>

        <div className="flex-1 pl-40 text-center">
          <p className="text-sm text-muted-foreground "> {greet}</p>
        </div>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            <SigninButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
