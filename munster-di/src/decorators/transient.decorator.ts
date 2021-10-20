import { register } from "../actions/register";

export function Transient() {
    return function(Target: any) {
        register(Target, {
            singleton: false
        });
    };
}