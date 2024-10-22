import { Header } from "@/components/widgets/header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen relative">
      <Header className={"flex-2 border-b border-b-primary-foreground"} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
