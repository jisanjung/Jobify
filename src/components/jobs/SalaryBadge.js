import { Chip } from "@mui/material";
import React from "react";

const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

const SalaryBadge = ({ salary, size = "small" }) => {
    if (!salary) return null;

    return (
        <Chip
            size={size}
            label={`${formatCurrency.format(salary)} / yr`}
            sx={{ bgcolor: "success.light", color: "success.main" }}
        />
    );
};

export default SalaryBadge;
