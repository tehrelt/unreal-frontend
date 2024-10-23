import { api } from "@/api/axios";

class UserService {
  async update(dto: FormData) {
    const res = await api.put<void>("/me", dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}

export const userService = new UserService();
