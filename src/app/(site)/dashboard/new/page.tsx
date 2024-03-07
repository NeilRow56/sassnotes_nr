import { Card } from '@/components/ui/card'

import { CreateNoteForm } from '@/components/notes/CreateNoteForm'

export const revalidate = 0

export default async function NewNoteRoute() {
  return (
    <Card>
      <CreateNoteForm />
    </Card>
  )
}
