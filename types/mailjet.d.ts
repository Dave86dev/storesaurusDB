declare module "node-mailjet" {
  interface Connect {
    post(resource: string, options?: { version: string }): any;
  }

  function connect(apiKey: string, apiSecret: string): Connect;

  export { connect };
}
