import React from 'react';
import { Box, Typography } from '@mui/material';

const SubStep1: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`}
      </style>

      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>You Selected A Third Party Ownership Model</h2>
      </Typography>

      <Box
        sx={{
          width: 'calc(100% - 320px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          lineHeight: 1.5,
          mb: 2,
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.8rem',
            lineHeight: 1.8,
            padding: '0 10px',
            textAlign: 'justify',
          }}
        >
          This financial model will demonstrate a potential third party ownership structure (defined as an energy offtake agreement) including the initial rate paid for energy services (kWh, MLBs steam, kGAL of Hot Water, KW), the escalation rate charged over the term of the agreement for services. In some cases, the rates may include fuel charges (where the third-party purchases fuel directly) or in other cases passes the fuel charges through to you directly. In cases where the third party passes the fuel costs to you directly, the third party may guarantee the heat rate (conversion efficiency of fuel to usable energy you are buying). This incentivizes the third party to operate as effectively as possible.
          <br /><br /><b>
          In most cases the energy offtake agreement rates may be less than what you pay now.
          </b><br /><br />
          Expect, among other terms, that when negotiating an energy offtake agreement the third party owner will want you to agree to use their energy first (rights to first energy sold at the negotiated terms), the term of the agreement will be limited to 80% of the equipment's useful life (to comply with IRS asset ownership rules and avoid “lease” treatment categorization).
        </Typography>
      </Box>
    </Box>
  );
};

export default SubStep1;
