import { Service } from "munster-core";

@Service()
export class RouterService {

    private evaluateList: Function[] = [];

    constructor() {
        this.initializeRouterEvents();
    }

    public addEvaluateItem(evaluate: Function) {
        this.evaluateList.push(evaluate);
    }

    public removeEvaluateItems(evaluate: Function) {
        this.evaluateList = this.evaluateList.filter(item => item !== evaluate);
    }

    private evaluate() {
        this.evaluateList.forEach(evaluate => evaluate());
    }

    private initializeRouterEvents(): void {
        window.history.pushState = this.overwriteHistoryStateFunctions('pushState');
        window.history.replaceState = this.overwriteHistoryStateFunctions('replaceState');

        window.onpopstate = this.evaluate.bind(this);
        window.addEventListener('pushState', this.evaluate.bind(this));
        window.addEventListener('replaceState', this.evaluate.bind(this));
    }

    private overwriteHistoryStateFunctions(type: string): () => void {
        var originalFunction = history[type];
        return function () {
            const modifiedFunction = originalFunction.apply(this, arguments);
            const newEvent = new Event(type);
            newEvent['arguments'] = arguments;
            window.dispatchEvent(newEvent);
            return modifiedFunction;
        }
    }

}