export enum EnumTypeOfTools {
    variable = 'variable',
    js = 'js',
    return = 'return',
}

export enum EnumTypeIconsOfTools {
    variable = 'space_bar',
    js = 'code',
    return = 'stop',
}

export interface TipoOfTools {
    type: EnumTypeOfTools;
    comment: String;
    previewIcon: EnumTypeIconsOfTools;
    value: String;
}
