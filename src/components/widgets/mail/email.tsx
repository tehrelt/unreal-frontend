import Link from "next/link";
import React from "react";

type Props = {
  name?: string;
  address: string;
};

const Email = ({ address, name }: Props) => {
  return (
    <Link className="space-x-2" href={`/send?to=${address}`} passHref>
      <span>
        {name ? name : <span className="text-muted-foreground"></span>}
      </span>
      <span className="text-xs text-muted-foreground  cursor-pointer hover:text-muted-foreground/80 hover:underline">
        {address}
      </span>
    </Link>
  );
};

export default Email;
