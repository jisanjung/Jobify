import { TextField } from '@mui/material';
import React, { useState } from 'react';

const Input = (props) => {

    const [error, setError] = useState(false);

    const validate = input => {
        if (!props.regex.test(input) || !input) {
            setError(true);
        } else {
            setError(false);
        }
    }

    return (
        <TextField label={props.label} variant={props.variant} sx={props.sx} regex={props.regex} error={error} helperText={error ? `Enter valid ${props.label.toLowerCase()}` : ""}
        onBlur={e => validate(e.target.value)}/>
    )
}

export default Input
