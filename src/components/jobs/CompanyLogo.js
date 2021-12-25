import { Box } from '@mui/material';
import React, { useState } from 'react';
import logoReplacement from "../../assets/company.png";

const CompanyLogo = (props) => {
    
    let companyDomain = props.company.toLowerCase();
    companyDomain = companyDomain.replace(/\s+/g, ''); // remove spaces
    companyDomain = `${companyDomain}.com`;
    let URL = `https://logo.clearbit.com/${companyDomain}`;

    const [brokenImg, setBrokenImg] = useState(false);

    return (
        <Box sx={{ width: "50px", height: "50px" }}>
            <img 
                src={brokenImg ? logoReplacement : URL} 
                alt={props.company} 
                onError={() => setBrokenImg(true)}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
        </Box>
    )
}

export default CompanyLogo