import { useState } from "react";

export default function Cell({ row, col, value, filled, className }) {
    const [isEditing, setIsEditing] = useState(false)
    const [cellValue, setValue] = useState(value)
    const [isLocked, setIsLocked] = useState(filled)

    function handleClick(){
        if(!filled) setIsEditing(true)
    }

    function handleChange(event){
        const val = event.target.value;
        if (val === "" || /^[1-9]$/.test(val)){
            setValue(val === "" ? null : Number(val))
        }
    }

    function handleBlur(){
        setIsEditing(false)
        if(cellValue !== null){
            setIsLocked(true)
        }
    }

    let content;
    if (filled || isLocked) {
        content = cellValue;
    } else if (isEditing) {
        content = ( <input type="text" className="cell-input" maxLength="1" autoFocus value={cellValue ?? ""} onChange={handleChange}
                onBlur={handleBlur}/> );
    } else {
        content = cellValue ?? "";
    }


    return (
        <div data-row={row} data-col={col} className={`cell ${className}`} onClick={handleClick}>
            {content}
        </div>
    );
}
