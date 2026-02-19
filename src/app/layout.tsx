import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
<body className="bg-white dark:bg-black transition-colors duration-300">
        <AuthProvider>{children}</AuthProvider>

      </body>
    </html>
  );
}
