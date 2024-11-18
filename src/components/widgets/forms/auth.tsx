"use client";
import {
  Credential,
  LoginDto,
  LoginResponseDto,
  loginSchema,
} from "@/schemas/login";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import { sessionService } from "@/services/session";
import { JWT_KEY } from "@/const/jwt";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { z } from "zod";
import { vemail } from "@/lib/utils";
import { Email } from "@/lib/email";
import { isKnownEmail, KnownEmail } from "@/const/known-emails";

type Props = {
  onSuccess?: (req: LoginDto, res: LoginResponseDto) => void;
  cred?: Credential;
};

const schema = loginSchema;
type Schema = LoginDto;

export default function AuthForm({ onSuccess, cred }: Props) {
  const login = useUserStore((s) => s.login);

  const [knownMail, setKnownMail] = React.useState<KnownEmail | undefined>();

  const { mutate } = useMutation({
    mutationFn: async (data: Schema) => {
      const res = await authService.login({
        email: data.email,
        password: data.password,
        imap: {
          host: data.imap.host,
          port: data.imap.port,
        },
        smtp: {
          host: data.smtp.host,
          port: data.smtp.port,
        },
      });
      sessionService.set(JWT_KEY, res.token);
      return res;
    },
    onSuccess: (res, req) => {
      login({ email: req.email });
      toast.success("Успешная авторизация");
      if (onSuccess) {
        onSuccess(req, res);
      }
    },
    onError: (err, req) => {
      toast.error("Неверный email или пароль");
    },
  });

  const onSubmit = async (data: Schema) => {
    await mutate(data);
  };

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...cred,
      password: "",
    },
  });

  const emailwatch = form.watch("email");

  useEffect(() => {
    if (emailwatch) {
      if (vemail(emailwatch)) {
        const known = isKnownEmail(emailwatch);

        console.log(emailwatch, known);

        setKnownMail(known);

        if (known) {
          form.setValue("imap.host", known.imap.host);
          form.setValue("imap.port", known.imap.port);

          form.setValue("smtp.host", known.smtp.host);
          form.setValue("smtp.port", known.smtp.port);
        } else {
          form.resetField("imap.host");
          form.resetField("imap.port");
          form.resetField("smtp.host");
          form.resetField("smtp.port");
        }
      } else {
        setKnownMail(undefined);
      }
    }
  }, [emailwatch]);

  useEffect(() => {
    if (cred) {
      form.reset({
        ...cred,
        password: "",
      });
    } else {
      form.reset({});
    }
  }, [cred, form]);

  return (
    <div>
      <div className="py-4 px-12 space-y-2 rounded-md border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, console.error)}>
            <div className="space-y-2">
              <div className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="flex gap-x-2">
                          <Input placeholder="email" {...field} />
                          {knownMail ? (
                            <img src={knownMail.image} />
                          ) : (
                            <div className="w-[32px] h-[32px]" />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!knownMail && (
                  <>
                    <div className="flex gap-x-2 items-center">
                      <div className="h-1 bg-gray-200 rounded-sm flex-1" />
                      <span className="flex-2">imap</span>
                      <div className="h-1 bg-gray-200 rounded-sm flex-1" />
                    </div>
                    <div className="grid grid-cols-[1fr_.5fr] gap-x-4">
                      <FormField
                        control={form.control}
                        name="imap.host"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="host"
                                disabled={!!knownMail}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="imap.port"
                        render={({ field }) => (
                          <FormItem className="flex-2">
                            <FormControl>
                              <Input
                                placeholder="port"
                                type="number"
                                disabled={!!knownMail}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <div className="h-1 bg-gray-200 rounded-sm flex-1" />
                      <span className="flex-2">smtp</span>
                      <div className="h-1 bg-gray-200 rounded-sm flex-1" />
                    </div>
                    <div className="grid grid-cols-[1fr_.5fr] gap-x-4">
                      <FormField
                        control={form.control}
                        name="smtp.host"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="host"
                                disabled={!!knownMail}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="smtp.port"
                        render={({ field }) => (
                          <FormItem className="flex-2">
                            <FormControl>
                              <Input
                                placeholder="port"
                                type="number"
                                disabled={!!knownMail}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit">auth</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
