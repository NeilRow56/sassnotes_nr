import { User2 } from 'lucide-react'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'

export const UserList = async () => {
  // const session = await getServerSession(authOptions)

  // const user = session?.user

  // const id = user?.id

  // if (!id) {
  //   throw new Error('Unauthorized')
  // }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  // const availableCount = await getAvailableCount()

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Your Users
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <Link
            key={user.id}
            href="/"
            className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <p className="relative font-semibold text-white">
              {user.firstName}
            </p>
          </Link>
        ))}
        <p className="text-sm">Create new board</p>
        <span className="text-xs"></span>
      </div>
    </div>
  )
}
