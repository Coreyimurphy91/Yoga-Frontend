import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'react-uuid'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const { REACT_APP_SERVER_URL } = process.env;


const itemsFromBackend = [
    { id: uuid(), content: 'Warrior 1' },
    { id: uuid(), content: 'Warrior 2' }
];

const columnsFromBackend =
{
    [uuid()]: {
        name: 'Poses',
        items: itemsFromBackend
    },
    [uuid()]: {
        name: 'Routine',
        items: []
    }
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        const item = destItems.splice(destination.index, 0, removed)[0]
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.put(`${REACT_APP_SERVER_URL}/routines`, {poseId: item._id, action: 'add'}).then((response) => {
            //
            console.log('add pose');
        }).catch((err) => {
            console.log(err)
        })
    } else {
        // Add axios remove request to remove pose from routine

        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        
        const [removed] = copiedItems.splice(source.index, 1);
        const item = copiedItems.splice(destination.index, 0, removed)[0]
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.put(`${REACT_APP_SERVER_URL}/routines`, {poseId: item._id, action: 'remove'}).then((response) => {
            //
            console.log('add pose');
        }).catch((err) => {
            console.log(err)
        })
    }
    
};

const Dnd = () => {
    const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: 'none',
                                                                            padding: 16,
                                                                            margin: '0 0 8px 0',
                                                                            minHeight: '50px',
                                                                            backgroundColor: snapshot.isDragging ? '#263b4a' : '#456c86',
                                                                            color: 'white',
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>

                                                                )
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    )
}

export default Dnd
