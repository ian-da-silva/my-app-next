// app/layout.tsx
import "./globals.css";
import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "MercadoBG",
  description: "Marketplace de Board Games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light">
      {/* Raiz controla altura total e empurra o Footer para o fim */}
      <body className="min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
