import { IWatcher } from "../component-hutch";

export function createWatcher(element: Element, initialValue: any, valueCaller: () => any, updateCallback: (value: any) => void, componentWrapper: any) {
    let value = initialValue;
    const watcher: IWatcher = {
        isUpdated() {
            let newValue = valueCaller();
            let updated = value !== newValue;
            value = newValue;
            return updated;
        },
        isConnected() {
            return element.isConnected;
        },
        update() {
            updateCallback(value);
        }
    };
    componentWrapper.addWatcher(watcher);
}
