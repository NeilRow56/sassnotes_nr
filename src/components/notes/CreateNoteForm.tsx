'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { NoteSchema } from '@/schemas'

import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '../ui/textarea'
import { note_creation } from '@/actions/note-actions/note'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SubmitButton } from '../dashboard/SubmitButtons'

export const CreateNoteForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })
  const onSubmit = (data: z.infer<typeof NoteSchema>) => {
    startTransition(() => {
      note_creation(data)
        .then((data) => {
          if (data?.error) {
            form.reset()
            toast.error(data.error)
          }

          if (data?.success) {
            form.reset()
            toast.success(data.success)
            router.push('/dashboard')
            router.refresh()
          }
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Note</CardTitle>
        <CardDescription>
          Right here you can now create your new notes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <Form {...form}>
          <form
            className="gap-3 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button asChild variant="destructive">
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <SubmitButton />
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
