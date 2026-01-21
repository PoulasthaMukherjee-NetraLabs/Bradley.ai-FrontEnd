import { configureStore } from "@reduxjs/toolkit";
import organizationDetailsReducer from "./slices/organizationDetailsSlice";
import annualEnergySpendReducer from "./slices/annualEnergySpendSlice";
import facilityOperationDescriptionReducer from "./slices/facilityOperationDescriptionSlice";

export const store = configureStore({
  reducer: {
    organizationDetails: organizationDetailsReducer,
    annualEnergySpend: annualEnergySpendReducer,
    facilityOperationDescription: facilityOperationDescriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
