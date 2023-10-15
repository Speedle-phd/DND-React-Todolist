import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Droppable from './Droppable'
// import Draggable from './Draggable'

import { useGlobalContext } from '@/context/TodoContextProvider'
import Draggable from './Draggable'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { capitalize } from '@/utils'
import { cn } from '@/lib/utils'


const Dndcontext = () => {

   const ctx = useGlobalContext()
   console.log(ctx)
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
                     return (
                        <Draggable key={task.id} id={task.id} status={task.status}>
                           <div className={'flex flex-col relative w-full h-full items-center py-1'}>
                              <h3 className='text-xl'>{task.task}</h3>
                              <p className='absolute bottom-0 left-0 text-[0.5rem]'>
                                 Created: {task.createdAt.toLocaleDateString()}
                              </p>
                              <p className='absolute bottom-0 right-0 text-[0.5rem]'>
                                 {task.dueTo &&
                                    'Due to: ' +
                                       task.dueTo.toLocaleDateString()}
                              </p>
                           </div>
                        </Draggable>
                     )
                  })
                  return (
                     <div className='w-[clamp(13rem,100%,20rem)]'>
                        <h2 className='mb-4 font-genos text-2xl'>
                           {capitalize(container)}
                        </h2>
                        <Droppable
                           key={container}
                           id={container}
                           className={cn(`${
                              (filteredTasks ?? []).length == 0
                                 ? 'text-black/40 dark:text-white/20'
                                 : null
                           } border px-2 py-2 rounded-lg shadow-lightmodeAccent dark:shadow-darkmodeAccent min-h-[17rem] flex flex-col gap-2`)}
                        >
                           {(filteredTasks ?? [])?.length > 0
                              ? [...Markup!]
                              : 'Drag and Drop your tasks...'}
                        </Droppable>
                     </div>
                  )
               })}
            </div>
            <Droppable className='mt-10' id={'bin'}>
               <Button variant='destructive' className='w-[6rem] h-[6rem]'>
                  <TrashIcon className='w-10 h-10' />
               </Button>
            </Droppable>
         </div>
      </DndContext>
   )

   function handleDragEnd(e: DragEndEvent) {
      console.log(e)
      const draggedId = e.active.id
      const toBeChangedEl = ctx?.tasks.find(task => task.id === draggedId)
      const { over } = e
      if (over?.id === 'planned') {
         ctx?.changeTaskStatus(toBeChangedEl!, 'planned')
      } else if (over?.id === 'pending') {
         ctx?.changeTaskStatus(toBeChangedEl!, 'pending')
      } else if (over?.id === 'completed') {
         ctx?.changeTaskStatus(toBeChangedEl!, 'completed')
      } else if (over?.id === 'bin') {
         ctx?.removeTask(draggedId as string)
      }
   }
}

export default Dndcontext
