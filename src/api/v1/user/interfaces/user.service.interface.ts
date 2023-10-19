import { IBasicService } from "../../basicInterfaces";
import { User } from "..";

export interface IUserService extends IBasicService<User>{
    findOneByEmail(email: string): Promise<User | null>
}