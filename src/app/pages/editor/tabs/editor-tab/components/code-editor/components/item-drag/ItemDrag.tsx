import React from 'react'
import { ConnectDragSource } from 'react-dnd'
import { DragSource } from 'react-dnd'
import { Line } from '../../../../../../../../shared/components/lines/Line'

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    height: '50px',
}

export interface ItemDragProps {
    id: any
    left: number
    top: number
    hideSourceOnDrag?: boolean

    // Collected Props
    connectDragSource: ConnectDragSource
    isDragging?: boolean
}

const ItemDrag: React.FC<ItemDragProps> = ({ left, top, connectDragSource, isDragging, children }) => {

    if (isDragging) return null;

    return connectDragSource(
        <div style={{ ...style, left, top }}>
            {children}
            {/* <Line top1="0" left1="0" top2="90" left2="90" width="4" color="blue" /> */}
        </div>
    );

}

export const ItemTypes = {
    BOX: 'box',
}

export default DragSource(
    ItemTypes.BOX, {
    beginDrag(props: ItemDragProps) {
        const { id, left, top } = props
        return { id, left, top }
    },
},
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
)(ItemDrag)

