"use client";
import React from "react";
import { Form } from "./form";
import { NextPage } from "next";
import { useParams } from "@/hooks/search-params";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const sp = useParams();
  const from = sp.params.get("from") || "/";
  return <Form from={from} />;
};

export default Page;
