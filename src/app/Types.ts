export interface ContractType {
    start: number | null;
    end: number | null;
    increasedDate: number | null;
    decreasedDate: number | null;
    premium: number,
    active: Array<boolean>;
    egwp: Array<number>;
    agwp: Array<number>;
};

export interface ContractListType {
    [index: string]: ContractType
};

export interface ReportItemType {
    contracts: Array<number>;
    agwp: Array<number>;
    egwp: Array<number>;
};

export interface TablePropsType {
    TableData: ReportItemType
};


export interface ContractCreatedEventType {
    name: string;
    contractId: string;
    premium: number;
    startDate: string;
}

export interface PriceIncreasedEventType {
    name: string;
    contractId: string;
    premiumIncrease: number;
    atDate: string;
}

export interface PriceDecreasedEventType {
    name: string;
    contractId: string;
    premiumReduction: number;
    atDate: string;
}

export interface ContractTerminatedEventType {
    name: string;
    contractId: string;
    terminationDate: string;
}