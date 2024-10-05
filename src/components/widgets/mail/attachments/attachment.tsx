import { cn } from "@/lib/utils";
import { AttachmentInfo } from "@/schemas/mailbox";
import { File, FileImage, FileQuestion } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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
          <div className="relative h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={link}
              alt={""}
              className="absolute w-full h-full group-hover:opacity-60 rounded-md transition-all duration-300"
            />
            <Skeleton className="absolute h-full w-full -z-10" />
            {/* <FileImage className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 -z-10 w-10 h-10" /> */}
            {/*  */}
          </div>
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
