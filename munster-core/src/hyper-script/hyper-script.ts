import { ITypedHyperScript } from "./child-component-hyper-script";

export type THyperScriptChild = (IHyperScript | ITypedHyperScript | string | (() => any));

// [namespace, name, value caller]
export type THyperScriptDirective = [string, string, ((value?: any) => any)?];

export interface IHyperScript {
    name: string;
    attributes: object;
    children: THyperScriptChild[];
    directives: THyperScriptDirective[];
}

export function hyperScript(
    name: string,
    attributes: object = {},
    children: THyperScriptChild[] = [],
    directives: THyperScriptDirective[] = []
): IHyperScript {
    return {
        name,
        attributes,
        children,
        directives
    };
}