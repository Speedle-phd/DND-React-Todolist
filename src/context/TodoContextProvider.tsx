import { TaskStructure } from '@/components/FormElement'
import { createContext, useContext, useEffect, useState } from 'react'

interface TodoContextProps {
   msg: string
   changeTaskStatus: (
      t: TaskStructure,
      s: 'planned' | 'pending' | 'completed'
   ) => void
   addTask: (t: TaskStructure) => void
   removeTask: (id: string) => void
   tasks: TaskStructure[]
}
const TodoContext = createContext<TodoContextProps | null>(null)

const TodoContextProvider = ({ children }: React.PropsWithChildren) => {
   //STATE
   const [tasks, setTasks] = useState<TaskStructure[]>([])

   //FUNCTIONS
   const changeTaskStatus = (entry: TaskStructure, status : 'planned' | 'pending' | 'completed') => {
      setTasks(prev => {
         const filteredPrev = prev.filter(t => t.id !== entry.id)
         return [...filteredPrev, {...entry, status: status}]
      })
   }
   const addTask = (task: TaskStructure) => {
      setTasks(prev => {
         return [...prev, task]
      })
   }
   const removeTask = (id: string) => {
      setTasks(tasks.filter(t => t.id !== id))
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
