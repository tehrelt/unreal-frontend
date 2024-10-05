import { AttachmentInfo, Mail } from "@/schemas/mailbox";
import Attachment from "./attachment";
import { API_HOST } from "@/const/env";

type Props = {
  attachments: AttachmentInfo[];
  link: (filename: string) => string;
};

export function AttachmentsList({ attachments, link }: Props) {
  return (
    <div>
      <p className="text-muted-foreground text-lg font-bold">
        Прикрепленные файлы
      </p>

      <div className="flex gap-x-2">
        {attachments.map((a) => (
          <Attachment key={a.filename} attachment={a} link={link(a.filename)} />
        ))}
      </div>
    </div>
  );
}
