import { TaskStructure } from '@/components/FormElement'
import { createContext, useContext, useEffect, useState } from 'react'

interface TodoContextProps {
   msg: string
   edit: string | null
   toggleEdit: (s: string) => void
   changeTaskStatus: (
      t: TaskStructure,
      s: 'planned' | 'pending' | 'completed'
   ) => void
   addTask: (t: TaskStructure) => void
   removeTask: (id: string) => void
   tasks: TaskStructure[]
   alterEntry: (t: string, d: Date | undefined) => void
}
const TodoContext = createContext<TodoContextProps | null>(null)

const TodoContextProvider = ({ children }: React.PropsWithChildren) => {
   //REF

   //STATE
   const [tasks, setTasks] = useState<TaskStructure[]>([])
   const [edit, setEdit] = useState<string | null>(null)
   //FUNCTIONS
   const changeTaskStatus = (
      entry: TaskStructure,
      status: 'planned' | 'pending' | 'completed'
   ) => {
      setTasks((prev) => {
         const filteredPrev = prev.filter((t) => t.id !== entry.id)
         return [...filteredPrev, { ...entry, status: status }]
      })
   }

   const alterEntry = (newTask: string, newDueTo?: Date) => {
      const toBeAltered = tasks.find((t) => t.id === edit) as TaskStructure
      setTasks((prev) => {
         const filteredPrev = prev.filter((t) => t.id !== edit)
         return [...filteredPrev, { ...toBeAltered, task: newTask, dueTo: newDueTo }]
      })
      toggleEdit()
   }

   const addTask = (task: TaskStructure) => {
      setTasks((prev) => {
         return [...prev, task]
      })
   }
   const removeTask = (id: string) => {
      setTasks(tasks.filter((t) => t.id !== id))
   }
   const toggleEdit = (id?: string) => {
      if (!id) {
         setEdit(null)
         return
      }
      setEdit(id)
   }

   //LOGGING
   useEffect(() => {
      console.log(tasks)
   }, [tasks])

   return (
      <TodoContext.Provider
         value={{
            msg: 'text',
            changeTaskStatus,
            tasks,
            addTask,
            removeTask,
            edit,
            toggleEdit,
            alterEntry,
         }}
      >
         {children}
      </TodoContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
   return useContext(TodoContext)
}

export default TodoContextProvider
