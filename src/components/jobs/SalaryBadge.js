import { Typography } from '@mui/material';
import React from 'react'

const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

const SalaryBadge = ({ salary }) => {
  return (
    <Typography variant="body2" fontStyle={{ color: "#116e11" }} display="inline-block" style={{
        backgroundColor: "#e5fbe5",
        padding: "0.15rem 0.4rem",
        borderRadius: "6px",
        marginTop: "0.3rem",
        marginBottom: "0.3rem"
    }}>
        {formatCurrency.format(salary)}
    </Typography>
  )
}

export default SalaryBadge