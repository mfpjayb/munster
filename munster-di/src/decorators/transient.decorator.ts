import { Container } from "../container";

export function Transient() {
    return function(Target: any) {
        const container = new Container();
        container.register(Target, {
            singleton: false
        });
    };
}