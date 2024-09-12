import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type Props = { className?: ClassValue };

const Footer = ({ className }: Props) => {
  return <div className={cn(className)}>Footer</div>;
};

export default Footer;
