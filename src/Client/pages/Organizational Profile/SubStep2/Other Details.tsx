import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, TextField, Tooltip, Select, MenuItem/* , Checkbox */ } from '@mui/material';

interface OwnerEntityDetails {
  legalName: string;
  organizationalStructure: string;
  ownershipPercentages: string;
  propertyType: string;
  yearBuilt: string;
  yearLastRenovated: string;
  squareFootage: string;
  parcelId: string;
  currentOccupancyStatus: string;
  leasedOrVacant: string;
  occupancyRate: string;
  leaseStartEndDates: string;
  majorTenants: string;
  leaseExpirationSchedule: string;
}

interface FinancialDetails {
  estimatedLTV: string;
  appraisedMarketValue: string;
  debtServiceCoverageRatio: string;
  capRate: string;
  submitProFormaFinancials: string;
}

interface TenantDetails {
  leaseTerms: string;
}

interface LeaseQuestions {
  landlordLegalName: string;
  tenantLegalName: string;
  typeOfProperty: string;
  leaseStartDate: string;
  leaseEndDate: string;
  renewalOptions: string;
  termsOfRenewal: string;
  earlyTerminationClause: string;
  leaseStructure: string;
}

const SubStep2: React.FC = () => {
  const [propertyOwnership, setPropertyOwnership] = useState<string | null>(null);

  const [ownerEntityDetails, setOwnerEntityDetails] = useState<OwnerEntityDetails>({
    legalName: '',
    organizationalStructure: '',
    ownershipPercentages: '',
    propertyType: '',
    yearBuilt: '',
    yearLastRenovated: '',
    squareFootage: '',
    parcelId: '',
    currentOccupancyStatus: '',
    leasedOrVacant: '',
    occupancyRate: '',
    leaseStartEndDates: '',
    majorTenants: '',
    leaseExpirationSchedule: '',
  });

  const [financialDetails, setFinancialDetails] = useState<FinancialDetails>({
    estimatedLTV: '',
    appraisedMarketValue: '',
    debtServiceCoverageRatio: '',
    capRate: '',
    submitProFormaFinancials: '',
  });

  const [tenantDetails, setTenantDetails] = useState<TenantDetails>({
    leaseTerms: '',
  });

  const [leaseQuestions, setLeaseQuestions] = useState<LeaseQuestions>({
    landlordLegalName: '',
    tenantLegalName: '',
    typeOfProperty: '',
    leaseStartDate: '',
    leaseEndDate: '',
    renewalOptions: '',
    termsOfRenewal: '',
    earlyTerminationClause: '',
    leaseStructure: '',
  });

  const [leasePeriodStart, setLeasePeriodStart] = useState<string>('');
  const [leasePeriodEnd, setLeasePeriodEnd] = useState<string>('');
  const [longTermOccupancy, setLongTermOccupancy] = useState<string | null>(null);

  const handleOwnerEntityDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOwnerEntityDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFinancialDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFinancialDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleTenantDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTenantDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleLeaseQuestionsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeaseQuestions(prev => ({ ...prev, [name]: value }));
  };

  const handlePropertyOwnershipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyOwnership(event.target.value);
  };

  const handleLongTermOccupancyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongTermOccupancy(event.target.value);
  };

  const commonInputStyle = {
    flex: 1,
    fontSize: '0.7rem',
    fontFamily: 'Nunito Sans, sans-serif',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
  };

  const sectionHeadingStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textAlign: 'left',
    mb: 1,
  };

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.75rem',
    minWidth: '200px',
    flex: 0.5,
    textAlign: 'left',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Other Details</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '123px', pr: '123px' }}>

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <b><h3>Property Ownership</h3></b>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RadioGroup
                  sx={{ fontSize: '0.7rem', gap: '123px' }}
                  row
                  onChange={handlePropertyOwnershipChange}
                  value={propertyOwnership}
                >
                  <FormControlLabel
                    value="own"
                    control={<Radio sx={{ padding: '2px' }} />}
                    label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>I own a property</Typography>}
                  />
                  <FormControlLabel
                    value="lease"
                    control={<Radio sx={{ padding: '2px' }} />}
                    label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>I lease some space</Typography>}
                  />
                </RadioGroup>
              </Box>
            </Typography>

            {propertyOwnership === 'lease' && (
              <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Box sx={{ flex: 0.5 }}>
                  <b><h3>Lease Period: </h3></b>
                </Box>
                <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tooltip title="Start date" placement='left' arrow>
                    <TextField
                      variant="outlined"
                      type="date"
                      name="leasePeriodStart"
                      value={leasePeriodStart}
                      onChange={(e) => setLeasePeriodStart(e.target.value)}
                      size="small"
                      sx={{
                        flex: 0.4,
                        fontSize: '0.7rem',
                        fontFamily: 'Nunito Sans, sans-serif',
                        '& .MuiInputBase-root': {
                          height: '40px',
                          padding: '0 6px',
                        },
                        '& input': {
                          padding: 0,
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.8rem',
                        },
                      }}
                    />
                  </Tooltip>
                  to
                  <Tooltip title="End date" placement='right' arrow>
                    <TextField
                      variant="outlined"
                      type="date"
                      name="leasePeriodEnd"
                      value={leasePeriodEnd}
                      onChange={(e) => setLeasePeriodEnd(e.target.value)}
                      size="small"
                      sx={{
                        paddingRight: '17px',
                        flex: 0.4,
                        fontSize: '0.7rem',
                        fontFamily: 'Nunito Sans, sans-serif',
                        '& .MuiInputBase-root': {
                          height: '40px',
                          padding: '0 6px',
                        },
                        '& input': {
                          padding: 0,
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.8rem',
                        },
                      }}
                    />
                  </Tooltip>
                </Box>
              </Typography>
            )}
          </Box>

          {propertyOwnership === 'own' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, mb: 3 }}>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Legal name of entity (LLC, LP, etc.):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="legalName"
                  placeholder='Enter legal name of entity'
                  value={ownerEntityDetails.legalName}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Organizational structure (e.g., single-purpose entity):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="organizationalStructure"
                  placeholder='Enter organizational structure'
                  value={ownerEntityDetails.organizationalStructure}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Ownership percentages:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="ownershipPercentages"
                  placeholder='Enter ownership percentages'
                  value={ownerEntityDetails.ownershipPercentages}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Property Type:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="propertyType"
                  placeholder='Enter property type (office, industrial, multifamily, retail, etc.)'
                  value={ownerEntityDetails.propertyType}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Property address and type (office, industrial, multifamily, retail, etc.):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="propertyType"
                  placeholder='Enter property address and type'
                  value={ownerEntityDetails.propertyType}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Year built:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="yearBuilt"
                  type='number'
                  placeholder='Enter year built'
                  value={ownerEntityDetails.yearBuilt}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Year last renovated:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="yearLastRenovated"
                  type='number'
                  placeholder='Enter year last renovated'
                  value={ownerEntityDetails.yearLastRenovated}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Square footage:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="squareFootage"
                  type='number'
                  placeholder='Enter square footage'
                  value={ownerEntityDetails.squareFootage}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Parcel ID or legal description (optional):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="parcelId"
                  placeholder='Enter parcel ID or legal description'
                  value={ownerEntityDetails.parcelId}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Current Occupancy Status: Yes or No</Typography>
                <Select
                  size="small"
                  variant="outlined"
                  name="currentOccupancyStatus"
                  value={ownerEntityDetails.currentOccupancyStatus || ''}
                  onChange={(e) =>
                  setOwnerEntityDetails(prev => ({
                    ...prev,
                    currentOccupancyStatus: e.target.value as string,
                  }))
                  }
                  sx={{
                  flex: 1,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  height: '40px',
                  '& .MuiInputBase-root': { padding: '0 6px' },
                  '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Yes/No</MenuItem>
                  <MenuItem value="Yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</MenuItem>
                  <MenuItem value="No" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>No</MenuItem>
                </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Leased or vacant:</Typography>
                <Select
                  size="small"
                  variant="outlined"
                  name="leasedOrVacant"
                  value={ownerEntityDetails.leasedOrVacant || ''}
                  onChange={(e) =>
                  setOwnerEntityDetails(prev => ({
                    ...prev,
                    leasedOrVacant: e.target.value as string,
                  }))
                  }
                  sx={{
                  flex: 1,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  height: '40px',
                  '& .MuiInputBase-root': { padding: '0 6px' },
                  '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Leased/Vacant</MenuItem>
                  <MenuItem value="Leased" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Leased</MenuItem>
                  <MenuItem value="Vacant" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Vacant</MenuItem>
                </Select>
                </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Occupancy rate (%):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="occupancyRate"
                  type='number'
                  placeholder='Enter occupancy rate'
                  value={ownerEntityDetails.occupancyRate}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={labelStyle}>Lease start and end dates:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="leaseStartDate"
                  type="date"
                  placeholder='Enter lease start date'
                  value={ownerEntityDetails.leaseStartEndDates}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
    sx={{
      flex: 0.47,
      fontSize: '0.7rem',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
    }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name="leaseEndDate"
                  type="date"
                  placeholder='Enter lease end date'
                  value={ownerEntityDetails.leaseStartEndDates}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
    sx={{
      flex: 0.49,
      fontSize: '0.7rem',
      fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
    }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Major tenants (anchor tenant status):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="majorTenants"
                  placeholder='Enter major tenants'
                  value={ownerEntityDetails.majorTenants}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Lease expiration schedule / rollover risk:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="leaseExpirationSchedule"
                  placeholder='Enter lease expiration schedule'
                  value={ownerEntityDetails.leaseExpirationSchedule}
                  onChange={handleOwnerEntityDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
            </Box>
          )}

          {propertyOwnership === 'own' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, mb: 3 }}>
              <Typography sx={sectionHeadingStyle}>
                <b>Financial Details & Documents</b>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Current estimated Loan-to-Value (LTV):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="estimatedLTV"
                  placeholder='Enter estimated LTV'
                  value={financialDetails.estimatedLTV}
                  onChange={handleFinancialDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Estimated appraised or market value:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="appraisedMarketValue"
                  value={financialDetails.appraisedMarketValue}
                  placeholder='Enter appraised or market value'
                  onChange={handleFinancialDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Debt Service Coverage Ratio, optional (DSCR):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="debtServiceCoverageRatio"
                  value={financialDetails.debtServiceCoverageRatio}
                  placeholder='Enter debt service coverage ratio'
                  onChange={handleFinancialDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Net Operating Income (NOI):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="capRate"
                  value={financialDetails.capRate}
                  placeholder='Enter net operating income'
                  onChange={handleFinancialDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Cap Rate:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="capRate"
                  value={financialDetails.capRate}
                  placeholder='Enter cap rate'
                  onChange={handleFinancialDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>
                  Are you willing to submit Pro Forma Financials if you intend to pursue a project?
                </Typography>
                <Select
                  size="small"
                  variant="outlined"
                  name="submitProFormaFinancials"
                  value={financialDetails.submitProFormaFinancials || ''}
                  onChange={(e) =>
                    setFinancialDetails(prev => ({
                      ...prev,
                      submitProFormaFinancials: e.target.value as string,
                    }))
                  }
                  sx={{
                    flex: 1,
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                    '& .MuiInputBase-root': { padding: '0 6px' },
                    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Yes/No
                  </MenuItem>
                  <MenuItem value="Yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="No" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    No
                  </MenuItem>
                </Select>
              </Box>
            </Box>
          )}

          {(propertyOwnership === 'own' || propertyOwnership === 'lease') && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, mb: 3 }}>
              <Typography sx={sectionHeadingStyle}>
                <b>Tenant Details:</b>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Lease terms (triple net, gross, etc.):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="leaseTerms"
                  value={tenantDetails.leaseTerms}
                  placeholder='Enter lease terms'
                  onChange={handleTenantDetailsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
            </Box>
          )}

          {propertyOwnership === 'lease' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, mb: 3 }}>
              <Typography sx={sectionHeadingStyle}>
                <b>Checklist for lease questions</b>
              </Typography>

              <Typography sx={{ ...sectionHeadingStyle, fontSize: '0.8rem', fontWeight: 'normal' }}>
                <b>Property & Parties</b>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Property Address:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="propertyAddress"
                  value={leaseQuestions.landlordLegalName}
                  placeholder='Enter property address'
                  onChange={handleLeaseQuestionsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Landlord Legal Name:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="landlordLegalName"
                  value={leaseQuestions.landlordLegalName}
                  onChange={handleLeaseQuestionsChange}
                  placeholder='Enter landlord legal name'
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Tenant Legal Name:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="tenantLegalName"
                  value={leaseQuestions.tenantLegalName}
                  placeholder='Enter tenant legal name'
                  onChange={handleLeaseQuestionsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Type of Property (Retail, Office, Industrial, etc.):</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="typeOfProperty"
                  value={leaseQuestions.typeOfProperty}
                  placeholder='Enter type of property'
                  onChange={handleLeaseQuestionsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>

              <Typography sx={{ ...sectionHeadingStyle, fontSize: '0.8rem', fontWeight: 'normal' }}>
                <b>Lease Term</b>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Lease Start Date:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  name="leaseStartDate"
                  value={leaseQuestions.leaseStartDate}
                  onChange={handleLeaseQuestionsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Lease End Date:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  name="leaseEndDate"
                  value={leaseQuestions.leaseEndDate}
                  onChange={handleLeaseQuestionsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Renewal Options (Yes/No):</Typography>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="renewalOptions"
                  value={leaseQuestions.renewalOptions || ''}
                  onChange={(e) =>
                    setLeaseQuestions(prev => ({
                      ...prev,
                      renewalOptions: e.target.value as string,
                    }))
                  }
                  sx={{
                    flex: 1,
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    height: '40px',
                    '& .MuiInputBase-root': { padding: '0 6px' },
                    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select Yes/No
                  </MenuItem>
                  <MenuItem value="Yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Yes
                  </MenuItem>
                  <MenuItem value="No" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    No
                  </MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Terms of Renewal:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="termsOfRenewal"
                  value={leaseQuestions.termsOfRenewal}
                  placeholder='Enter terms of renewal'
                  onChange={handleLeaseQuestionsChange}
                  size="small"
                  sx={commonInputStyle}
                />
              </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={labelStyle}>Early Termination Clause (Yes/No):</Typography>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="earlyTerminationClause"
                  value={leaseQuestions.earlyTerminationClause || ''}
                  onChange={(e) =>
                  setLeaseQuestions(prev => ({
                    ...prev,
                    earlyTerminationClause: e.target.value as string,
                  }))
                  }
                  sx={{
                  flex: 1,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  height: '40px',
                  '& .MuiInputBase-root': { padding: '0 6px' },
                  '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                  Select Yes/No
                  </MenuItem>
                  <MenuItem value="Yes" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                  Yes
                  </MenuItem>
                  <MenuItem value="No" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                  No
                  </MenuItem>
                </Select>
                </Box>

                <Typography sx={{ ...sectionHeadingStyle, fontSize: '0.8rem', fontWeight: 'normal' }}>
                  <b>Lease Structure</b>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '280px' }}>
                    Pick One:
                  </Typography>
                  <RadioGroup
                    row
                    name="leaseStructure"
                    value={leaseQuestions.leaseStructure}
                    onChange={handleLeaseQuestionsChange}
                    sx={{ fontSize: '0.7rem', gap: 2 }}
                  >
                    <FormControlLabel
                      value="Gross Lease"
                      control={<Radio sx={{ padding: '2px' }} />}
                      label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Gross Lease</Typography>}
                    />
                    <FormControlLabel
                      value="Modified Gross Lease"
                      control={<Radio sx={{ padding: '2px' }} />}
                      label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>{/* Modified */}Mod. Gross Lease</Typography>}
                    />
                    <FormControlLabel
                      value="Triple Net (NNN) Lease"
                      control={<Radio sx={{ padding: '2px' }} />}
                      label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>{/* Triple */}3x Net (NNN) Lease</Typography>}
                    />
                    <FormControlLabel
                      value="Percentage Lease (for retail)"
                      control={<Radio sx={{ padding: '2px' }} />}
                      label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>{/* Percentage */}%age Lease (for retail)</Typography>}
                    />
                  </RadioGroup>
                </Box>
            </Box>
          )}

          <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <b><h3>Long - Term Site Occupancy</h3></b>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
              <RadioGroup sx={{ fontSize: '0.7rem', gap: '119px' }} row onChange={handleLongTermOccupancyChange} value={longTermOccupancy}>
                <FormControlLabel
                  value="15-20 years plan"
                  control={<Radio sx={{ padding: '2px' }} />}
                  label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>15-20 years plan</Typography>}
                />
                <FormControlLabel
                  value="Short - Term plan"
                  control={<Radio sx={{ padding: '2px' }} />}
                  label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}>Short - Term plan</Typography>}
                />
              </RadioGroup>
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;