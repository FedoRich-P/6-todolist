// import {Button} from "../Button";
import Button from '@mui/material/Button'
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Input, TextField} from "@mui/material";

type AddItemFormProps = {
    addItem: (title: string) => void
};

export const AddItemForm = (props: AddItemFormProps) => {

    const {addItem} = props;

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <form style={{padding:'2rem 1rem', display:'flex', gap:'2rem'}}>
            <TextField
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                    label={'Task value'}
                    variant="outlined"
                    helperText={error}
                    value={taskTitle}
                    error={!!error}
                    size="small"
            />
            {/*<Input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={taskTitle}*/}
            {/*    onChange={changeTaskTitleHandler}*/}
            {/*    onKeyUp={addTaskOnKeyUpHandler}*/}
            {/*/>*/}
            <Button
                onClick={addTaskHandler}
                variant="contained">
                Add
            </Button>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </form>
    );
};