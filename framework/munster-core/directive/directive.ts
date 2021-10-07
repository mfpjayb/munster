export class Directive {
    public static namespace: string;

    getDirectives(): [string, () => any][] {
        return null;
    }
    getElement(): Element {
        return null;
    }
    getComponent(): any {
        return null;
    }
}
