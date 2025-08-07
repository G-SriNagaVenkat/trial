const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-500/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-rocket text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-gradient">CareerLaunch</span>
            </div>
            <p className="text-gray-400">
              Accelerating tech careers through guaranteed internship programs and industry-leading education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" data-testid="social-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" data-testid="social-linkedin">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" data-testid="social-instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" data-testid="social-youtube">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-course-fullstack">Full Stack Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-course-datascience">AI & Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-course-mobile">Mobile Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-course-cloud">Cloud Engineering</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-course-ux">UX/UI Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-course-security">Cybersecurity</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-about">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-team">Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-careers">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-success">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-partners">Partner Companies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-press">Press</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-help">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-contact">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-portal">Student Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-refund">Refund Policy</a></li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm" data-testid="footer-copyright">
            © 2024 CareerLaunch. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Guaranteed Placement</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">98% Success Rate</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">500+ Partner Companies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
