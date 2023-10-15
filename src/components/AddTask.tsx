
import { useGlobalContext } from "@/context/TodoContextProvider"
import FormElement from "./FormElement"

const AddTask = () => {
   const ctx = useGlobalContext()
   return (
      <>
         <div className='flex justify-center flex-col items-center'>
            <h2 className='font-vollkorn text-3xl underline underline-offset-4'>
               {!ctx?.edit ? "Add a new Task" : "Edit your Task"}
            </h2>
            <FormElement />
         </div>
         <hr className="mt-5"/>
      </>
   )
}

export default AddTask
