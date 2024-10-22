import { api } from "@/api/axios";
import { UpdateUser } from "@/schemas/user";

class UserService {
  async update(dto: UpdateUser) {
    const res = await api.put<void>("/me", dto);
    return res.data;
  }
}

export const userService = new UserService();
