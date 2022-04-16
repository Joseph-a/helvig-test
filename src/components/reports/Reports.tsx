import React, { useState, useEffect } from 'react';
import { ReportTable } from './ReportTable'
import { useAppSelector } from '../../app/hooks';
import { selectContracts, selectTaskType } from '../../containers/appSlice';

const initialYearArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const Reports = () => {
    const contracts = useAppSelector(selectContracts),
        taskType = useAppSelector(selectTaskType),
        [contractsList, setContractsList] = useState(initialYearArray),
        [egwp, setEgwp] = useState(initialYearArray),
        [agwp, setAgwp] = useState(initialYearArray);

    const prepareFinalReport = () => {
        const contractListArray = Object.values(contracts);

        for (let i = 0; i < contractListArray.length; i++) {
            const contract: any = contractListArray[i];

            for (let j = 0; j < 12; j++) {
                // updating contract
                if (contract.active[j]) {
                    setContractsList((old: number[]) => {
                        let newContractList = [...old];
                        newContractList[j] += 1;
                        return newContractList;
                    });

                }
                // updating eqwp
                if (contract.egwp[j] > 0) {
                    setEgwp((old: number[]) => {
                        let newEgwp = [...old];
                        newEgwp[j] += contract.egwp[j];
                        return newEgwp;
                    });
                }

                // updating aqwp
                if (contract.agwp[j] > 0) {
                    setAgwp((old: number[]) => {
                        let newAgwp = [...old];
                        newAgwp[j] += contract.agwp[j];
                        return newAgwp;
                    });
                }
            }

        }
    };

    const resetStates = () => {
        setContractsList(initialYearArray);
        setEgwp(initialYearArray);
        setAgwp(initialYearArray);
    }

    useEffect(() => {
        resetStates();
        contracts && prepareFinalReport();

    }, [contracts, taskType])

    return (
        <>
            <ReportTable TableData={{
                contracts: contractsList,
                egwp,
                agwp
            }} />
        </>
    )
}
