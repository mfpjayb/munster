export class BaseGuard {
    canActivate(): Promise<boolean> | boolean {
        return true;
    }
}
