import React from "react";
import { decodeb64 } from "./utils";

export const renderContentType = (
  ct: string,
  body: string
): React.ReactNode => {
  if (ct.includes("text/html")) {
    return <div dangerouslySetInnerHTML={{ __html: body }} />;
  } else if (ct.includes("text/plain")) {
    return <pre></pre>;
  } else if (ct.includes("image/")) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={`data:${ct};base64,${body}`} />;
  }
  return (
    <pre>
      <pre>unknown content-type: {ct}</pre>
      <pre>{body}</pre>
    </pre>
  );
};
