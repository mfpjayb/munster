interface IContainer {
    singleton: boolean;
    instance: any;
    target: any;
}

export class Container {

    private static instance;

    private data: Map<any, IContainer> = new Map();

    constructor() {
        if (Container.instance) {
            return Container.instance;
        }

        Container.instance = this;
    }

    register(Target: any, option: { singleton: boolean }) {
        this.data.set(Target, {
            singleton: option.singleton,
            instance: null,
            target: Target
        });
    }

    resolve(Target: any) {

        //Get constructor parameters
        const tokens = Reflect.getMetadata('design:paramtypes', Target) || [];
        const injectedInstances = tokens.map((token: any) => this.resolve(token))

        const containerData: IContainer = this.data.get(Target);

        if (containerData) {
            if (!containerData.singleton) {
                return new containerData.target(...injectedInstances);
            } else {
                if (!containerData.instance) {
                    containerData.instance = new containerData.target(...injectedInstances);
                    this.data.set(Target, containerData);
                }
                return containerData.instance;
            }
        }

    }

    unregister(Target: any) {
        this.data.delete(Target);
    }
}
