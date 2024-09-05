import { api } from "@/api/axios";
import { Mail, Mailbox } from "@/schemas/mailbox";

type Mailboxes = {
  mailboxes: Mailbox[];
};

type Messages = {
  messages: Mail[];
};

type MailResponse = {
  mail: Mail;
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

  async mail(mailbox: string, num: number) {
    const res = await api.get<MailResponse>(`/${mailbox}/mail`, {
      params: { mailnum: num },
    });
    return res.data;
  }
}

export const mailService = new MailService();
