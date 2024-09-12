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
    <div className="relative w-48 h-24 border rounded-md flex items-end">
      <p className="bottom-0 left-5 truncate py-2 px-1">
        {attachment.filename}
      </p>
      <a href={link} target="_blank">
        <Button
          className="absolute top-0 right-4 my-2 px-2 py-0"
          variant={"ghost"}
        >
          <Download size={16} />
        </Button>
      </a>
    </div>
  );
};

export default Attachment;
