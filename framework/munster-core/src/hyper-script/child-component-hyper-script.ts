import { IHyperScript, THyperScriptChild, THyperScriptDirective } from "./hyper-script";

export enum EHyperScriptTypes {
    COMPONENT = 'c',
    IF = 'i',
    FOR = 'f'
};

export interface ITypedHyperScript {
    type: EHyperScriptTypes;
    name?: string;
    valueCaller?: () => any;
    elementCaller?: () => IHyperScript;
    attributes?: object;
    directives?: THyperScriptDirective[];
    rawComponent?: any;
    children?: THyperScriptChild[];
}

export function childComponentHyperScript(
    name: string,
    attributes: object = {},
    children: THyperScriptChild[] = [],
    directives: THyperScriptDirective[] = [],
    rawComponent: any = null
): ITypedHyperScript {
    return {
        name,
        type: EHyperScriptTypes.COMPONENT,
        attributes,
        directives,
        rawComponent,
        children
    };
}
