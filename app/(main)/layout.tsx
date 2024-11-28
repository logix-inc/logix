import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="relative flex flex-col h-screen" id="app-container">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
