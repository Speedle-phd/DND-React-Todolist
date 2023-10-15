import AddTask from './components/AddTask'
import MainSection from './components/MainSection'
import Navigationbar from './components/Navigationbar'
import { ThemeProvider } from './components/Themeprovider'
import TodoList from './components/TodoList'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'


const formSchema = z.object({
   id: z
      .string()
      .uuid({ message: 'Invalid uuid' })
      .default(crypto.randomUUID()),
   task: z
      .string({
         required_error: 'Description of the task is required.',
         invalid_type_error: 'Taskdescription must be a text.',
      })
      .min(2, {
         message: 'Taskname must be at least 2 characters.',
      })
      .max(20, {
         message: 'Taskname must be at most 20 characters long.',
      }),
   status: z.enum(['planned', 'pending', 'completed']).default('planned'),
   dueTo: z.optional(
      z.date().min(new Date(), { message: 'Please pick a date in the future.' })
   ),
   createdAt: z.date().default(new Date()),
   prioritize: z.boolean().default(false)
})
export type TaskStructure = z.infer<typeof formSchema>

function App() {

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         task: '',
      },
   })


   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <FormProvider {...form}>
            <Navigationbar />
            <MainSection className='w-[max(calc(100vw-20rem),320px)] mx-auto mt-10 min-h-[80dvh] border rounded-lg py-8 px-10 shadow-lightmodeAccent dark:shadow-darkmodeAccent'>
               <AddTask />
               <TodoList />
            </MainSection>
         </FormProvider>
      </ThemeProvider>
   )
}

export default App
