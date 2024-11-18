"use client";
import React, { useEffect } from "react";
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
import { htmlToState, stateToHTML } from "@/lib/convert";
import { focusManager, useMutation, useQuery } from "@tanstack/react-query";
import { mailService } from "@/services/mail";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  subject: z
    .string({ required_error: "Введите тему письма" })
    .min(1, { message: "Пустая тема недопустима" })
    .max(100),
  to: z
    .string({ required_error: "Введите получателя" })
    .min(1)
    .trim()
    .transform((v) => v.split(","))
    .pipe(
      z.array(z.string().trim().email({ message: "Введите корректный email" }))
    ),
  body: z.any(),
  encrypt: z.boolean().default(false),
});
type Schema = z.infer<typeof schema>;

export const NewMailForm = ({ to }: { to?: string[] }) => {
  const router = useRouter();

  const sp = useSearchParams();

  const mailbox = sp.get("mailbox");
  const num = sp.get("num");

  const { data: draft, isLoading: draftLoading } = useQuery({
    queryKey: ["draft"],
    queryFn: async () =>
      mailbox && num && !isNaN(Number(num))
        ? await mailService.message(mailbox, Number(num))
        : null,
  });

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      to: to,
    },
  });

  useEffect(() => {
    if (draft) {
      form.setValue(
        "to",
        draft.mail.to.map((v) => v.address)
      );
      form.setValue("subject", draft.mail.subject);
      form.setValue("body", draft.mail.body);
    }
  }, [draft, form]);

  const [files, setFiles] = React.useState<File[]>([]);

  const appendAttachments = (files: File[]) =>
    setFiles((ff) => [...ff, ...files]);

  const removeAttachment = (name: string) =>
    setFiles((ff) => ff.filter((f) => f.name !== name));

  const { mutate: send, isPending: isSending } = useMutation({
    mutationKey: ["sendemail"],
    mutationFn: async (data: FormData) => await mailService.send(data),
    onSuccess: (req) => {
      toast.success("Письмо отправлено");
      router.push("/");
    },
    onError: (e) => {
      toast.error(e.name, {
        description: e.message,
      });
    },
  });

  const { mutate: removeFromDrafts } = useMutation({
    mutationKey: ["remove-draft", num],
    mutationFn: async () => await mailService.delete(mailbox!, Number(num!)),
  });

  const { mutate: saveDraft, isPending: draftIsPending } = useMutation({
    mutationKey: ["save-draft"],
    mutationFn: async (data: FormData) => await mailService.draft(data),
    onSuccess: (req) => {
      toast.success("Письмо сохранено");
      router.push("/");
    },
    onError: (e) => {
      toast.error(e.name, {
        description: e.message,
      });
    },
  });

  const submit = async (data: Schema) => {
    const fd = new FormData();

    data.to.forEach((to) => {
      fd.append("to", to);
    });

    fd.append("subject", data.subject);

    if (data.body instanceof EditorState) {
      fd.append("body", stateToHTML(data.body.getCurrentContent()));
    } else {
      fd.append("body", data.body);
    }

    fd.append("encrypt", data.encrypt.toString());

    files?.forEach((f) => {
      fd.append("attachment", f);
    });

    if (draft) {
      await removeFromDrafts();
    }

    await send(fd);
  };

  const submitDraft = async (data: Schema) => {
    const fd = new FormData();

    data.to.forEach((to) => {
      fd.append("to", to);
    });

    fd.append("subject", data.subject);

    if (data.body instanceof EditorState) {
      fd.append("body", stateToHTML(data.body.getCurrentContent()));
    } else {
      fd.append("body", data.body);
    }

    fd.append("encrypt", data.encrypt.toString());

    files?.forEach((f) => {
      fd.append("attachment", f);
    });

    if (draft) {
      await removeFromDrafts();
    }

    await saveDraft(fd);
  };

  return (
    <div className="px-2 py-2">
      <p className="font-bold text-4xl">Написать новое письмо</p>
      {draftLoading ? (
        <p>Загрузка...</p>
      ) : (
        <TextEditorProvider html={draft ? draft.mail.body : undefined}>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(submit, (errs) => {
                console.error(errs);
                toast.error(JSON.stringify(errs));
              })}
            >
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
                name="body"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border rounded-md px-2 py-1 space-y-1">
                        <ToolPanel />
                        <TextEditor
                          className="p-2 rounded-md"
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Input
                type="file"
                multiple
                onChange={(e) =>
                  appendAttachments(Array.from(e.target.files || []))
                }
              />
              {files && (
                <div>
                  <div>Прикрепленные файлы</div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {Array.from(files).map((f) => (
                      <div
                        key={f.name}
                        className="flex justify-between items-center px-2 py-1 border border-muted rounded-sm w-72"
                      >
                        <div className="">
                          <p className="truncate max-w-60">{f.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {f.size} байт
                          </p>
                        </div>
                        <Button
                          className="h-fit w-fit p-1"
                          variant={"destructive"}
                          type="button"
                          onClick={() => removeAttachment(f.name)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-x-2">
                <Button
                  disabled={isSending}
                  type="submit"
                  variant={isSending ? "secondary" : "default"}
                  className="w-64 h-8"
                >
                  Отправить
                </Button>
                <Button
                  disabled={isSending}
                  type="button"
                  onClick={form.handleSubmit(submitDraft, console.error)}
                  variant={isSending ? "secondary" : "default"}
                  className="w-64 h-8"
                >
                  Сохранить
                </Button>
                <FormField
                  control={form.control}
                  name="encrypt"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-x-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            // onChange={(v) => field.onChange(v)}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <span>Зашифровать?</span>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </TextEditorProvider>
      )}
    </div>
  );
};
