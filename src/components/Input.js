import { TextField } from "@mui/material";
import React, { useState } from "react";

const Input = ({ label, regex, setInput, setError, errorText, sx, size, placeholder, InputProps, inputProps, name }) => {
    const [error, setLocalError] = useState(false);

    const validate = (value) => {
        const invalid = !value || !regex.test(value);
        setLocalError(invalid);
        setError(invalid);
    };

    return (
        <TextField
            label={label}
            name={name}
            sx={sx}
            size={size}
            placeholder={placeholder}
            InputProps={InputProps}
            inputProps={inputProps}
            error={error}
            helperText={error ? errorText || `Enter a valid ${label.toLowerCase()}` : " "}
            onBlur={(e) => validate(e.target.value.trim())}
            onChange={(e) => {
                setInput(e.target.value.trim());
                if (error) validate(e.target.value.trim());
            }}
            fullWidth
            required
        />
    );
};

export default Input;
