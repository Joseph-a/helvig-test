import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ContractListType } from '../app/Types';
import EventData from "../app/data.json";


export interface appState {
    value: Object;
    taskType: number
}

const initialState: appState = {
    value: {},
    taskType: 1
};

export const dataProcessor = createAsyncThunk(
    'contract/report',
    async (arg, { getState }) => {
        const state: any = getState();
        const { taskType } = state.contracts;
        let contractList = {} as ContractListType;

        for (let i = 0; i < EventData.length; i++) {
            const event = EventData[i];

            if (event.name === 'ContractCreatedEvent') {
                const startDate = event.startDate ? new Date(event.startDate) : null,
                    startMonth = startDate?.getMonth() || 0,
                    premuimValue = event.premium || 0;

                let activeArray = [false, false, false, false, false, false, false, false, false, false, false, false],
                    egwpArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    agwpArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                agwpArray[startMonth] = 12 * premuimValue;

                let newContract = {
                    start: startMonth + 1,
                    premium: premuimValue,
                    end: null,
                    increasedDate: null,
                    decreasedDate: null,
                    active: activeArray.fill(true, startMonth),
                    egwp: egwpArray.fill(premuimValue, startMonth),
                    agwp: agwpArray
                };

                contractList[event.contractId] = newContract;

            } else if (event.name === 'ContractTerminatedEvent') {
                const { start, active, egwp, agwp, premium } = contractList[event.contractId],
                    endDate = event.terminationDate ? new Date(event.terminationDate) : null,
                    endMonth = endDate?.getMonth() || 0,
                    duration = (endMonth - (start || 0)) + 1,
                    paidPremium = duration * premium;

                let agwpArrayTerminated = [...agwp];
                if (endMonth !== 11) {
                    agwpArrayTerminated[endMonth + 1] = paidPremium - (premium * 12);
                }


                const updatedContract = {
                    ...contractList[event.contractId],
                    ...{
                        end: endMonth + 1,
                        active: active.fill(false, endMonth + 1),
                        egwp: egwp.fill(0, endMonth + 1),
                        agwp: agwpArrayTerminated,
                    }
                };
                contractList[event.contractId] = updatedContract;
            } else if (event.name === 'PriceIncreasedEvent' && taskType === 2) {
                const { start, egwp, agwp, premium } = contractList[event.contractId],
                    increasedDate = event.atDate ? new Date(event.atDate) : null,
                    increasedMonth = increasedDate?.getMonth() || 0,
                    premuimValue = (premium + (event.premiumIncrease || 0)) || 0,
                    duration = (increasedMonth + 1) - (start || 0);

                const agwpValue = duration === 0 ? (12 * premuimValue) : (duration * (event.premiumIncrease || 0));
                let newAgwp = [...agwp];
                newAgwp[increasedMonth] = agwpValue;

                const updatedContract = {
                    ...contractList[event.contractId],
                    ...{
                        premium: premuimValue,
                        increasedDate: increasedMonth + 1,
                        egwp: egwp.fill(premuimValue, increasedMonth),
                        agwp: newAgwp,
                    }
                };
                contractList[event.contractId] = updatedContract;

            } else if (event.name === 'PriceDecreasedEvent' && taskType === 2) {
                const { start, egwp, agwp, premium } = contractList[event.contractId],
                    decreasedDate = event.atDate ? new Date(event.atDate) : null,
                    decreasedMonth = decreasedDate?.getMonth() || 0,
                    premuimValue = (premium - (event.premiumReduction || 0)) || 0,
                    duration = (decreasedMonth + 1) - (start || 0);

                const agwpValue = duration === 0 ? (12 * premuimValue) : (duration * (event.premiumIncrease || 0));

                let newAgwp = [...agwp];
                newAgwp[decreasedMonth] = agwpValue;

                const updatedContract = {
                    ...contractList[event.contractId],
                    ...{
                        premium: premuimValue,
                        decreasedDate: decreasedMonth + 1,
                        egwp: egwp.fill(premuimValue, decreasedMonth),
                        agwp: newAgwp,
                    }
                };
                contractList[event.contractId] = updatedContract;
            }
        }

        console.log(contractList);


        return contractList;
    }
);

export const appSlice = createSlice({
    name: 'app',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTaskType: (state, action: PayloadAction<number>) => {
            state.taskType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataProcessor.pending, (state) => {
                // state.status = 'loading';
            })
            .addCase(dataProcessor.fulfilled, (state, action) => {
                state.value = action.payload;
            });
    },
});

export const { setTaskType } = appSlice.actions;

export const selectContracts = (state: RootState) => state.contracts.value;
export const selectTaskType = (state: RootState) => state.contracts.taskType;

export default appSlice.reducer;
