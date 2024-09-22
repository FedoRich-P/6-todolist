import './App.css';
import {Todolist} from "./Todolist";
import React, {ChangeEvent, useRef, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import MenuIcon from '@material-ui/icons/Menu';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML5', isDone: true},
            {id: v1(), title: 'CSS3', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Vue', isDone: true},
            {id: v1(), title: 'Angular', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(newTodolistTasks)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        }
        setTasks(newTodolistTasks)
    }

    const changeTaskText = (taskId: string, title: string, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, title} : t)
        }
        setTasks(newTodolistTasks)
    }

    const changeTodoTitle = (title: string, todoId: string) => {
        setTodolists(todolists.map(tl => tl.id === todoId ? {...tl, title} : tl))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const id = v1();
        setTodolists([
            {id, title, filter: 'all'},
            ...todolists
        ])

        setTasks({
            [id]: [],
            ...tasks,
        })
    }

    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const save = () => {
        const inputValue = inputRef.current as HTMLInputElement
        setValue(inputValue.value)
    }

    const [selectValue, setSelectValue] = useState<string>('1')

    const onChangeSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.currentTarget.value)
    }


    return (
        <div className="App">

            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((tl) => {

                        const allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding:'2rem'}}>
                                    <Todolist
                                        key={tl.id}
                                        title={tl.title}
                                        addTask={addTask}
                                        todolistId={tl.id}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        tasks={tasksForTodolist}
                                        changeFilter={changeFilter}
                                        changeTaskText={changeTaskText}
                                        removeTodolist={removeTodolist}
                                        changeTodoTitle={changeTodoTitle}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;


{/*<select value={selectValue} onChange={onChangeSelectValue}>*/
}
{/*    <option>Выбрать</option>*/
}
{/*    <option value="1">Msk</option>*/
}
{/*    <option value="2">Minsk</option>*/
}
{/*    <option value="3">Spb</option>*/
}
{/*</select>*/
}

{/*<input*/
}
{/*    type="text"*/
}
{/*    ref={inputRef}*/
}
{/*/>*/
}
{/*<button*/
}
{/*    onClick={save}*/
}
{/*>*/
}
{/*    save*/
}
{/*</button>*/
}
{/*<h3>*/
}
{/*    Value : {value}*/
}
// {/*</h3>