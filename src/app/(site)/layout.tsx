import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    return redirect('/')
  }

  return (
    <div className="mt-10 flex flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default SiteLayout
