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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EditorState } from "draft-js";
import { stateToHTML } from "@/lib/convert";
import { useMutation } from "@tanstack/react-query";
import { mailService } from "@/services/mail";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
  subject: z
    .string({ required_error: "Введите тему письма" })
    .min(1, { message: "Пустая тема недопустима" })
    .max(100),
  to: z
    .string({ required_error: "Введите получателя" })
    .min(1)
    .email({ message: "Введите корректный email" }),
  body: z
    .any()
    .refine((v) => v instanceof EditorState)
    .transform((state) => stateToHTML(state.getCurrentContent())),
  attachments: z.array(z.any()).nullish(),
});
type Schema = z.infer<typeof schema>;

export const NewMailForm = () => {
  const router = useRouter();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { mutate: send } = useMutation({
    mutationKey: ["sendemail"],
    mutationFn: async (data: FormData) => await mailService.send(data),
    onError: (e) => {
      toast.error(e.name, {
        description: e.message,
      });
    },
  });

  const submit = async (data: Schema) => {
    const fd = new FormData();

    fd.append("to", data.to);
    fd.append("subject", data.subject);
    fd.append("body", data.body);

    await send(fd);

    router.refresh();
  };

  return (
    <div className="px-2 py-2">
      <p className="font-bold text-4xl">Написать новое письмо</p>

      <TextEditorProvider>
        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(submit, console.error)}
          >
            <FormField
              name="subject"
              control={form.control}
              render={({ field, fieldState: state }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <Input
                      placeholder="Тема"
                      className={cn(state.error && "border-red-500")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="to"
              control={form.control}
              render={({ field, fieldState: state }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <Input
                      placeholder="Введите получателей..."
                      className={cn(state.error && "border-red-500")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="body"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="border rounded-md px-2 py-1 space-y-1">
                      <ToolPanel />
                      <TextEditor className="p-2 rounded-md" {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Отправить</Button>
          </form>
        </Form>
      </TextEditorProvider>
    </div>
  );
};
