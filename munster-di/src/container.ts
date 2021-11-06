interface IContainer {
    singleton: boolean;
    instance: any;
    target: any;
}

export class Container {

    private static instance: Container;

    private data: Map<any, IContainer> = new Map();

    constructor() {
        if (Container.instance) {
            return Container.instance;
        }

        Container.instance = this;
    }

    register(Target: any, option: { singleton: boolean }, key: string = null) {
        const selector = key || Target;
        this.data.set(selector, {
            singleton: option.singleton,
            instance: null,
            target: Target
        });
    }

    resolve(Target: any, key: string = null) {
        const selector = key || Target;

        const containerData: IContainer = this.data.get(selector);
        const tokens = Reflect.getMetadata('design:paramtypes', containerData.target) || [];
        const injectedInstances = tokens.map((token: any) => this.resolve(token))

        if (containerData) {
            if (!containerData.singleton) {
                return new containerData.target(...injectedInstances);
            } else {
                if (!containerData.instance) {
                    containerData.instance = new containerData.target(...injectedInstances);
                    this.data.set(selector, containerData);
                }
                return containerData.instance;
            }
        }

    }

    unregister(Target: any, key: string = null) {
        const selector = key || Target;
        this.data.delete(selector);
    }
}
