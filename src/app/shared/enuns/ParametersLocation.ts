export enum ParametersLocation {
    header="Header",
    query="Query",    
    route="Route",    
    body="Body",
}

export const ParametersLocationList: ParametersLocation[] = [
    ParametersLocation.header,
    ParametersLocation.body,
    ParametersLocation.query,
    ParametersLocation.route,
];
