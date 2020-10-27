type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export class Router {
  public routes: any[] = [];

  private addRoute = (method: HttpMethod, url: string, cb: (req?: any) => {}) => this.routes = [
    ...this.routes,
    {
      method,
      url,
      cb,
    }
  ];

  post = (url: string, cb: (req?: any) => {}): any => this.addRoute('POST', url, req => cb(req));
  get = (url: string, cb: (req?: any) => {}): any => this.addRoute('GET', url, req => cb(req));
  put = (url: string, cb: (req?: any) => {}): any => this.addRoute('PUT', url, req => cb(req));
  patch = (url: string, cb: (req?: any) => {}): any => this.addRoute('PATCH', url, req => cb(req));
  delete = (url: string, cb: (req?: any) => {}): any => this.addRoute('DELETE', url, req => cb(req));

  handleRoute = (req: any) => {
    const { method, url } = req;
    const route = this.routes
      .find(n => n.method === method && n.url === url);

    if (!route) {
      return req.respond({ status: 404, body: 'Not found' });
    }

    return route.cb(req);
  }
}
