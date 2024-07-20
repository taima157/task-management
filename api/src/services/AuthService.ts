import { LoginRequestDTO } from "../controllers/auth/dto/LoginRequestDTO";
import { LoginResponseDTO } from "../controllers/auth/dto/LoginResponseDTO";
import StatusError, { StatusErrorEnum } from "../utils/errors/StatusError";
import UserService from "./UserService";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

type UserJwtPayload = {
  idUser: string;
  email: string;
};

export default class AuthService {
  static async login(loginRequestDTO: LoginRequestDTO) {
    const user = await UserService.findByEmail(loginRequestDTO.email);

    if (!user) {
      throw new StatusError(
        StatusErrorEnum.UNAUTHORIZED,
        "Credenciais incorretas!"
      );
    }

    const match = await bcrypt.compare(loginRequestDTO.password, user.password);

    if (!match) {
      throw new StatusError(
        StatusErrorEnum.UNAUTHORIZED,
        "Credenciais incorretas!"
      );
    }

    const userJwtPayload: UserJwtPayload = {
      idUser: user.idUser,
      email: user.email,
    };

    const token = jwt.sign(userJwtPayload, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return { token } as LoginResponseDTO;
  }
}
