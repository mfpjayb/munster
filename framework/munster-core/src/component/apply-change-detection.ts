import { isObject } from "../utils/is-object";

interface IObject {
    [key: string]: any;
}

export function applyChangeDetection(component: any, componentWrapper: any): void {
    const keys: string[] = Object.keys(component).filter(key => key.indexOf('$') !== 0);
    doApply(keys, component, componentWrapper);
}

function doApply(keys: string[], obj: IObject, componentWrapper: any): void {
    keys.forEach(key => {

        let objectValue: any = obj[key];

        checkAndApplyForObjectValues(objectValue, componentWrapper);

        Object.defineProperty(obj, key, {
            get() {
                return objectValue;
            },
            set(value: any) {
                if (objectValue !== value) {
                    objectValue = value;

                    checkAndApplyForObjectValues(objectValue, componentWrapper);

                    componentWrapper.$apply();
                }
            }
        });
    });
}

function checkAndApplyForObjectValues(objectValue: IObject, componentWrapper: any) {
    if (isObject(objectValue)) {
        doApply(Object.keys(objectValue), objectValue, componentWrapper);
    }
}
