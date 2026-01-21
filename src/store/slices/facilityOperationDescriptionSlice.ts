import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setOnLocalStorage } from "../../services/utils";

interface IFacilityOperationDescription {
  checked: {
    twoPipeSystem: boolean;
    fourPipeSystem: boolean;
    autoLightSensors: boolean;
    waterTreatment: boolean;
    setbackTemperature: boolean;
    freeCooling: boolean;
  };
  description: {
    twoPipeSystem: string;
    fourPipeSystem: string;
    autoLightSensors: string;
    waterTreatment: string[];
    freeCooling: string;
  };
  operationalHours: {
    startUpTime: string;
    setBackTime: string;
  };
  typicalHours: {
    startUpTime: string;
    setBackTime: string;
  };
  setbackTemperature: {
    summer: string;
    winter: string;
  };
  facilityTenantTemperature: string;
}

const savedDetails = getFromLocalStorage("facilityOperationState");
const initialState: IFacilityOperationDescription = savedDetails
  ? savedDetails
  : {
      checked: {
        twoPipeSystem: false,
        fourPipeSystem: false,
        autoLightSensors: false,
        waterTreatment: false,
        setbackTemperature: false,
        freeCooling: false,
      },
      description: {
        twoPipeSystem: "",
        fourPipeSystem: "",
        autoLightSensors: "",
        waterTreatment: [],
        freeCooling: "",
      },
      operationalHours: {
        startUpTime: "",
        setBackTime: "",
      },
      typicalHours: {
        startUpTime: "",
        setBackTime: "",
      },
      setbackTemperature: {
        summer: "",
        winter: "",
      },
      facilityTenantTemperature: "",
    };

const facilityOperationDescriptionSlice = createSlice({
  name: "facilityOperationDescription",
  initialState,
  reducers: {
    addFacilityOperationDescription: (state, { payload }) => {
      state = payload;
    },
    updateFacilityOperationDescription: (state, { payload }) => {
      setOnLocalStorage("facilityOperationState", { ...state, ...payload });
      return (state = {
        ...state,
        ...payload,
      });
    },
  },
});

export const {
  addFacilityOperationDescription,
  updateFacilityOperationDescription,
} = facilityOperationDescriptionSlice.actions;

export default facilityOperationDescriptionSlice.reducer;
