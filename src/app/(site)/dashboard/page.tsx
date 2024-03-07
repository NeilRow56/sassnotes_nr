import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { File } from 'lucide-react'

const DashboardPage = () => {
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
      </div>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <File className="h-10 w-10 text-primary" />
        </div>

        <h2 className="mt-6 text-xl font-semibold">
          You dont have any notes created
        </h2>
        <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-6 text-muted-foreground">
          You currently dont have any notes. please create some so that you can
          see them right here.
        </p>

        <Button asChild>
          <Link href="/dashboard/new">Create a new Note</Link>
        </Button>
      </div>
    </div>
  )
}

export default DashboardPage
