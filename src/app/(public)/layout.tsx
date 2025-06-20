import Header from "@/widgets/header/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="mt-header-width pt-5">{children}</main>
    </div>
  );
}
