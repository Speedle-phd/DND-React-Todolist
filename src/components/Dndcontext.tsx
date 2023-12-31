import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Droppable from './Droppable'
// import Draggable from './Draggable'

import { useGlobalContext } from '@/context/TodoContextProvider'
import Draggable from './Draggable'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { capitalize } from '@/utils'
import { cn } from '@/lib/utils'
import { EditIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const Dndcontext = () => {
   const formCtx = useFormContext()
   const ctx = useGlobalContext()
   const containers = ['planned', 'pending', 'completed']
   // const [parent, setParent] = useState<UniqueIdentifier | null>(null)

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <div className='flex flex-col items-center'>
            <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8 w-full flex flex-col items-center lg:items-start'>
               {containers.map((container) => {
                  // We updated the Droppable component so it would accept an `id`
                  // prop and pass it to `useDroppable`
                  const filteredTasks = ctx?.tasks.filter(
                     (task) => task.status === container
                  )
                  const Markup = filteredTasks?.map((task) => {
                     const overdue = task.dueTo
                        ? new Date(task.dueTo) <= new Date()
                        : false
                     return (
                        <Draggable
                           key={task.id}
                           id={task.id}
                           status={task.status}
                           className={`${
                              overdue ? 'border-4 border-red-900' : null
                           } touch-none`}
                        >
                           <div
                              className={
                                 'flex flex-col relative w-full h-full items-center py-1'
                              }
                           >
                              <h3 className='text-xl'>{task.task}</h3>
                              <p className='absolute bottom-0 left-0 text-[0.5rem]'>
                                 Created:{' '}
                                 {new Date(task.createdAt).toLocaleDateString()}
                              </p>
                              <p className='absolute bottom-0 right-0 text-[0.5rem]'>
                                 {task.dueTo
                                    ? !overdue
                                       ? 'Due to: ' +
                                          new Date(
                                             task.dueTo
                                          ).toLocaleDateString()
                                       : 'Overdue'
                                    : null}
                              </p>
                           </div>
                        </Draggable>
                     )
                  })
                  return (
                     <div
                        key={container}
                        className='w-[clamp(13rem,100%,20rem)]'
                     >
                        <h2 className='mb-4 font-genos text-2xl'>
                           {capitalize(container)}
                        </h2>
                        <Droppable
                           key={container}
                           id={container}
                           className={cn(
                              `${
                                 (filteredTasks ?? []).length == 0
                                    ? 'text-black/40 dark:text-white/20'
                                    : null
                              } border px-2 py-2 rounded-lg shadow-lightmodeAccent dark:shadow-darkmodeAccent min-h-[17rem] flex flex-col gap-2`
                           )}
                        >
                           {(filteredTasks ?? [])?.length > 0
                              ? [...Markup!]
                              : 'Drag and Drop your tasks...'}
                        </Droppable>
                     </div>
                  )
               })}
            </div>
            <div className='mt-10 flex gap-4 md:gap-16'>
               <Droppable id={'edit'}>
                  <Button className='w-[6rem] h-[6rem] text-white bg-amber-400 hover:bg-amber-500'>
                     <EditIcon className='w-10 h-10' />
                  </Button>
               </Droppable>
               <Droppable id={'bin'}>
                  <Button variant='destructive' className='w-[6rem] h-[6rem]'>
                     <TrashIcon className='w-10 h-10' />
                  </Button>
               </Droppable>
            </div>
         </div>
      </DndContext>
   )

   function handleDragEnd(e: DragEndEvent) {
      const draggedId = e.active.id
      const toBeChangedEl = ctx?.tasks.find((task) => task.id === draggedId)
      const { over } = e
      if (over?.id === 'planned') {
         ctx?.changeTaskStatus(toBeChangedEl!, 'planned')
      } else if (over?.id === 'pending') {
         ctx?.changeTaskStatus(toBeChangedEl!, 'pending')
      } else if (over?.id === 'completed') {
         ctx?.changeTaskStatus(toBeChangedEl!, 'completed')
      } else if (over?.id === 'bin') {
         ctx?.removeTask(draggedId as string)
      } else if (over?.id === 'edit') {
         const editId = toBeChangedEl?.id
         const editTask = toBeChangedEl?.task
         const editDueTo = toBeChangedEl?.dueTo
         formCtx.setValue('task', editTask)
         formCtx.setValue('dueTo', editDueTo)
         ctx?.toggleEdit(editId!)
      }
   }
}

export default Dndcontext
