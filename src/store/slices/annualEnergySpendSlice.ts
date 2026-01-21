import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setOnLocalStorage } from "../../services/utils";

interface IAnnualEnergySpend {
  electricity: string;
  naturalGas: string;
  water: string;
  oil: string;
  propane: string;
  steam: string;
  chilledWater: string;
  other: string;
  otherLabel: string;
}

const savedDetails = getFromLocalStorage("annualEnergySpend");
const initialState: IAnnualEnergySpend = savedDetails
  ? savedDetails
  : {
      electricity: "",
      naturalGas: "",
      water: "",
      oil: "",
      propane: "",
      steam: "",
      chilledWater: "",
      other: "",
      otherLabel: "",
    };

const annualEnergySpendSlice = createSlice({
  name: "annualEnergySpend",
  initialState,
  reducers: {
    addAnnualEnergySpend: (state, { payload }) => {
      state = payload;
    },
    updateAnnualEnergySpend: (state, { payload }) => {
      setOnLocalStorage("annualEnergySpend", { ...state, ...payload });
      return (state = {
        ...state,
        ...payload,
      });
    },
  },
});

export const { addAnnualEnergySpend, updateAnnualEnergySpend } =
  annualEnergySpendSlice.actions;

export default annualEnergySpendSlice.reducer;
