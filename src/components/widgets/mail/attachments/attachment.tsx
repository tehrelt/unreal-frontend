import { cn } from "@/lib/utils";
import { AttachmentInfo } from "@/schemas/mailbox";
import { File, FileQuestion } from "lucide-react";
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
      className="relative w-48 h-24 border rounded-md flex items-end group overflow-hidden cursor-pointer transition-all ease-in-out"
    >
      <div className="absolute w-full bg-primary-foreground -z-20 h-full">
        {attachment.contentType.includes("image/") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link}
            alt={attachment.filename}
            className="w-full h-full group-hover:opacity-60  rounded-md transition-all duration-300"
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <FileQuestion className="w-10 h-10" />
          </div>
        )}
      </div>

      <p
        className={cn(
          `py-2 px-1 
          bottom-0 left-5 w-full truncate 
          text-muted-foreground text-xs
          group-hover:bg-muted/60
          transition-all duration-300`,
          attachment.contentType.includes("image/") &&
            "opacity-0 group-hover:opacity-100"
        )}
      >
        {attachment.filename}
      </p>
    </a>
  );
};

export default Attachment;
