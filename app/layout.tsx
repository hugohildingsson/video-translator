import './globals.css';

export const metadata = {
  title: 'Video Translator',
  description: 'AI-powered video translation for existing video library',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
