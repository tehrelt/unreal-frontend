import { Button } from "@/components/ui/button";
import { API_HOST } from "@/const/env";
import { AttachmentInfo } from "@/schemas/mailbox";
import { Download } from "lucide-react";
import React from "react";

type Props = {
  attachment: AttachmentInfo;
  link: string;
};

const Attachment = ({ attachment, link }: Props) => {
  return (
    <a
      href={link}
      target="_blank"
      className="relative w-48 h-24 border rounded-md flex items-end group overflow-hidden cursor-pointer"
    >
      <div className="absolute w-full h-full bg-primary -z-20">
        {attachment.contentType.includes("image/") && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link}
            alt={attachment.filename}
            className="w-full h-full -z-10 opacity-70 rounded-md"
          />
        )}
      </div>
      <p className="bottom-0 left-5 truncate py-2 px-1 text-muted text-xs w-full group-hover:bg-muted-foreground/60 rounded-t-md ">
        {attachment.filename}
      </p>
    </a>
  );
};

export default Attachment;
