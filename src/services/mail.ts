import { api } from "@/api/axios";
import { Mail, Mailbox } from "@/schemas/mailbox";

type Mailboxes = {
  mailboxes: Mailbox[];
};

type Messages = {
  messages: Mail[];
};

class MailService {
  async mailboxes() {
    const res = await api.get<Mailboxes>("/mailboxes");
    return res.data;
  }

  async mailbox(mailbox: string) {
    const res = await api.get<Messages>(`/${mailbox}`);
    return res.data;
  }
}

export const mailService = new MailService();
