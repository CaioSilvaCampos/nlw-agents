import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { z } from 'zod/v4'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "./http/use-create-rooms";

const createRoomSchema = z.object({
  name: z.string().min(3, {message: 'Inclua no minimo 3 caracteres'}),
  description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom()

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues:{
      name: '',
      description: ''
    }
  })

  async function handleCreateRoom({
    name,
    description
  }: CreateRoomFormData){
    await createRoom({name, description})
    createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardDescription>
            Crie uma nova sala para começar a fazer perguntas e receber respostas da I.A
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form action="" className="flex flex-col gap-4" onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}>
            <FormField
              control = {createRoomForm.control}
              name = "name"
              render={({ field }) => {
                return (
                  <FormItem> 
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome da sala..."></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )
              }}
            >
              
            </FormField>
            <FormField
              control = {createRoomForm.control}
              name = "description"
              render={({ field }) => {
                return (
                  <FormItem> 
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field}></Textarea>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )
              }}
            >

            </FormField>
            <Button type="submit" className="w-full">Criar sala</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
