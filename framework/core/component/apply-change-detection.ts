import { isObject } from "../../utils/is-object";

function doApply(keys: string[], obj: object, componentWrapper: any): void {
    keys.forEach(key => {

        let objectValue = obj[key];

        if (isObject(objectValue)) {
            doApply(Object.keys(objectValue), objectValue, componentWrapper);
        }

        Object.defineProperty(obj, key, {
            get() {
                return objectValue;
            },
            set(value: any) {
                if (objectValue !== value) {
                    objectValue = value;
                    componentWrapper.$apply();
                }
            }
        });
    });
}

export function applyChangeDetection(component: any, componentWrapper: any): void {
    const keys: string[] = Object.keys(component).filter(key => key.indexOf('$') !== 0);
    doApply(keys, component, componentWrapper);
}
