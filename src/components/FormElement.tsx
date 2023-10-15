
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
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
import { TaskStructure } from '@/App'






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