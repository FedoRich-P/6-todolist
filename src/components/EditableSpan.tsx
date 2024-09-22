import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanProps = {
    title: string;
    changeTaskText: (value: string) => void;
};
export const EditableSpan = (props: EditableSpanProps) => {

    const { title, changeTaskText } = props;

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(title)

    const changeEditMode = () => {
        setEditMode(!editMode)
    }

    const getInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setText(value)
        changeTaskText(value)
    }

    return (
        editMode ?
            <TextField
                onChange={getInputValue}
                onBlur={changeEditMode}
                variant="standard"
                size="small"
                value={text}
                // type="text"
                autoFocus
            /> :
            <span
                onDoubleClick={changeEditMode}
            >{title}</span>
    );
};