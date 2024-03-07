'use server'
import * as z from 'zod'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import { db } from '@/lib/db'

import { NoteSchema } from '@/schemas'

export const note_creation = async (values: z.infer<typeof NoteSchema>) => {
  const session = await getServerSession(authOptions)

  const user = session?.user
  const userId = user?.id

  if (!userId) {
    throw new Error('Not authorized')
  }

  const validatedFields = NoteSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { description, title } = validatedFields.data

  await db.note.create({
    data: {
      userId,
      description,
      title,
    },
  })

  return { success: 'Successfully added to database!' }
}
