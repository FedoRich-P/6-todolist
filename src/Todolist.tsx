import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {Checkbox, Grid} from "@mui/material";

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    changeTaskText: (taskId: string, value: string, todolistId: string) => void
    changeTodoTitle: (value: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskText,
        changeTodoTitle,
        todolistId,
        removeTodolist
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addItem = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTodoTitleHandler = (value: string) => {
        changeTodoTitle(value, todolistId)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <EditableSpan
                    title={title}
                    changeTaskText={changeTodoTitleHandler}/>
                {/*<h3>{title}</h3>*/}
                <Button
                    color={'error'}
                    variant="outlined"
                    onClick={removeTodolistHandler}
                    startIcon={<DeleteIcon/>}
                >
                    Delete
                </Button>
            </div>
            <AddItemForm addItem={addItem}/>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={() => changeFilterTasksHandler('all')}
                    color={'success'}>
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={() => changeFilterTasksHandler('active')}
                    color={'primary'}>
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={() => changeFilterTasksHandler('completed')}
                    color={'secondary'}>
                    Completed
                </Button>
            </div>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            const changeTaskTextHandler = (value: string) => {
                                changeTaskText(task.id, value, todolistId)
                            }

                            return <li
                                key={task.id}
                                className={task.isDone ? 'is-done' : ''}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <label>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={changeTaskStatusHandler}/>
                                        <EditableSpan
                                            changeTaskText={changeTaskTextHandler}
                                            title={task.title}
                                        />
                                    </label>
                                    {/*<span>{task.title}</span>*/}
                                    {/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
                                    <Button
                                        color={'error'}
                                        variant="outlined"
                                        onClick={removeTaskHandler}
                                        startIcon={<DeleteIcon/>}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </li>
                        })}
                    </ul>
            }
        </div>
    )
}


// const [taskTitle, setTaskTitle] = useState('')
// const [error, setError] = useState<string | null>(null)

// const addTaskHandler = () => {
// 	if (taskTitle.trim() !== '') {
// 		addTask(taskTitle.trim(), todolistId)
// 		setTaskTitle('')
// 	} else {
// 		setError('Title is required')
// 	}
// }
//
// const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
// 	setTaskTitle(event.currentTarget.value)
// }
//
// const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
// 	setError(null)
// 	if (event.key === 'Enter') {
// 		addTaskHandler()
// 	}
// }

{/*<div>*/
}
{/*	<input*/
}
{/*		className={error ? 'error' : ''}*/
}
{/*		value={taskTitle}*/
}
{/*		onChange={changeTaskTitleHandler}*/
}
{/*		onKeyUp={addTaskOnKeyUpHandler}*/
}
{/*	/>*/
}
{/*	<Button title={'+'} onClick={addTaskHandler}/>*/
}
{/*	{error && <div className={'error-message'}>{error}</div>}*/
}
{/*</div>*/
}