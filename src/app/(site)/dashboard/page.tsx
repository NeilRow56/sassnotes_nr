import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Edit, File, Trash } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TrashDelete } from '@/components/dashboard/SubmitButtons'
import { revalidatePath } from 'next/cache'

export const revalidate = 0

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: {
        select: {
          title: true,
          id: true,
          description: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  return data
}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  const user = session?.user

  const data = await getData(user?.id as string)

  async function deleteNote(formData: FormData) {
    'use server'

    const noteId = formData.get('noteId') as string

    await db.note.delete({
      where: {
        id: noteId,
      },
    })

    revalidatePath('/dasboard')
  }
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create a new Note</Link>
        </Button>
      </div>

      {data?.Notes.length == 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="h-10 w-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any notes created
          </h2>
          <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-6 text-muted-foreground">
            You currently dont have any notes. please create some so that you
            can see them right here.
          </p>

          <Button asChild>
            <Link href="/dashboard/new">Create a new Note</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data?.Notes.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  {item.title}
                </h2>
                <p>
                  {new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'full',
                  }).format(new Date(item.createdAt))}
                </p>
              </div>

              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${item.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={item.id} />
                  <TrashDelete />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
