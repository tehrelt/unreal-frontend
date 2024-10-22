"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUser, updateUserSchema } from "@/schemas/user";
import { userService } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {};
const schema = updateUserSchema;
type Schema = z.infer<typeof schema>;

const StartForm = (props: Props) => {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const qc = useQueryClient();

  const name = form.watch("name");

  const stop = () => router.push("/");

  const { mutate } = useMutation({
    mutationKey: ["start-update"],
    mutationFn: async (data: Schema) => await userService.update(data),
    onSuccess: () => {
      toast.success("Сохранено");
      qc.invalidateQueries({ queryKey: ["me"] });
      stop();
    },
    onError: (e) => {
      toast.error(`Ошибка: ${e.name}`, {
        description: e.message,
      });
    },
  });

  const onSkip = () => {
    stop();
  };

  const onSubmit = (data: Schema) => {
    mutate(data);
    stop();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, console.warn)}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Настройте аккаунт</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите имя..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            {name ? (
              <Button type="submit">Сохранить</Button>
            ) : (
              <Button variant={"secondary"} type="button" onClick={onSkip}>
                Пропустить
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default StartForm;
