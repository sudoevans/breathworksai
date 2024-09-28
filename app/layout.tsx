import { ClientWrapper } from './components/ClientWrapper';
import './globals.css';
import { GeistSans } from 'geist/font/sans';

let title = 'Personalized Breathwork';
let description =
  'Tailored breathwork sessions designed to improve sleep, reduce stress, and enhance overall well-being.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://breathworksai.vercel.app/'),
};

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={GeistSans.variable}>
      <div className="bg-[url('/videos/starbackground_video.gif')] bg-no-repeat bg-cover">
      <ClientWrapper>{children}</ClientWrapper>
        </div>
      </body>
    </html>
  );
}
