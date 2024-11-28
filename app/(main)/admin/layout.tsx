export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="inline-block max-w-7xl">{children}</div>
    </section>
  );
}
