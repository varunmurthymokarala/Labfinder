// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
//import '../styles/customStyles.css'; 

const LoginPage = () => {
  const router = useRouter();  // Next.js router instance for navigation
  const [isRegistering, setIsRegistering] = useState<boolean>(false);  // Toggle between Login and Register forms

  // Handle login (mock login)
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate a login and set the user as logged in
    router.push('/providersInfo');  // Redirect to /providersInfo after login
  };

  // Handle registration (mock register)
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate a registration and log the user in
    router.push('/providersInfo');  // Redirect to /providersInfo after registration
  };

  // Toggle between Login and Register forms
  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Labfinder(Assessment - Varun Mokarala)</h1>
        <h2 className="mt-2">Your one-stop platform for lab & radiology testing</h2>
      </header>


      <main className="flex-grow p-6">
      
        <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
            {isRegistering ? 'Register New User' : 'Login'}
          </h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            {isRegistering && (
              <>
                <input className="input-field" type="text" placeholder="Your Name" required />
                <input className="input-field" type="text" placeholder="Contact Number" required />
              </>
            )}
            <input className="input-field" type="email" placeholder="Email" required />
            <input className="input-field" type="password" placeholder="Password" required />
            <button className="w-full btn-primary" type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <p className="text-center mt-4">
            {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
            <span onClick={toggleForm} className="text-indigo-600 cursor-pointer hover:underline">
            <button className="w-full btn-primary" type="submit">
              {isRegistering ? 'Login here' : 'Register here'}
              </button>
            </span>
          </p>
        </div>
      </main>
      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Make an Appointment</h3>
            <p className="text-gray-600 text-center mt-2">
            Book your next lab or radiology test with ease. Choose from a range of available slots and healthcare providers.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Reschedule or Cancel Appointments</h3>
            <p className="text-gray-600 text-center mt-2">
            Need to make changes to your appointment? Easily reschedule or cancel your bookings with just a few clicks.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Manage Your Current Bookings</h3>
            <p className="text-gray-600 text-center mt-2">
            View your upcoming appointments, and stay on top of your health schedule.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Access Your Health Records</h3>
            <p className="text-gray-600 text-center mt-2">
            View and download your lab results, radiology reports, and other medical records at your convenience.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Stay Informed & Updated</h3>
            <p className="text-gray-600 text-center mt-2">
            Receive timely notifications and reminders about your appointments, upcoming tests, and new health insights.
            </p>
          </div>
        </div>
      </section>
      
      
      {/* Footer Section */}
      <footer className="bg-purple-700 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-xl font-bold mb-4">LabFinder</h4>
            <ul className="space-x-1.5">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">The Illuminator</a></li>
              <li><a href="#" className="hover:text-gray-300">The Insider</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
            </ul>
            <p>Office Locations: New York | Georgia  | Florida | Texas</p>
            <p>contact: 9849872341</p>
            <p>helpdesk@labfinder.com</p>
            <p>© 2024 Healthcare Services. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
