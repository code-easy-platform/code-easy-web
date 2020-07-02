/**
 * Respresenta que tipo é o projeto que está sendo desenvolvido.
 * 
 * EX: "API", "WEB" ou "MOBILE".
 */
export enum ProjectType {
    api = "API",
    web = "WEB",
    mobile = "MOBILE",
}

/** Lista de tipos, pode ser usada para listagens */
export const ProjectTypeList: { name: string, type: ProjectType }[] = [
    {
        name: 'Api',
        type: ProjectType.api
    },
    /* {
        name: 'Web',
        type: ProjectType.web
    },
    {
        name: 'Mobile',
        type: ProjectType.mobile
    }, */
];
