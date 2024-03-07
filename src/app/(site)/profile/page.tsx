import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

async function ProfilePage() {
  const session = await getServerSession(authOptions)

  const user = session?.user
  //   if (!session || !session.user) redirect("/auth/sign-in");

  return (
    <div className="flex h-screen flex-col items-center  justify-center space-y-8  bg-slate-800  ">
      <h1>Profile</h1>
      <Image
        src={'/profile.jpg'}
        width={300}
        height={300}
        alt={user?.firstName ?? ''}
        priority
        className="rounded-full"
      />
      <div className="grid grid-cols-6 justify-start gap-y-4 space-x-2">
        <p className="col-span-2 pl-2">First Name: </p>{' '}
        <p className="col-span-4">{user?.firstName}</p>
        <p className="col-span-2">Last Name: </p>{' '}
        <p className="col-span-4">{user?.lastName}</p>
        <p className="col-span-2">Website: </p>{' '}
        <p className="col-span-4">{user?.website}</p>
        <p className="col-span-2">Email: </p>{' '}
        <p className="col-span-4">{user?.email}</p>
      </div>
    </div>
  )
}

export default ProfilePage
