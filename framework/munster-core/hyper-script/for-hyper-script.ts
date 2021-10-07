import { EHyperScriptTypes, ITypedHyperScript } from "./child-component-hyper-script";
import { IHyperScript } from "./hyper-script";

export function forHyperScript(valueCaller: () => any, elementCaller: (index?: number) => IHyperScript): ITypedHyperScript {
    return {
        type: EHyperScriptTypes.FOR,
        valueCaller,
        elementCaller
    }
}
