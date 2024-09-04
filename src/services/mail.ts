import { api } from "@/api/axios";
import { Mailbox } from "@/schemas/mailbox";

type Mailboxes = {
  mailboxes: Mailbox[];
};

class MailService {
  async mailboxes() {
    const res = await api.get<Mailboxes>("/mailboxes");
    return res.data;
  }
}

export const mailService = new MailService();
