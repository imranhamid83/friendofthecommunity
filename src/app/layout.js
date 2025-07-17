import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Welcome to Muslims in Amersham",
  description: "We bring people together to bring harmony in our communities",
  keywords: [
    "Muslims in Amersham",
    "Amersham Muslims",
    "Amersham communities",
    "Amersham minorities",
    "Muslims in Little Chalfont",
    "Little Chalfont Muslims"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-300">
                  Friends of the Community is dedicated to bringing people together and creating harmony in our communities.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/AboutUs" className="text-gray-300 hover:text-white">About Us</a></li>
                  <li><a href="/conference" className="text-gray-300 hover:text-white">Events</a></li>
                  <li><a href="/ContactUs" className="text-gray-300 hover:text-white">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Fill the form on the <a href="/ContactUs" className="text-gray-300 hover:text-white">Contact Us</a> page</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Muslims in Amersham. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
