import "./globals.css";

export const metadata = {
  title: "Urdu Story Generator",
  description: "Kids Urdu Story AI App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-urdu">
        {children}
      </body>
    </html>
  );
}