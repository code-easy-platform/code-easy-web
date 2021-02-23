import { IconAction, IconRouter, Utils } from "code-easy-components";
import { observe, set } from "react-observing";

import { TabAction/* Have circular dependênce with ProjectParse */, TabRoute } from "../tabs";
import { ETabType, PropertieTypes, EProjectType, EComponentType, ParametersLocation } from "../../../enuns";
import { FlowToJs, ProjectsStorage, toCamelCase, toKebabCase, toPascalCase } from "../../../services";
import { EItemType, IProperty, TypeOfValues } from "../../../components/external";
import { IApiProject, IFileToDownloadAsZip, ITab } from "../../../interfaces";
import { Project, ProjectParser, TreeItemComponent } from "./../generic";

/**
 * When you already have properties
 */
interface IConstructor {
    properties: IProperty[];
    tabs?: ITab[];
    id?: string;
}
export class ApiProject extends Project implements IApiProject {

    /** Empty project */
    constructor();
    /** Return a project from some properties */
    constructor(props: IConstructor);
    /** Criating a new project */
    constructor(props?: IConstructor) {
        super({
            id: props?.id,
            type: EProjectType.api,
            tabs: props?.tabs || [],
            properties: props?.properties || [
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    value: observe(`${process.env.REACT_APP_VERSION}`),
                    name: observe(PropertieTypes.createdInPlatformVersion),
                    propertieType: observe(PropertieTypes.createdInPlatformVersion),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    value: observe(`${process.env.REACT_APP_VERSION}`),
                    name: observe(PropertieTypes.currentPlatformVersion),
                    propertieType: observe(PropertieTypes.currentPlatformVersion),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.string),
                    name: observe(PropertieTypes.author),
                    propertieType: observe(PropertieTypes.author),
                    value: observe(ProjectsStorage.getAuthorName()),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe('0.0.1'),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.number),
                    name: observe(PropertieTypes.version),
                    propertieType: observe(PropertieTypes.version),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(new Date()),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    name: observe(PropertieTypes.createdDate),
                    propertieType: observe(PropertieTypes.createdDate),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(new Date()),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.viewOnly),
                    name: observe(PropertieTypes.updatedDate),
                    propertieType: observe(PropertieTypes.updatedDate),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(''),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.bigstring),
                    name: observe(PropertieTypes.description),
                    propertieType: observe(PropertieTypes.description),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
                {
                    value: observe(''),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.string),
                    name: observe(PropertieTypes.label),
                    propertieType: observe(PropertieTypes.label),

                    group: observe(undefined),
                    suggestions: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    valueHasError: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
            ],
        });

        set(this.tabs, oldTabs => oldTabs.map(tab => {
            if (tab.type.value === ETabType.tabRoutes) {
                return new TabRoute(this, {
                    id: tab.id.value,
                    items: tab.items.value,
                    properties: tab.properties.value,
                });
            } else {
                return new TabAction(this, {
                    id: tab.id.value,
                    items: tab.items.value,
                    properties: tab.properties.value,
                });
            }
        }));
    }

    /** Return a full project */
    public static newProject(name: string, version: string, description: string) {
        const newProject = new ApiProject();

        set(newProject.label, name);
        set(newProject.version, version);
        set(newProject.description, description);
        set(newProject.tabs, [
            new TabRoute(newProject, {
                properties: [
                    {
                        value: observe(false),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.hidden),
                        name: observe(PropertieTypes.isSelected),
                        propertieType: observe(PropertieTypes.isSelected),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe(true),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.hidden),
                        name: observe(PropertieTypes.isExpanded),
                        propertieType: observe(PropertieTypes.isExpanded),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe(true),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.hidden),
                        name: observe(PropertieTypes.isEditing),
                        propertieType: observe(PropertieTypes.isEditing),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        id: observe(Utils.getUUID()),
                        value: observe(ETabType.tabRoutes),
                        type: observe(TypeOfValues.bigstring),
                        name: observe(PropertieTypes.description),
                        propertieType: observe(PropertieTypes.description),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe("Routes"),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.string),
                        name: observe(PropertieTypes.label),
                        propertieType: observe(PropertieTypes.label),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe(IconRouter),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.binary),
                        name: observe(PropertieTypes.icon),
                        propertieType: observe(PropertieTypes.icon),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                ]
            }),
            new TabAction(newProject, {
                properties: [
                    {
                        value: observe(false),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.hidden),
                        name: observe(PropertieTypes.isSelected),
                        propertieType: observe(PropertieTypes.isSelected),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe(false),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.hidden),
                        name: observe(PropertieTypes.isExpanded),
                        propertieType: observe(PropertieTypes.isExpanded),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe(false),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.hidden),
                        name: observe(PropertieTypes.isEditing),
                        propertieType: observe(PropertieTypes.isEditing),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        id: observe(Utils.getUUID()),
                        value: observe(ETabType.tabActions),
                        type: observe(TypeOfValues.bigstring),
                        name: observe(PropertieTypes.description),
                        propertieType: observe(PropertieTypes.description),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe("Actions"),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.string),
                        name: observe(PropertieTypes.label),
                        propertieType: observe(PropertieTypes.label),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                    {
                        value: observe(IconAction),
                        id: observe(Utils.getUUID()),
                        type: observe(TypeOfValues.binary),
                        name: observe(PropertieTypes.icon),
                        propertieType: observe(PropertieTypes.icon),

                        group: observe(undefined),
                        suggestions: observe(undefined),
                        information: observe(undefined),
                        fileMaxSize: observe(undefined),
                        nameHasError: observe(undefined),
                        focusOnRender: observe(undefined),
                        valueHasError: observe(undefined),
                        nameHasWarning: observe(undefined),
                        valueHasWarning: observe(undefined),
                        nameSuggestions: observe(undefined),
                        editNameDisabled: observe(undefined),
                        onPickerNameClick: observe(undefined),
                        editValueDisabled: observe(undefined),
                        onPickerValueClick: observe(undefined),
                    },
                ]
            }),
        ]);

        return newProject;
    }

    public async exportAsFiles(): Promise<IFileToDownloadAsZip> {
        const getPackageJson = (): string => {
            const result = {
                private: true,
                repository: '',
                main: 'server.js',
                name: this.name.value,
                author: this.author.value,
                version: this.version.value,
                description: this.description.value,
                scripts: {
                    dev: 'node ./server.js',
                },
                dependencies: {
                    express: "^4.17.1",
                },
            };
            return JSON.stringify(result, null, 2);
        };

        /**
         * Built the base app
         */
        const getServer = (): string => {
            return [
                'const express = require(\'express\');',
                '',
                'const routers = require(\'./Routes\');',
                '',
                'const server = express();',
                'server.use(express.json());',
                '',
                'server.use(routers);',
                '',
                'server.listen(process.env.PORT || 3333);',
                '',
                `console.log(\`Server is running in port: \${process.env.PORT || 3333}...\`);`,
                '',
            ].join('\n');
        };

        /**
         * Define url methods
         */
        const getServerRoutes = (): string => {

            const getRoutesImports = (): string[] => {
                const result: string[] = [];
                const routes = getRoutes();

                routes.forEach(route => {
                    result.push(`const ${toCamelCase(route.name)} = require('./src/routes/${route.name}');`);
                });

                return result;
            };

            const routeFile: string[] = [
                'const express = require(\'express\');',
                'const routers = express.Router();',
                '',
                ...getRoutesImports(),
                '',
            ];

            const allRoutes = this.tabs.value.flatMap(tab => tab.items.value).filter(item => item.type.value === EComponentType.routeExpose)

            allRoutes.forEach(route => {
                const methodType = route.properties.value.find(prop => prop.propertieType.value === PropertieTypes.httpMethod)?.value;
                const pathComplete = route.properties.value.find(prop => prop.propertieType.value === PropertieTypes.pathComplete)?.value;

                if (route.description.value) {
                    routeFile.push(`// ${route.description.value}`);
                }

                routeFile.push(`routers.${methodType?.value}('${pathComplete?.value}', ${toCamelCase(route.label.value)})`);
            });

            return [
                ...routeFile,
                '',
                'module.exports = routers;',
                '',
            ].join('\n');
        };

        /**
         * Build actions used by controllers
         */
        const getActions = (): IFileToDownloadAsZip[] => {
            const allItems = this.tabs.value.flatMap(tab => tab.items.value);
            const allActionItems = allItems.filter(item => item.type.value === EComponentType.globalAction);

            const getActionFunction = (bodyFunction: string, treeItem: TreeItemComponent) => {

                const allImports = treeItem.items.value.map(flowItem => {
                    if (flowItem.type.value === EItemType.ACTION) {
                        const actionProp = flowItem.properties.value.find(prop => prop.propertieType.value === PropertieTypes.action)
                        return actionProp;
                    } else {
                        return undefined;
                    }
                });

                const allOutputParamItems = allItems.filter(item => item.type.value === EComponentType.outputVariable && item.ascendantId.value === treeItem.id.value);
                const allInputParamItems = allItems.filter(item => item.type.value === EComponentType.inputVariable && item.ascendantId.value === treeItem.id.value);
                const allLocalParamItems = allItems.filter(item => item.type.value === EComponentType.localVariable && item.ascendantId.value === treeItem.id.value);

                return [
                    allImports.map(actionToImport => actionToImport ? `const ${toCamelCase(actionToImport?.value.value)} = require('./${toPascalCase(actionToImport?.value.value)}');\n` : '').join(''),
                    '',
                    '/**',
                    ` *  ${treeItem.description.value}`,
                    ' */',
                    `const ${toCamelCase(treeItem.label.value)} = (${allInputParamItems.map(param => toCamelCase(param.name.value)).join(', ')}) => {`,
                    ...allOutputParamItems.map(param => `  /** ${param.description.value} */\n  let ${toCamelCase(param.name.value)};`),
                    ...allLocalParamItems.map(param => `  /** ${param.description.value} */\n  let ${toCamelCase(param.name.value)};`),
                    '',
                    bodyFunction,
                    '',
                    '  return {',
                    ...allOutputParamItems.map(param => `    ${toCamelCase(param.name.value)},`),
                    '  };',
                    '}',
                    '',
                    `module.exports = ${toCamelCase(treeItem.label.value)};`,
                    '',
                ].join('\n');
            };

            return allActionItems.map(treeItem => ({
                content: getActionFunction(FlowToJs(treeItem.items.value, 2), treeItem),
                isFolder: treeItem.type.value === EComponentType.grouper,
                name: toPascalCase(treeItem.label.value),
                type: 'js',
            }));
        };

        /**
         * Build actions used by controllers
         */
        const getRoutes = (): IFileToDownloadAsZip[] => {
            const allItems = this.tabs.value.flatMap(tab => tab.items.value);
            const allRouteItems = allItems.filter(item => item.type.value === EComponentType.routeExpose);

            const getRouteFunction = (bodyFunction: string, treeItem: TreeItemComponent) => {

                const allImports = treeItem.items.value.map(flowItem => {
                    if (flowItem.type.value === EItemType.ACTION) {
                        const actionProp = flowItem.properties.value.find(prop => prop.propertieType.value === PropertieTypes.action)
                        return actionProp;
                    } else {
                        return undefined;
                    }
                });

                const receiveParamIn = (param: TreeItemComponent): 'query' | 'header' | 'body' | 'params' => {
                    const receiveParamIn = param.properties.value.find(prop => prop.propertieType.value === PropertieTypes.parametersIn);
                    if (!receiveParamIn) return 'query';

                    switch (receiveParamIn.value.value) {
                        case ParametersLocation.body:
                            return 'body'
                        case ParametersLocation.header:
                            return 'header'
                        case ParametersLocation.query:
                            return 'query'
                        case ParametersLocation.route:
                            return 'params'

                        default: return 'query';
                    }
                }

                const allOutputParamItems = allItems.filter(item => item.type.value === EComponentType.outputVariable && item.ascendantId.value === treeItem.id.value);
                const allInputParamItems = allItems.filter(item => item.type.value === EComponentType.inputVariable && item.ascendantId.value === treeItem.id.value);
                const allLocalParamItems = allItems.filter(item => item.type.value === EComponentType.localVariable && item.ascendantId.value === treeItem.id.value);

                return [
                    allImports.map(actionToImport => actionToImport ? `const ${toCamelCase(actionToImport?.value.value)} = require('./../actions/${toPascalCase(actionToImport?.value.value)}');\n` : '').join(''),
                    '',
                    '/**',
                    ` *  ${treeItem.description.value}`,
                    ' */',
                    `const ${toCamelCase(treeItem.label.value)} = (req, res) => {`,
                    ...allInputParamItems.map(param => `  /** ${param.description.value} */\n  let ${toCamelCase(param.name.value)} = req.${receiveParamIn(param)}.${toPascalCase(param.name.value)};`),
                    '',
                    ...allOutputParamItems.map(param => `  /** ${param.description.value} */\n  let ${toCamelCase(param.name.value)};`),
                    ...allLocalParamItems.map(param => `  /** ${param.description.value} */\n  let ${toCamelCase(param.name.value)};`),
                    '',
                    bodyFunction,
                    '',
                    '  res.json({',
                    ...allOutputParamItems.map(param => `    ${toCamelCase(param.name.value)},`),
                    '  });',
                    '',
                    '}',
                    '',
                    `module.exports = ${toCamelCase(treeItem.label.value)};`,
                    '',
                ].join('\n');
            };

            return allRouteItems.map(treeItem => ({
                content: getRouteFunction(FlowToJs(treeItem.items.value, 2), treeItem),
                isFolder: treeItem.type.value === EComponentType.grouper,
                name: toPascalCase(treeItem.label.value),
                type: 'js',
            }));
        };

        const getIntegrations = (): IFileToDownloadAsZip[] => {
            const allItems = this.tabs.value.flatMap(tab => tab.items.value);
            const allRouteItems = allItems.filter(item => item.type.value === EComponentType.routeConsume);

            const getRouteFunction = (bodyFunction: string, treeItem: TreeItemComponent) => {
                const allInputParamItems = allItems.filter(item => item.type.value === EComponentType.inputVariable && item.ascendantId.value === treeItem.id.value);


                return [
                    '/**',
                    ` *  ${treeItem.description.value}`,
                    ' */',
                    `const ${toCamelCase(treeItem.label.value)} = async (${allInputParamItems.map(param => toCamelCase(param.name.value)).join(', ')}) => {`,
                    '',
                    '}',
                    '',
                    `module.exports = ${toCamelCase(treeItem.label.value)};`,
                    '',
                ].join('\n');
            };

            return allRouteItems.map(treeItem => ({
                content: getRouteFunction(FlowToJs(treeItem.items.value, 2), treeItem),
                isFolder: treeItem.type.value === EComponentType.grouper,
                name: toPascalCase(treeItem.label.value),
                type: 'js',
            }));
        }

        const gatTabs = (): IFileToDownloadAsZip[] => {
            const result: IFileToDownloadAsZip[] = [];

            this.tabs.value.forEach(tab => {
                if (tab.type.value === ETabType.tabRoutes) {
                    result.push({
                        name: toKebabCase(tab.label.value),
                        isFolder: true,
                        children: [
                            ...getRoutes(),
                        ]
                    });
                    result.push({
                        name: toKebabCase('integrations'),
                        isFolder: true,
                        children: [
                            ...getIntegrations(),
                        ]
                    });
                } else {
                    result.push({
                        name: toKebabCase(tab.label.value),
                        isFolder: true,
                        children: [
                            ...getActions(),
                        ]
                    });
                }
            })

            return result;
        }

        return {
            isFolder: true,
            name: this.name.value,
            children: [
                { name: '.codeeasy', isFolder: true, children: [{ name: 'project', type: 'json', isFolder: false, content: ProjectParser.stringify(this) }] },
                { name: 'package', type: 'json', isFolder: false, content: getPackageJson() },
                { name: 'Routes', type: 'js', isFolder: false, content: getServerRoutes() },
                { name: 'server', type: 'js', isFolder: false, content: getServer() },
                { name: 'src', isFolder: true, children: gatTabs() },
            ]
        };
    }
}
