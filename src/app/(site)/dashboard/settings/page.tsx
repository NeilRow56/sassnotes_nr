import { SubmitButton } from '@/components/dashboard/SubmitButtons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export const revalidate = 0

export const dynamic = 'force-dynamic'

async function getData(userId: string) {
  //To enable form to change on each request

  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      colorScheme: true,
    },
  })

  return data
}

async function SettingsPage() {
  const session = await getServerSession(authOptions)

  const user = session?.user

  const data = await getData(user?.id as string)

  async function postData(formData: FormData) {
    'use server'

    const name = formData.get('name') as string
    const lastName = formData.get('lastName') as string
    const colorScheme = formData.get('color') as string

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        firstName: name ?? undefined,
        lastName: lastName ?? undefined,
        colorScheme: colorScheme ?? undefined,
      },
    })

    revalidatePath('/', 'layout')
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-primary/80">
                  Your Name
                </Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your First Name"
                  defaultValue={data?.firstName ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-primary/80">
                  Last Name
                </Label>
                <Input
                  name="lastName"
                  type="text"
                  id="lastName"
                  placeholder="Your Last Name"
                  defaultValue={data?.lastName ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-primary/80">
                  Your Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  disabled
                  defaultValue={data?.email ?? undefined}
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-primary/80">Color Scheme</h2>
                <Select name="color" defaultValue={data?.colorScheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>

                      <SelectItem value="theme-zinc">Zinc</SelectItem>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SettingsPage
