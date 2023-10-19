export interface IBasicController {
  create(req: Express.Request, res: Express.Response): Promise<void>;
  findOne(req: Express.Request, res: Express.Response): Promise<void>;
  findAll(req: Express.Request, res: Express.Response): Promise<void>;
  update(req: Express.Request, res: Express.Response): Promise<void>;
  delete(req: Express.Request, res: Express.Response): Promise<void>;
}
