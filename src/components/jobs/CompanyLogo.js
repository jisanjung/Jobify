import { Avatar } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";

const toDomain = (company = "") =>
    `${company.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "")}.com`;

const CompanyLogo = ({ company, size = 44 }) => {
    const [brokenImg, setBrokenImg] = useState(false);
    const initial = company?.trim()?.[0]?.toUpperCase() || "?";

    return (
        <Avatar
            variant="rounded"
            alt={company}
            src={brokenImg || !company ? undefined : `https://logo.clearbit.com/${toDomain(company)}`}
            imgProps={{ onError: () => setBrokenImg(true), style: { objectFit: "contain" } }}
            sx={{
                width: size,
                height: size,
                fontSize: size * 0.42,
                fontWeight: 700,
                bgcolor: (theme) => (brokenImg ? alpha(theme.palette.primary.main, 0.1) : theme.palette.background.paper),
                color: "primary.main",
                border: 1,
                borderColor: "divider",
                flexShrink: 0,
            }}
        >
            {initial}
        </Avatar>
    );
};

export default CompanyLogo;
