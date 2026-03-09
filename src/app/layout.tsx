import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ember & Oak Catering | Full-Service Catering & Pizza Truck',
  description: 'Premium catering and wood-fired pizza truck for weddings, corporate events, and private parties. Serving the San Diego, Orange County, and Los Angeles areas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-darkest text-white antialiased font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl font-serif tracking-wider font-bold">ember & oak</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-1">catering</span>
              </a>
              <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-gray-300">
                <a href="/#about" className="hover:text-white transition-colors">About</a>
                <a href="/#services" className="hover:text-white transition-colors">Services</a>
                <a href="/#reviews" className="hover:text-white transition-colors">Reviews</a>
                <a href="/book" className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-semibold">
                  Book Now!
                </a>
              </div>
              {/* Mobile menu button */}
              <a href="/book" className="md:hidden px-3 py-1.5 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                Book Now!
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="bg-darker border-t border-white/10 py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 text-gray-400">Address</h4>
              <div className="h-px w-12 bg-gold mx-auto mb-4" />
              <p className="font-semibold text-sm">Ember & Oak Catering</p>
              <p className="text-gray-400 text-sm">1247 Fireside Lane</p>
              <p className="text-gray-400 text-sm">Suite B</p>
              <p className="text-gray-400 text-sm">San Diego, CA 92101</p>
              <a href="tel:6197361750" className="text-gold text-sm hover:underline mt-1 inline-block">619-555-0142</a>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 text-gray-400">Hours of Operation</h4>
              <div className="h-px w-12 bg-gold mx-auto mb-4" />
              <p className="text-gray-400 text-sm">By Appointment</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 text-gray-400">Connect</h4>
              <div className="h-px w-12 bg-gold mx-auto mb-4" />
              <div className="flex justify-center gap-4">
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </span>
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-10 text-gray-500 text-xs">
            &copy; 2026 Ember & Oak Catering. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
