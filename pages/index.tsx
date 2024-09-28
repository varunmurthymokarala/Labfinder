import { useRouter } from 'next/router';
import '../styles/customStyles.css';  // Import custom styles

const HomePage = () => {
  const router = useRouter();

  // Redirect to login page
  const goToLogin = () => {
    router.push('/login');
  };

  // Redirect to providers info page
  const goToProvidersInfo = () => {
    router.push('/providersInfo');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12 text-center">
        <h1 className="text-5xl font-bold">Labfinder(Assessment - Varun Mokarala)</h1>
        <h2 className="mt-4 text-lg">Your one-stop platform for lab & radiology testing</h2>
        <button className="mt-6 btn-primary" onClick={goToLogin}>
          My account
        </button>
      </header>

        {/* Call to Action */}
        <div className="feature-card">
        <section className="bg-indigo-100 py-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-700">Ready to Take Control of Your Health?</h2>
        <p className="text-lg text-gray-700 mt-4">
          Sign up or log in to schedule your tests, view results, and manage your healthcare online.
        </p>
        <button className="mt-6 btn-primary" onClick={goToLogin}>
          Sign Up / Log In
        </button>
        <button className="mt-6 btn-secondary" onClick={goToProvidersInfo}>
          Book an appointment
        </button>
      </section>
      </div>
      

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">Our Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Comprehensive Diagnostics</h3>
            <p className="text-gray-600 text-center mt-2">
              Get accurate results with our wide range of diagnostic tests available at your convenience.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Advanced Radiology</h3>
            <p className="text-gray-600 text-center mt-2">
              Our cutting-edge imaging services help in early detection and effective treatment.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold text-center mt-4">Virtual Consultation</h3>
            <p className="text-gray-600 text-center mt-2">
              Get expert consultation from the comfort of your home, any time of the day.
            </p>
          </div>
        </div>
      </section>

    

      {/* Services Section with Flexbox for Horizontal Layout */}
      <section className="services max-w-6xl mx-auto py-12 px-6">
      <div className="feature-card">
        <div className="column">
          <h4>Insurances</h4>
          <ul>
            <li>Aetna</li>
            <li>Cigna</li>
            <li>Oxford</li>
            <li>United Healthcare</li>
            <li>Emblem Health GHI</li>
            <li>Empire Plan</li>
            <li>Medicare</li>
            <li>Magnacare</li>
            <li>Multiplan PHCS</li>
          </ul>
        </div></div>

        <div className="feature-card">
        <div className="column">
          <h4>Top Lab Tests</h4>
          <ul>
            <li>QuantiFERON (TB Test)</li>
            <li>Drug Test - Urine</li>
            <li>Pregnancy Test (Beta-hCG)</li>
            <li>Cholesterol Test (Lipid Panel)</li>
            <li>STI Testing (STD)</li>
            <li>PCR COVID-19 Swab Test</li>
            <li>Thyroid Level (TSH)</li>
            <li>Blood Sugar Test (Hemoglobin A1C)</li>
            <li>Lyme Disease Test</li>
          </ul>
        </div></div>

        <div className="feature-card">
        <div className="column">
          <h4>Basic Lab Tests</h4>
          <ul>
            <li>Complete Blood Count</li>
            <li>Blood Glucose Test</li>
            <li>Lipid Panel</li>
            <li>Liver Function Test</li>
            <li>Kidney Function Test</li>
            <li>Thyroid Function Test</li>
            <li>Hemoglobin A1C</li>
            <li>Prothrombin Time (PT/INR)</li>
            <li>Iron Panel</li>
          </ul>
        </div></div>

        

        <div className="feature-card">
        <div className="column">
        
          <h4>Top Rad Tests</h4>
          <ul>
            <li>Coronary Calcium Score</li>
            <li>Heart/Coronary Arteries CTA</li>
            <li>Abdominal Ultrasound</li>
            <li>Exercise Stress Echo</li>
            <li>Screening Mammogram</li>
            <li>Chest PA/LAT X-ray</li>
            <li>Breast Ultrasound (Sonogram)</li>
            <li>Heart MRI (Cardiac MRI)</li>
            <li>Brain MRI</li>
          </ul></div>
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

export default HomePage;
