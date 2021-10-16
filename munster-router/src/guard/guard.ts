export class Guard {
    canActivate(): Promise<boolean> | boolean {
        return true;
    }
}