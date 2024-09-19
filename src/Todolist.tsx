import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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

	const addItem = (title:string) => {
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
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem={addItem}/>
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

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan
									changeTaskText={changeTaskTextHandler}
									title={task.title}
								/>
								{/*<span>{task.title}</span>*/}
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
				        onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
				        onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
				        onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
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

{/*<div>*/}
{/*	<input*/}
{/*		className={error ? 'error' : ''}*/}
{/*		value={taskTitle}*/}
{/*		onChange={changeTaskTitleHandler}*/}
{/*		onKeyUp={addTaskOnKeyUpHandler}*/}
{/*	/>*/}
{/*	<Button title={'+'} onClick={addTaskHandler}/>*/}
{/*	{error && <div className={'error-message'}>{error}</div>}*/}
{/*</div>*/}