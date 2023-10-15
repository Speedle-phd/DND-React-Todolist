import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface DraggableProps extends React.ButtonHTMLAttributes<"button">{
   children: React.ReactNode
   status: "planned" | "pending" | "completed"
}

const Draggable = ({children, id, status, className} : DraggableProps) => {
   const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: id as UniqueIdentifier,
   });
   const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
   } : undefined;

   return (
      <Button
         className={cn(
            'w-full h-[5rem] dark:text-black',
            status === 'planned'
               ? 'bg-red-200 hover:bg-red-300 focus-visible:bg-red-300'
               : status === 'pending'
               ? 'bg-yellow-200 hover:bg-yellow-300 focus-visible:bg-yellow-300'
               : 'bg-green-300 hover:bg-green-400 focus-visible:bg-green-400', className
         )}
         id={id}
         variant='secondary'
         ref={setNodeRef}
         style={style}
         {...listeners}
         {...attributes}
      >
         {children}
      </Button>
   )
}

export default Draggable
