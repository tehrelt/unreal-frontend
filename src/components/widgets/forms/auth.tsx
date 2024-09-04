"use client";
import { LoginDto, loginSchema } from "@/schemas/login";
import React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
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

type Props = {
  onSuccess?: () => void;
};

const schema = loginSchema;
type Schema = LoginDto;

export default function AuthForm({ onSuccess }: Props) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: Schema) => {
      const res = await authService.login(data);
      sessionService.set(JWT_KEY, res.token);
      return res;
    },
    onSuccess: (res, req) => {
      toast.success("Успешная авторизация");
      if (onSuccess) {
        onSuccess();
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
      email: "",
      password: "",
      host: "",
      port: 993,
    },
  });

  return (
    <div>
      <div className="border px-12 py-4 rounded-md space-y-2">
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
                        <Input placeholder="email" {...field} />
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
                <FormField
                  control={form.control}
                  name="host"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host</FormLabel>
                      <FormControl>
                        <Input placeholder="host" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Port</FormLabel>
                      <FormControl>
                        <Input placeholder="port" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
