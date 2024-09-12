import React from "react";

export const renderContentType = (
  ct: string,
  body: string
): React.ReactNode => {
  if (ct.includes("text/html")) {
    const html = document.createElement("html");
    html.innerHTML = body;

    let images = html.getElementsByTagName("img");

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        img.remove();
      }
    }

    return <div dangerouslySetInnerHTML={{ __html: html.innerHTML }} />;
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
