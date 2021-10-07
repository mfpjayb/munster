import { IHyperScript, THyperScriptDirective } from "./hyper-script";

export enum EHyperScriptTypes {
    COMPONENT = 'c',
    IF = 'i',
    FOR = 'f'
};

export interface ITypedHyperScript {
    type: EHyperScriptTypes;
    name?: string;
    parentComponent?: any;
    valueCaller?: () => any;
    elementCaller?: () => IHyperScript;
    attributes: object;
    directives: THyperScriptDirective[];
    rawComponent: any;
}

export function childComponentHyperScript(
    name: string,
    parentComponent: any,
    attributes: object = {},
    directives: THyperScriptDirective[] = [],
    rawComponent: any = null
): ITypedHyperScript {
    return {
        name,
        type: EHyperScriptTypes.COMPONENT,
        parentComponent,
        attributes,
        directives,
        rawComponent
    };
}
