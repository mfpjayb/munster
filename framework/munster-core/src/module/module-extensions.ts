interface IParentModule {
    setData(key: string, value: any): void;
    getData(key: string): any;
}

export class ModuleExtensions {
    public getParentModule(): IParentModule {
        return null;
    };
}