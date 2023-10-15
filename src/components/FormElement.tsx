
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import * as z from 'zod'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form'

import { Input } from './ui/input'
import { Button } from './ui/button'
import DatePicker from './Datepicker'
import { useGlobalContext } from '@/context/TodoContextProvider'
import { useEffect } from 'react'



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
})

export type TaskStructure = z.infer<typeof formSchema>

const FormElement = () => {
   const ctx = useGlobalContext()
   // 1. Define your form.
   const {
      reset,
      
      formState,
      formState: { isSubmitSuccessful },
      control,
      ...form
      
   } = useFormContext()
   function handleSubmit(values: TaskStructure) {
      // ✅ This will be type-safe and validated.

      if(!ctx?.edit) {
         const id = crypto.randomUUID()
         ctx?.addTask({...values, id})
         return
      }
      ctx?.alterEntry(values.task, values.dueTo)
   }
   useEffect(() => {
      if(isSubmitSuccessful) {
         reset({
            task: "",
            dueTo: undefined
         })
      }
   },[isSubmitSuccessful, reset])
   return (
      <Form formState={formState} reset={reset} control={control} {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit as SubmitHandler<FieldValues>)} className=''>
            <FormField
               control={control}
               name='task'
               render={({ field }) => (
                  <FormItem className='my-4'>
                     <FormLabel className="font-genos text-md">Task</FormLabel>
                     <FormControl>
                        <Input placeholder="What'cha gotta do..." {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name='dueTo'
               render={({ field }) => (
                  <FormItem className='my-4'>
                     <FormLabel className="font-genos text-md">Due to: (optional)</FormLabel>
                     <FormControl>
                        <DatePicker {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button className="w-1/2 font-genos text-md" type='submit'>{!ctx?.edit ? "Submit" : "Edit Entry"}</Button>
         </form>
      </Form>
   )
}

export default FormElement