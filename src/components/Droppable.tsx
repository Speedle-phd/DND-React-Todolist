import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'

interface DroppableProps extends React.AllHTMLAttributes<HTMLDivElement>{
   children: React.ReactNode
   
}

const Droppable = (props : DroppableProps) => {

   const {isOver, setNodeRef} = useDroppable({id: props.id as UniqueIdentifier})
   const style = {
      backgroundColor: isOver ? '#ddd3' : undefined
   }
   return <div ref={setNodeRef} style={{...style, ...props.style}} className={props.className}>
      {props.children}
   </div>
}

export default Droppable
