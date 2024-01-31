// Footer.js

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Task Tracker</h2>
          <p>
            Task Tracker is one of the best platform to maintain your daily
            tasks and so many on
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Services</h2>
          <ul>
            <li>
              <a href="#">Web Development</a>
            </li>
            <li>
              <a href="#">Mobile App Development</a>
            </li>
            <li>
              <a href="#">UI/UX Design</a>
            </li>
            <li>
              <a href="#">Digital Marketing</a>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Street, City, Country</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-600 pt-4">
        <p className="text-sm text-gray-500">
          &copy; 2024 Task Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
