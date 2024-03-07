'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from '@/react-dom-shim'

import { Loader2, Trash } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save
        </Button>
      )}
    </>
  )
}
