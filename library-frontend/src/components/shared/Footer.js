// src/components/shared/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center p-2">
                  <span className="text-2xl font-bold text-white">L</span>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-800">Library</h1>
                  <p className="text-gray-500">Digital Library & Book Management</p>
                </div>
              </div>
              <p className="text-gray-500">
                Explore knowledge, discover books, and grow with our digital library.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Library Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Library</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-600 hover:text-indigo-600 transition">Home</a></li>
                <li><a href="/books" className="text-gray-600 hover:text-indigo-600 transition">Books</a></li>
                <li><a href="/categories" className="text-gray-600 hover:text-indigo-600 transition">Categories</a></li>
                <li><a href="/new" className="text-gray-600 hover:text-indigo-600 transition">New Arrivals</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Support</h4>
              <ul className="space-y-2">
                <li><a href="/help" className="text-gray-600 hover:text-indigo-600 transition">Help Center</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-indigo-600 transition">Contact Us</a></li>
                <li><a href="/faq" className="text-gray-600 hover:text-indigo-600 transition">FAQ</a></li>
                <li><a href="/support" className="text-gray-600 hover:text-indigo-600 transition">Support Portal</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Stay Updated</h4>
              <p className="text-gray-500">Subscribe to our newsletter for latest updates</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-md hover:from-indigo-700 hover:to-blue-700 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Legal Links */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800">Legal</h4>
              <ul className="space-y-1">
                <li><a href="/privacy" className="text-gray-500 hover:text-indigo-600 transition">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-500 hover:text-indigo-600 transition">Terms of Service</a></li>
                <li><a href="/cookies" className="text-gray-500 hover:text-indigo-600 transition">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Library. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                Built with ❤️ by Library Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;