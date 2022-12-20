import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'react-uuid'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import './Dnd.css'

const { REACT_APP_SERVER_URL } = process.env;


const itemsFromBackend = [
    { id: uuid(), content: 'Archer' },
    { id: uuid(), content: 'Banana' },
    { id: uuid(), content: 'Boat' },
    { id: uuid(), content: 'Boat (Half)' },
    { id: uuid(), content: 'Bridge)' },
    { id: uuid(), content: 'Bow' },
    { id: uuid(), content: 'Bow (Standing)' },
    { id: uuid(), content: 'Bird of Paradise' },
    { id: uuid(), content: 'Bird of Paradise (Revolved)' },
    { id: uuid(), content: 'Butterfly' },
    { id: uuid(), content: 'Camel' },
    { id: uuid(), content: 'Cat' },
    { id: uuid(), content: 'Caterpillar' },
    { id: uuid(), content: 'Chair' },
    { id: uuid(), content: 'Child' },
    { id: uuid(), content: 'Chin Stand' },
    { id: uuid(), content: 'Cobra' },
    { id: uuid(), content: 'Corpse' },
    { id: uuid(), content: 'Corpse (Reversed)' },
    { id: uuid(), content: 'Cow' },
    { id: uuid(), content: 'Cradle the Baby' },
    { id: uuid(), content: 'Crane' },
    { id: uuid(), content: 'Crescent Lunge' },
    { id: uuid(), content: 'Crescent Lunge on the Knee' },
    { id: uuid(), content: 'Crescent Moon (Standing)' },
    { id: uuid(), content: 'Crow' },
    { id: uuid(), content: 'Dolphin' },
    { id: uuid(), content: 'Downward Facing Dog' },
    { id: uuid(), content: 'Eagle' },
    { id: uuid(), content: 'Easy Seat' },
    { id: uuid(), content: 'Eight Point' },
    { id: uuid(), content: 'Elbow Balance' },
    { id: uuid(), content: 'Extended Puppy' },
    { id: uuid(), content: 'Firefly' },
    { id: uuid(), content: 'Floating Stick' },
    { id: uuid(), content: 'Flying Man' },
    { id: uuid(), content: 'Flying Man (Revolved)' },
    { id: uuid(), content: 'Forearm Balance' },
    { id: uuid(), content: 'Frog' },
    { id: uuid(), content: 'Garland' },
    { id: uuid(), content: 'Gate' },
    { id: uuid(), content: 'Gate (Seated)' },
    { id: uuid(), content: 'Goddess' },
    { id: uuid(), content: 'Gorilla' },
    { id: uuid(), content: 'Grasshopper' },
    { id: uuid(), content: 'Half Moon' },
    { id: uuid(), content: 'Half Moon (Revolved)' },
    { id: uuid(), content: 'Handstand' },
    { id: uuid(), content: 'Happy Baby' },
    { id: uuid(), content: 'Headstand (Supported)' },
    { id: uuid(), content: 'Headstand (Tripod)' },
    { id: uuid(), content: 'Hero' },
    { id: uuid(), content: 'Heron' },
    { id: uuid(), content: 'Lizard' },
    { id: uuid(), content: 'Lizard (Flying)' },
    { id: uuid(), content: 'Locust One' },
    { id: uuid(), content: 'Locust Two' },
    { id: uuid(), content: 'Locust Three' },
    { id: uuid(), content: 'Lord of the Fishes' },
    { id: uuid(), content: 'Lotus' },
    { id: uuid(), content: 'Lotus (Half)' },
    { id: uuid(), content: 'Lunge' },
    { id: uuid(), content: 'Monkey (Crooked)' },
    { id: uuid(), content: 'Moonbird' },
    { id: uuid(), content: 'Mountain' },
    { id: uuid(), content: 'Peacock' },
    { id: uuid(), content: 'Pendant' },
    { id: uuid(), content: 'Pigeon' },
    { id: uuid(), content: 'Pigeon (Flying)' },
    { id: uuid(), content: 'Pigeon (Half)' },
    { id: uuid(), content: 'Plank' },
    { id: uuid(), content: 'Plank (reversed)' },
    { id: uuid(), content: 'Plow' },
    { id: uuid(), content: 'Pushup (Low)' },
    { id: uuid(), content: 'Pyramid' },
    { id: uuid(), content: 'Rabbit' },
    { id: uuid(), content: 'Rejuvination' },
    { id: uuid(), content: 'Rooster' },
    { id: uuid(), content: 'Sage' },
    { id: uuid(), content: 'Warrior 1' },
    { id: uuid(), content: 'Warrior 2' }
];

const columnsFromBackend =
{
    ['poses']: {
        name: 'POSES',
        items: itemsFromBackend
    },
    ['routine']: {
        name: 'ROUTINE',
        items: []
    }
};

const Dnd = (props) => {


    const [columns, setColumns] = useState(columnsFromBackend);
    // const [routine, setRoutine] = useState({});
    const { routineId } = props;

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
            axios.put(`${REACT_APP_SERVER_URL}/routines/${routineId}`, { poseId: item._id, action: 'add' }).then((response) => {
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
            axios.put(`${REACT_APP_SERVER_URL}/routines`, { poseId: item._id, action: 'remove' }).then((response) => {
                //
                console.log('add pose');
            }).catch((err) => {
                console.log(err)
            })
        }
    
    };

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/routines/${routineId}`)
            .then(response => {
                const routinePoses = response.data.routine.poses.map(r => {
                    return { name: r.name, id: r._id }
                })
                const posesToExclude = routinePoses.map(e => {
                    return e.id
                })
                axios.get(`${REACT_APP_SERVER_URL}/poses`)
                    .then(response => {
                        const poses = response.data.poses.map(p => {
                            return { name: p.name, id: p._id }
                        })
                            .filter(f => {return !posesToExclude.includes(f.id)})
                const tempColumns = columnsFromBackend;
                columnsFromBackend['poses'] = poses
                columnsFromBackend['routine'] = routinePoses
                setColumns(columnsFromBackend)
            })
        })
        .catch ()
    }, [])

return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([id, column]) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 className='colu'>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                            <Droppable droppableId={id} key={id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? '#b0a18b' : '#e8e2d0',
                                                borderRadius: '10px',
                                                padding: 4,
                                                width: 250,
                                                minHeight: 400,
                                                maxHeight: 400,
                                                scrollBehavior: 'smooth',
                                                overflow: 'auto'
                                            }}
                                        >
                                            {column.items.map((item, index, key) => {
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
                                                                        backgroundColor: snapshot.isDragging ? '#9ea2ad' : '#2b3241',
                                                                        color: '#9ea2ad',
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
