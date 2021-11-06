import { Container } from "../container";

export function register(Target: any, option: { singleton: boolean; }, key: string = null): void {
    const container = new Container();
    container.register(Target, option, key);
}
