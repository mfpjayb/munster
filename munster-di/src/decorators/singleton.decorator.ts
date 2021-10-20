import { register } from "../actions/register";

export function Singleton() {
    return function(Target: any) {
        register(Target, {
            singleton: true
        });
    };
}


