import { EHyperScriptTypes, ITypedHyperScript } from './child-component-hyper-script';
import { IHyperScript } from './hyper-script';

export function ifHyperScript(
    valueCaller: () => any,
    elementCaller: () => (IHyperScript | ITypedHyperScript)
): ITypedHyperScript {
    return {
        type: EHyperScriptTypes.IF,
        valueCaller,
        elementCaller: elementCaller as any
    };
}
