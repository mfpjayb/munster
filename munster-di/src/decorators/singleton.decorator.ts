import { Container } from "../container";

export function Singleton() {
    return function(Target: any) {
        const container = new Container();
        container.register(Target, {
            singleton: true
        });
    };
}


