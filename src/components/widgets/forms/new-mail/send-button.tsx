import { Button } from "@/components/ui/button";
import React from "react";

type callbackFn = () => void;
type Props = {
  callback: callbackFn;
  send: (fd: FormData) => void;
};

export const SendButton = ({ send }: Props) => {
  return <Button type="submit"></Button>;
};
