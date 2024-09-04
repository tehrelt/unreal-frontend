import { api } from "@/api/axios";
import { LoginDto, LoginResponseDto } from "@/schemas/login";
import { User } from "@/schemas/user";

class AuthService {
  async login(dto: LoginDto) {
    const res = await api.post<LoginResponseDto>("/login", dto);
    return res.data;
  }

  async me() {
    const res = await api.get<User>("/me");
    return res.data;
  }
}

export const authService = new AuthService();
