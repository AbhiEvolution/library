const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
              L
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">Library</span>
          </div>
          <p className="text-gray-500">
            Explore knowledge, discover books, and grow with our digital library.
          </p>
        </div>

        {/* Navigation - Library */}
        <div>
          <h4 className="text-gray-800 font-medium mb-4">Library</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
            <li><a href="/books" className="hover:text-indigo-600 transition">Books</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-gray-800 font-medium mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:text-indigo-600 transition">Help Center</a></li>
            <li><a href="/contact" className="hover:text-indigo-600 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-gray-800 font-medium mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-indigo-600 transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
