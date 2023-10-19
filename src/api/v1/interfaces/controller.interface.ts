interface ControllerCompatible {
  create(req: Express.Request, res: Express.Response): void;
  findOne(req: Express.Request, res: Express.Response): void;
  findAll(req: Express.Request, res: Express.Response): void;
  update(req: Express.Request, res: Express.Response): void;
  delete(req: Express.Request, res: Express.Response): void;
}
export default ControllerCompatible;
