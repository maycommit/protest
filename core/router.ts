interface IRoute {
  url: string;
  controller: object;
}

export const resource = (route: IRoute) => (app: any) => {
  app.get(route.url, resource);
};