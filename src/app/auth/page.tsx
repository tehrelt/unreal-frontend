"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthForm from "@/components/widgets/forms/auth";
import { LoginDto, LoginResponseDto } from "@/schemas/login";
import { useCredentials } from "@/store/credentials";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const savedCredentials = useCredentials((s) => s.credentials);
  const save = useCredentials((s) => s.save);
  const getCred = useCredentials((s) => s.at);

  const [credIndex, setCredIndex] = React.useState<string | undefined>();
  const clearCred = () => setCredIndex("");

  const onAuth = (req: LoginDto, res: LoginResponseDto) => {
    const url = from ?? "/";
    router.push(url);
    save({ email: req.email, host: req.host, port: req.port });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="px-2 py-1 space-y-4">
        {savedCredentials.length != 0 && (
          <>
            <div className="flex gap-x-2">
              <Select value={credIndex} onValueChange={setCredIndex}>
                <SelectTrigger>
                  <SelectValue placeholder="saved creds" />
                </SelectTrigger>
                <SelectContent>
                  {savedCredentials.map((cred, i) => (
                    <SelectItem
                      key={cred.email + cred.host}
                      value={i.toString()}
                    >
                      <div className="flex flex-col">
                        <span className="">{cred.email}</span>
                        <span className="text-sm text-muted-foreground">
                          {cred.host}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant={"ghost"} onClick={clearCred}>
                <Trash size={16} />
              </Button>
            </div>
            <hr />
          </>
        )}

        <AuthForm
          onSuccess={onAuth}
          cred={credIndex ? getCred(Number(credIndex)) : undefined}
        />
      </div>
    </div>
  );
};

export default Page;
