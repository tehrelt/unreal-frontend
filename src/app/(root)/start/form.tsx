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
import { updateUserSchema } from "@/schemas/user";
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
    mutationFn: async (data: FormData) => await userService.update(data),
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
    const fd = new FormData();

    if (data.name) {
      fd.append("name", data.name);
    }
    if (file) {
      fd.append("picture", file);
    }

    mutate(fd);
    stop();
  };

  const [file, setFile] = React.useState<File | undefined>();

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

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Файл</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="file"
                      type="file"
                      formEncType="multipart/form-data"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            {!!name || file ? (
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
