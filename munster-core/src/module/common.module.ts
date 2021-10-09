import { EventDirective } from "../directive/event.directive";
import { PreventEventDirective } from "../directive/prevent-event.directive";
import { ViewDirective } from "../directive/view.directive";
import { Module } from "./module.decorator";

@Module({
    exports: {
        directives: [
            EventDirective,
            PreventEventDirective,
            ViewDirective
        ]
    }
})
export class CommonModule { }