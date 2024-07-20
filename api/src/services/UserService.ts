import User from "../models/User";
import NotFound from "../utils/errors/NotFound";

export default class UserService {
  static findAll() {
    return User.findAll();
  }

  static async findById(idUser: string): Promise<User | null> {
    return await User.findByPk(idUser);
  }
}
