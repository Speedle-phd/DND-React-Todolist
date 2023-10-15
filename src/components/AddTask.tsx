import FormElement from "./FormElement"


const AddTask = () => {
   return (
      <>
         <div className='flex justify-center flex-col items-center'>
            <h2 className='font-vollkorn text-3xl underline underline-offset-4'>
               Add A New Task
            </h2>
            <FormElement />
         </div>
         <hr className="mt-5"/>
      </>
   )
}

export default AddTask
