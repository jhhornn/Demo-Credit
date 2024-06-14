import models from "../models";
import { IUser } from "../utils/interfaces";

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        return models.User.create(user);
    }
}

export default new UserService();