interface IComponentWrapper {
    getComponent(): any;
    getModule(): any;
    getParentComponentWrapper(): any;
}

export class ComponentExtensions {

    public getComponentWrapper(): IComponentWrapper {
        return null;
    };

}