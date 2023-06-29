import { Inter, Open_Sans } from 'next/font/google';

import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';

import './globals.css';
import ActiveStatus from './components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Messenger Clone',
  description: 'Created with 💖',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={sans.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
