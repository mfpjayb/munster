export class RequestInterceptor {

    private xhr: typeof XMLHttpRequest = XMLHttpRequest;
    protected origin: string = null;
    protected data: any = null;
    protected open: {
        method: string;
        url: string;
        async?: any;
        user?: any;
        pass?: any;
    } = null;

    constructor() {
        const self = this;

            var open = this.xhr.prototype.open;
            var send = this.xhr.prototype.send;
            
            this.xhr.prototype.open = function(method: string, url: string, async?: any, user?: any, pass?: any) {

                self.open = { method, url, async, user, pass };

                let finalUrl: string = self.open.url;

                self.interceptOpen();

                if (self.origin) {
                    const newUrl = new URL(`${self.origin}/${self.open.url}`);
                    finalUrl = newUrl.href;
                }

                open.call(this, self.open.method, finalUrl, self.open.async, self.open.user, self.open.pass);

                // set headers must be called after open but before send
                self.setHeaders();
            }
            
            this.xhr.prototype.send = function(data) {
                self.data = data;
                self.interceptSend();
                send.call(this, self.data);
            }
    }

    protected interceptOpen() { }
    protected interceptSend() { }
    protected setHeaders() { }
    protected setRequestHeader(header: string, value: string): void {
        this.xhr.prototype.setRequestHeader(header, value)
    }
}