import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/customStyles.css';  // Import custom styles

interface Provider {
  id: string;
  facilityName: string;
  doctorName: string;
  specialty: string;
  availableHours?: string[];  // Make availableHours optional to handle cases where it's undefined
}

interface Appointment {
  id: string;
  providerId: string;
  dateTime: string;
  userEmail: string;
  reservationCode: string;
}

const ProvidersInfo = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]); // Initialize appointments as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [rescheduling, setRescheduling] = useState<boolean>(false);
  const [reschedulingAppointmentId, setReschedulingAppointmentId] = useState<string | null>(null);

  // Form fields for booking modal
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Fetch provider data from the API
  useEffect(() => {
    fetch('/api/providers')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch providers');
        return res.json();
      })
      .then((data) => {
        setProviders(data.providers);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error); // Log the error
        setError(error.message);
        setLoading(false);
      });

    // Fetch appointments
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments || [])) // Ensure appointments is an array
      .catch((error) => {
        console.error(error); // Log the error
        setError('Failed to load appointments');
      });
  }, []);

  // Handle "View Details" button click
  const handleViewDetails = (providerId: string) => {
    setSelectedProviderId((prevId) => (prevId === providerId ? null : providerId));
  };

  // Open the booking modal
  const handleBook = (provider: Provider, appointmentTime: string) => {
    setSelectedProvider(provider);
    setAppointmentTime(appointmentTime);
    setIsModalOpen(true);
  };

  // Open reschedule modal
  const handleReschedule = (appointmentId: string, provider: Provider) => {
    setSelectedProvider(provider);
    setReschedulingAppointmentId(appointmentId);
    setIsModalOpen(true);
    setRescheduling(true);
  };

  // Handle booking or rescheduling appointment
  const bookAppointment = async () => {
    if (!userName || !userEmail || !appointmentTime || !selectedProvider) {
      setConfirmationMessage('Please fill in all the details.');
      return;
    }

    setBookingLoading(true);
    try {
      const url = rescheduling ? `/api/appointments/${reschedulingAppointmentId}` : '/api/appointments';
      const method = rescheduling ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerId: selectedProvider.id,
          dateTime: appointmentTime,
          userEmail,
        }),
      });
 
      

      const result = await res.json();
      console.log('API Response:', result);  // Log the response from the API
      

      if (res.ok) {
        setConfirmationMessage(rescheduling ? 'Your appointment has been rescheduled' : 'Your appointment has been confirmed');
      } else {
        setConfirmationMessage(result.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setConfirmationMessage('Error occurred while booking appointment');
    } finally {
      setBookingLoading(false);
      setIsModalOpen(false);  // Close modal after booking
      setRescheduling(false);
      setReschedulingAppointmentId(null);
    }
  };
  

  // Handle canceling appointment
  const cancelAppointment = async (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const res = await fetch(`/api/appointments/${appointmentId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setConfirmationMessage('Appointment canceled successfully');
          setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
        } else {
          setConfirmationMessage('Failed to cancel appointment');
        }
      } catch (error) {
        console.error('Error canceling appointment:', error);
        setConfirmationMessage('Error occurred while canceling appointment');
      }
    }
  };

  // Close the booking modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate back to home page
  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8 text-center flex justify-between items-center px-8">
        <h1 className="text-4xl font-bold">Labfinder(Assessment - Varun Mokarala)</h1>
        <h2 className="mt-4 text-lg">Your one-stop platform for lab & radiology testing</h2>
        <button className="btn-secondary" onClick={goToHome}>
          Return to Home
        </button>
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          


          {/* Appointments List (for reschedule/cancel) */}
          
          <div className="feature-card">
            <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">Your Appointments</h2>
            <button className="btn-secondary" >
            Re-schedule
            </button>
            <button className="btn-secondary">
            Cancel
            </button>
            
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appointment) => {
                  const provider = providers.find((p) => p.id === appointment.providerId);

                  return (
                    <li key={appointment.id} className="p-4 border border-gray-300 rounded-md mb-4">
                      <p>Provider: {provider ? provider.facilityName : 'Provider not found'}</p>
                      <p>DateTime: {appointment.dateTime}</p>

                      <button onClick={() => cancelAppointment(appointment.id)} className="btn-secondary">
                        Cancel Appointment
                      </button>

                      {provider ? (
                        <button onClick={() => handleReschedule(appointment.id, provider)} className="btn-primary">
                          Reschedule Appointment
                        </button>
                      ) : (
                        <p>Provider not found for this appointment</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>

          {/* Confirmation Message */}
          {confirmationMessage && (
            <div className="feature-card">
            <div className="mb-6 p-4 bg-green-100 text-green-700 text-center rounded-md">
              {confirmationMessage}
            </div></div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loading-circle"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-600 p-4 bg-red-100 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {/* Providers List */}
          <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">Providers List</h2>
                {/* Booking Modal */}
                {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3 className="text-xl font-bold text-indigo-600 mb-4">{rescheduling ? 'Reschedule Appointment' : 'Book Appointment'}</h3>
                <div className="modal-content">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input type="text" className="input-field" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input type="email" className="input-field" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  <label className="block text-gray-700 mb-2">Appointment Time</label>
                  <input type="text" className="input-field" value={appointmentTime} readOnly />
                </div>

                <div className="flex justify-between mt-4">
                  <button className="btn-primary" onClick={bookAppointment}>
                    {bookingLoading ? 'Processing...' : rescheduling ? 'Confirm Reschedule' : 'Confirm Appointment'}
                  </button>
                  <button className="btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
            {/* Providers List */}
            
          {!loading && !error && providers.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <div key={provider.id} className="card hover:shadow-xl transform hover:scale-105 transition">
                  <h3 className="text-xl font-bold text-indigo-600">{provider.facilityName}</h3>
                  <p className="text-gray-600">Doctor: {provider.doctorName}</p>
                  <p className="text-gray-600">Specialty: {provider.specialty}</p>

                  <div className="flex justify-between items-center mt-4">
                    <button className="btn-primary" onClick={() => handleViewDetails(provider.id)}>
                      {selectedProviderId === provider.id ? "Hide Details" : "View Details"}
                    </button>

                    {/* Display inline details if this provider is selected */}
                    {selectedProviderId === provider.id && (
                      <div className="provider-details ml-4 p-4 bg-indigo-100 rounded-lg shadow-lg">
                        <h4 className="text-lg font-bold text-indigo-600">Available Hours</h4>
                        <ul className="mt-2 space-y-2">
                          {/* Safely check availableHours */}
                          {provider.availableHours && provider.availableHours.length > 0 ? (
                            provider.availableHours.map((hour, index) => (
                              <li key={index} className="bg-indigo-200 px-2 py-1 rounded-lg flex justify-between items-center">
                                <span>{hour}</span>
                                <button
                                  className="btn-secondary"
                                  onClick={() => handleBook(provider, hour)}
                                  disabled={bookingLoading}
                                >
                                  {bookingLoading ? 'Booking...' : 'Book'}
                                </button>
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-600">No available hours.</p>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          
        </div>
      </main>



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

export default ProvidersInfo;
