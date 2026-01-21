import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Tooltip,
  Autocomplete,
  Paper,
} from "@mui/material";
// import { useOrganizationDetails } from "../../../Context/Organizational Profile/SubStep2/Organization Details Context";
import { useDispatch, useSelector } from "react-redux";
import { updateOrganizationDetails } from "../../../../store/slices/organizationDetailsSlice";
import {
  companyOptions,
  industries,
  irsCategories,
  organizationTypes,
} from "../../../../types/app.constants";
const SubStep2: React.FC = () => {
  const dispatch = useDispatch();
  const {
    organizationName,
    userName,
    userEmail,
    userTitle,
    organizationType,
    industry,
    irsCategory,
    employeeCount,
  } = useSelector((state: any) => state.organizationDetails);
  // const { organizationDetailsState, updateOrganizationDetails } =
  //   useOrganizationDetails();

  const handleEmployeeCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(rawValue)) return; // Allow only numbers
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    dispatch(updateOrganizationDetails({ employeeCount: formatted }));
    // updateOrganizationDetails({ employeeCount: formatted });
  };

  const handleInputChanges = (key: string, data: any) => {
    dispatch(
      updateOrganizationDetails({
        [key]: data,
      }),
    );
  };

  const [company, _setCompany] = useState<string | null>(null);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Nunito Sans, sans-serif",
        fontSize: "0.75rem",
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: "Nunito Sans, sans-serif",
          fontSize: "0.85rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <h2>Organization Details</h2>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.75rem",
                minWidth: "150px",
                flex: 0.25,
              }}
            >
              <b>Organization Name:</b>
            </Typography>
            <Tooltip
              title="Enter the name of your organization"
              placement="top-end"
              arrow
            >
              <Autocomplete
                options={["Select your Organization Name", ...companyOptions]}
                getOptionDisabled={(option) =>
                  option === "Select your Organization Name"
                }
                value={organizationName || null} // Read value from context
                onChange={(_event: any, newValue: string | null) => {
                  // updateOrganizationDetails({
                  //   organizationName: newValue || "",
                  // }); // Update context
                  handleInputChanges("organizationName", newValue || "");
                }}
                disableClearable={company === "Select your Organization Name"}
                noOptionsText="No options available"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontFamily: "Nunito Sans, sans-serif",
                        paddingLeft: 2,
                        fontSize: "0.7rem",
                      },
                      "& .MuiInputBase-root": {
                        fontFamily: "Nunito Sans, sans-serif",
                        fontSize: "0.7rem",
                        height: "40px",
                        padding: "0 2px",
                      },
                    }}
                  />
                )}
                ListboxProps={{
                  sx: {
                    maxHeight: "200px",
                    fontFamily: "Nunito Sans, sans-serif",
                    fontSize: "0.7rem",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    borderRadius: "4px",
                    padding: "4px 0",
                  },
                }}
                PaperComponent={({ children }) => (
                  <Paper
                    sx={{
                      fontFamily: "Nunito Sans, sans-serif",
                      fontSize: "0.7rem",
                      padding: "4px 0",
                      textAlign: "center",
                    }}
                  >
                    {children}
                  </Paper>
                )}
                sx={{
                  flex: 0.498,
                  minWidth: "414px",
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.7rem",
                  "& .MuiAutocomplete-input": {
                    padding: "4px 6px",
                    fontSize: "0.7rem",
                  },
                }}
              />
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.75rem",
                minWidth: "150px",
                flex: 0.25,
              }}
            >
              <b>Name of the User:</b>
            </Typography>
            <Tooltip title="Enter your name" placement="top-end" arrow>
              <TextField
                fullWidth
                placeholder="Enter your name"
                variant="outlined"
                size="small"
                type="text"
                value={userName} // Read value from context
                onChange={(e) =>
                  // updateOrganizationDetails({ userName: e.target.value })
                  {
                    handleInputChanges("userName", e.target.value);
                  }
                }
                sx={{
                  flex: 0.5,
                  fontSize: "0.7rem",
                  fontFamily: "Nunito Sans, sans-serif",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& input": {
                    padding: 0,
                    fontFamily: "Nunito Sans, sans-serif",
                    fontSize: "0.8rem",
                  },
                }}
              />
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.75rem",
                minWidth: "150px",
                flex: 0.25,
              }}
            >
              <b>Email Address of the User:</b>
            </Typography>
            <Tooltip title="Enter your email address" placement="top-end" arrow>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                variant="outlined"
                size="small"
                type="email"
                value={userEmail} // Read value from context
                onChange={(e) =>
                  // updateOrganizationDetails({ userEmail: e.target.value })
                  {
                    handleInputChanges("userEmail", e.target.value);
                  }
                }
                sx={{
                  flex: 0.5,
                  fontSize: "0.7rem",
                  fontFamily: "Nunito Sans, sans-serif",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& input": {
                    padding: 0,
                    fontFamily: "Nunito Sans, sans-serif",
                    fontSize: "0.8rem",
                  },
                }}
              />
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.75rem",
                minWidth: "150px",
                flex: 0.25,
              }}
            >
              <b>Title of the User:</b>
            </Typography>
            <Tooltip title="Enter your title" placement="top-end" arrow>
              <TextField
                fullWidth
                placeholder="Enter your title"
                variant="outlined"
                size="small"
                type="text"
                value={userTitle} // Read value from context
                onChange={(e) =>
                  // updateOrganizationDetails({ userTitle: e.target.value })
                  {
                    handleInputChanges("userTitle", e.target.value);
                  }
                }
                sx={{
                  flex: 0.5,
                  fontSize: "0.7rem",
                  fontFamily: "Nunito Sans, sans-serif",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& input": {
                    padding: 0,
                    fontFamily: "Nunito Sans, sans-serif",
                    fontSize: "0.8rem",
                  },
                }}
              />
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.75rem",
                minWidth: "150px",
                flex: 0.25,
              }}
            >
              <b>Organization Type:</b>
            </Typography>
            <Tooltip
              title="Select the type of your organization"
              placement="top-end"
              arrow
            >
              <Select
                fullWidth
                size="small"
                variant="outlined"
                value={organizationType || "default"} // Read from context, provide default for placeholder
                onChange={(e) =>
                  // updateOrganizationDetails({
                  //   organizationType: e.target.value,
                  //   })
                  {
                    handleInputChanges("organizationType", e.target.value);
                  }
                }
                defaultValue="Option 1"
                sx={{
                  flex: 0.498,
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.7rem",
                  minWidth: "414px",
                  pl: "1px",
                  pr: "1px",
                  height: "40px",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& .MuiSelect-select": {
                    padding: "4px 6px",
                    fontSize: "0.7rem",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "200px",
                      "& .MuiMenuItem-root": {
                        fontFamily: "Nunito Sans, sans-serif",
                        fontSize: "0.7rem",
                      },
                      "&::-webkit-scrollbar": { display: "none" },
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    },
                  },
                }}
              >
                {organizationTypes.map((item) => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled || false}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.75rem",
                minWidth: "150px",
                flex: 0.25,
              }}
            >
              <b>Industry Selection:</b>
            </Typography>
            <Tooltip
              title="Select the industry your organization belongs to"
              placement="top-end"
              arrow
            >
              <Select
                fullWidth
                size="small"
                variant="outlined"
                value={industry || "default"} // Read from context
                onChange={(e) =>
                  // updateOrganizationDetails({ industry: e.target.value })
                  {
                    handleInputChanges("industry", e.target.value);
                  }
                }
                defaultValue="Option 1"
                sx={{
                  flex: 0.498,
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.7rem",
                  minWidth: "414px",
                  pl: "1px",
                  pr: "1px",
                  height: "40px",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& .MuiSelect-select": {
                    padding: "4px 6px",
                    fontSize: "0.7rem",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "200px",
                      "& .MuiMenuItem-root": {
                        fontFamily: "Nunito Sans, sans-serif",
                        fontSize: "0.7rem",
                      },
                      "&::-webkit-scrollbar": { display: "none" },
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    },
                  },
                }}
              >
                {industries.map((item) => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled || false}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Tooltip
              title="EmissionCheckIQ+ collects this information to properly apply any tax or incentives that might be available to your organization"
              placement="left"
              arrow
            >
              <Typography
                sx={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.75rem",
                  minWidth: "150px",
                  flex: 0.25,
                }}
              >
                <b>IRS Category:</b>
              </Typography>
            </Tooltip>
            <Tooltip
              title="IRS (Internal Revenue Service) Category of your organization"
              placement="top-end"
              arrow
            >
              <Select
                fullWidth
                size="small"
                variant="outlined"
                value={irsCategory || "default"} // Read from context
                onChange={(e) =>
                  // updateOrganizationDetails({ irsCategory: e.target.value })
                  handleInputChanges("irsCategory", e.target.value)
                }
                defaultValue="Option 1"
                sx={{
                  flex: 0.498,
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.7rem",
                  minWidth: "414px",
                  pl: "1px",
                  pr: "1px",
                  height: "40px",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& .MuiSelect-select": {
                    padding: "4px 6px",
                    fontSize: "0.7rem",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "200px",
                      "& .MuiMenuItem-root": {
                        fontFamily: "Nunito Sans, sans-serif",
                        fontSize: "0.7rem",
                      },
                      "&::-webkit-scrollbar": { display: "none" },
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    },
                  },
                }}
              >
                {irsCategories.map((item) => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled || false}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Tooltip
              title="It is important to configure the DER solution with the number of employees in mind. Employees and the hours they work impact how much energy is used and when."
              placement="bottom"
              arrow
            >
              <Typography
                sx={{
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.75rem",
                  minWidth: "150px",
                  flex: 0.25,
                }}
              >
                <b>Number of Employees at Facility:</b>
              </Typography>
            </Tooltip>
            <Tooltip
              title="Enter the number of employees at your facility"
              placement="top-end"
              arrow
            >
              <TextField
                fullWidth
                placeholder="Enter the number of employees at your facility"
                variant="outlined"
                size="small"
                value={employeeCount} // Read from context
                onChange={handleEmployeeCountChange}
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9,]*",
                }}
                // onChange={(e) => {
                //   const rawValue = e.target.value.replace(/,/g, '');
                //   if (!/^\d*$/.test(rawValue)) return;
                //   const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                //   e.target.value = formatted;
                // }}
                sx={{
                  flex: 0.5,
                  fontSize: "0.7rem",
                  fontFamily: "Nunito Sans, sans-serif",
                  "& .MuiInputBase-root": { height: "40px", padding: "0 6px" },
                  "& input": {
                    padding: 0,
                    fontFamily: "Nunito Sans, sans-serif",
                    fontSize: "0.8rem",
                  },
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
