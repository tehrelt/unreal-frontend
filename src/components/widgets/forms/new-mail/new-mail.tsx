"use client";
import React from "react";
import { TextEditorProvider } from "./context";
import { ToolPanel } from "./tool-panel";
import { TextEditor } from "./text-editor";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {};

const schema = z.object({
  subject: z.string().min(1).max(100),
  to: z.string().min(1).email(),
  body: z.string(),
  attachments: z.array(z.any()).nullish(),
});
type Schema = z.infer<typeof schema>;

export const NewMailForm = (props: Props) => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="px-2 py-2">
      <p className="font-bold text-4xl">Написать новое письмо</p>

      <Form {...form}>
        <form className="space-y-2">
          <FormField
            name="subject"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-x-2">
                <FormLabel>Тема</FormLabel>
                <FormControl>
                  <Input placeholder="Введите тему" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Получатели</FormLabel>
                <FormControl>
                  <Input placeholder="Введите получателей..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextEditorProvider>
                    <div className="border rounded-md px-2 py-1 space-y-1">
                      <ToolPanel />
                      <TextEditor className="p-2 rounded-md" />
                    </div>
                  </TextEditorProvider>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
