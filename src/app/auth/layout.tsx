import Theme from "~/components/theme";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="bg-background text-foreground relative flex min-h-screen w-full items-center justify-center">
      {children}
      <div className="fixed right-5 bottom-5">
        <Theme className="shadow-md" />
      </div>
    </div>
  );
}

export default AuthLayout;
