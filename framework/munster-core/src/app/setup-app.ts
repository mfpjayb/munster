import { childComponentHyperScript } from "../hyper-script/child-component-hyper-script";
import { forHyperScript } from "../hyper-script/for-hyper-script";
import { hyperScript } from "../hyper-script/hyper-script";
import { ifHyperScript } from "../hyper-script/if-hyper-script";

export function setupApp(): void {
    globalThis.e = hyperScript;
    globalThis.c = childComponentHyperScript;
    globalThis.i = ifHyperScript;
    globalThis.f = forHyperScript;
}