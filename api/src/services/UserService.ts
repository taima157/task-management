import User from "../models/User";
import bcrypt from "bcrypt";
import StatusError, { StatusErrorEnum } from "../utils/errors/StatusError";
import { SignUpDTO } from "../controllers/auth/dto/SignUpDTO";

export default class UserService {
  static findAll() {
    return User.findAll();
  }

  static async findById(idUser: string): Promise<User | null> {
    const user = await User.findByPk(idUser);

    if (user) {
      return user;
    }

    throw new StatusError(StatusErrorEnum.NOT_FOUND, "Usuário não encotrado!");
  }

  static async findByEmail(email: string) {
    return await User.findOne({ where: { email: email } });
  }

  static async create(signUpDTO: SignUpDTO) {
    const existUser = await this.findByEmail(signUpDTO.email);

    if (existUser) {
      throw new StatusError(
        StatusErrorEnum.BAD_REQUEST,
        "Usuário já cadastrado na base de dados."
      );
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(signUpDTO.password, salt, async function (err, hash) {
        signUpDTO.password = hash;

        const user: User = await User.create(signUpDTO);
        user.save();
      });
    });
  }
}
