import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setOnLocalStorage } from "../../services/utils";

interface IOrganizationDetails {
  organizationName: string;
  userName: string;
  userEmail: string;
  userTitle: string;
  organizationType: string;
  industry: string;
  irsCategory: string;
  employeeCount: string;
}

const savedDetails = getFromLocalStorage("organizationDetailsState");
const initialState: IOrganizationDetails = savedDetails
  ? savedDetails
  : {
      organizationName: "",
      userName: "",
      userEmail: "",
      userTitle: "",
      organizationType: "",
      industry: "",
      irsCategory: "",
      employeeCount: "",
    };

const organizationDetailsSlice = createSlice({
  name: "organizationDetails",
  initialState,
  reducers: {
    addOrganizationDetails: (state, { payload }) => {
      state = payload;
    },
    updateOrganizationDetails: (state, { payload }) => {
      setOnLocalStorage("organizationDetailsState", { ...state, ...payload });
      return (state = {
        ...state,
        ...payload,
      });
    },
  },
});

export const { addOrganizationDetails, updateOrganizationDetails } =
  organizationDetailsSlice.actions;

export default organizationDetailsSlice.reducer;
