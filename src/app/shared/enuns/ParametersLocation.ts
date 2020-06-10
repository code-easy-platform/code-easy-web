export enum ParametersLocation {
    query="Query",
    body="Body",
    url="Url",    
}

export const ParametersLocationList: ParametersLocation[] = [
    ParametersLocation.query,
    ParametersLocation.body,
    ParametersLocation.url,
]
