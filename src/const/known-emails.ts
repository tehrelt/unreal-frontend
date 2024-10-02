import { Email } from "@/lib/email";

type Connection = {
  host: string;
  port: number;
};

export type KnownEmail = {
  hosts: string[];
  image: string;
  smtp: Connection;
  imap: Connection;
};

const EMAILS: KnownEmail[] = [
  {
    hosts: ["ya.ru", "yandex.ru"],
    imap: {
      host: "imap.yandex.ru",
      port: 993,
    },
    smtp: {
      host: "smtp.yandex.ru",
      port: 465,
    },
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAflBMVEWRGgT/QBX9Phz9Pxz8Px39Pxz7Px38Px38PBn8Px39Px38Px39Ph38Px38Px38QB/8ORX9Z0z+mYb+t6r+zsT+0sr+0Mf8TS39WTz//v39XUH/8e/+29X+5uL8QyL9gGr/9fP9jHj8Mg78NhP9f2n9qZr9c1r+4t39e2T+xLkeqoRBAAAADnRSTlMBDCdqhaNI4fD6ycCg1SRnPh0AAAFbSURBVDjLhVPtYoIwDEQoKODSyKxYBATr197/BZeWdrRsuvwC7rh8XaJojlWcMJayJIujvyJO12Bjk2a/4FVKQG6DHosFJdtADl7kkDMfT8D8BtyFfi9XPj7BiOiJlD/6FkfcVZ97IcRB1IaxtfVN1XM8HqSLetKYKmVGgENzIuTUis4RAD6MgK0PBAHVscezHCwhh8QITAl2hI8X4Gom0DiIUJin/lJJ2dXUibrOhBziKN5Ywk3KtuewICSuR6ewJGznIdyphrtapigcAXhP7T1q7H0C+AS8ksSjUfiCQAyqQg6j36afQjPGQc/iGRZp2zSdKFpGxxdt2kFpBTXqRi7ncFB21HoZR8JvYZHFvCwqgRI8en8O07LculVFwF0Fc1jPhuHYmAS+gjOM6ZTjrRVftZl5u7eWY75pOX3C0PllaHvjdud9Y/vgcNbvD+f/09PHy94e78vz/wacbzWH+vgqNAAAAABJRU5ErkJggg==",
  },
  {
    hosts: ["mail.ru", "inbox.ru"],
    image: "https://home.imgsmail.ru/whiteline/assets/logo/light/at.svg",
    smtp: {
      host: "smtp.mail.ru",
      port: 465,
    },
    imap: {
      host: "imap.mail.ru",
      port: 993,
    },
  },
  {
    hosts: ["rambler.ru"],
    image: "https://static.rambler.ru/assets/logos/v2/rambler.svg",
    smtp: {
      host: "smtp.rambler.ru",
      port: 465,
    },
    imap: {
      host: "imap.rambler.ru",
      port: 993,
    },
  },
];

export const isKnownEmail = (email: string) => {
  const mail = new Email(email);

  return EMAILS.find((e) => e.hosts.includes(mail.host));
};
