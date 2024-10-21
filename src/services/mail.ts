import { api } from "@/api/axios";
import { Mail, Mailbox } from "@/schemas/mailbox";
import { Pagination } from "@/schemas/pagination";

type Mailboxes = {
  mailboxes: Mailbox[];
};

type Messages = {
  messages: Mail[];
  hasNext: number | null;
  total: number;
};

type MailResponse = {
  mail: Mail;
};

class MailService {
  async mailboxes() {
    const res = await api.get<Mailboxes>("/mailboxes");
    return res.data;
  }

  async messages({ mailbox, limit, page }: { mailbox: string } & Pagination) {
    console.log("fetching messages", { mailbox, limit, page });
    const res = await api.get<Messages>(`/${mailbox}`, {
      params: { page, limit },
    });
    return res.data;
  }

  async message(mailbox: string, mailnum: number) {
    const ep = `/${mailbox}/${mailnum}`;
    const res = await api.get<MailResponse>(ep);
    return res.data;
  }

  async send(fd: FormData) {
    const res = await api.post("/send", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status != 200) {
      throw Error(res.statusText, res.data);
    }
  }
}

export const mailService = new MailService();
