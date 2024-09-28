import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

interface Provider {
  id: string;
  facilityName: string;
  doctorName: string;
  specialty: string;
  availableHours: string[];
}

interface Appointment {
  id: string;
  providerId: string;
  dateTime: string;
  userEmail: string;
  reservationCode: string;
}

// Get file paths for providers and appointments
const providersFilePath = path.join(process.cwd(), 'providers.json');
const appointmentsFilePath = path.join(process.cwd(), 'appointments.json');

// Load providers data
let providersData: Provider[] = [];
try {
  providersData = JSON.parse(fs.readFileSync(providersFilePath, 'utf8')).providers;
} catch (error) {
  console.error('Error reading providers.json:', error);
}

// Load appointments data
let appointmentsData: Appointment[] = [];
try {
  if (fs.existsSync(appointmentsFilePath)) {
    appointmentsData = JSON.parse(fs.readFileSync(appointmentsFilePath, 'utf8'));
  } else {
    // Create an empty file if it doesn't exist
    fs.writeFileSync(appointmentsFilePath, JSON.stringify([]));
  }
} catch (error) {
  console.error('Error reading appointments.json:', error);
}

export const resolvers = {
  Query: {
    // Fetch all providers
    providers: () => providersData,

    // Fetch a single provider by ID
    provider: (_: any, { id }: { id: string }) => providersData.find((p: Provider) => p.id === id),

    // Fetch all appointments
    appointments: () => appointmentsData,

    // Fetch a single appointment by ID
    appointment: (_: any, { id }: { id: string }) => appointmentsData.find((a: Appointment) => a.id === id),
  },

  Mutation: {
    // Book a new appointment
    createAppointment: (_: any, { providerId, dateTime, userEmail }: { providerId: string; dateTime: string; userEmail: string }) => {
      // Check if the provider exists
      const provider = providersData.find((p: Provider) => p.id === providerId);
      if (!provider) {
        throw new Error('Provider not found');
      }

      // Check if the selected time is available
      if (!provider.availableHours.includes(dateTime)) {
        throw new Error('Selected time is not available');
      }

      // Generate a unique reservation code and ID for the appointment
      const reservationCode = uuidv4();
      const appointment: Appointment = {
        id: uuidv4(),
        providerId,
        dateTime,
        userEmail,
        reservationCode,
      };

      // Add the appointment to the data array
      appointmentsData.push(appointment);

      // Write the updated appointments to the file
      try {
        fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointmentsData, null, 2));
      } catch (error) {
        console.error('Error writing to appointments.json:', error);
        throw new Error('Failed to save appointment');
      }

      return appointment;
    },

    // Reschedule an existing appointment
    rescheduleAppointment: (_: any, { appointmentId, newDateTime }: { appointmentId: string; newDateTime: string }) => {
      const appointmentIndex = appointmentsData.findIndex((a) => a.id === appointmentId);

      if (appointmentIndex === -1) {
        throw new Error('Appointment not found');
      }

      const appointment = appointmentsData[appointmentIndex];

      // Check if the provider has the new time available
      const provider = providersData.find((p) => p.id === appointment.providerId);
      if (!provider || !provider.availableHours.includes(newDateTime)) {
        throw new Error('Selected time is not available');
      }

      // Update the appointment's dateTime
      appointmentsData[appointmentIndex].dateTime = newDateTime;

      // Save updated appointments data
      try {
        fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointmentsData, null, 2));
      } catch (error) {
        console.error('Error writing to appointments.json:', error);
        throw new Error('Failed to reschedule appointment');
      }

      return appointmentsData[appointmentIndex];
    },

    // Cancel an appointment
    cancelAppointment: (_: any, { appointmentId }: { appointmentId: string }) => {
      const appointmentIndex = appointmentsData.findIndex((a) => a.id === appointmentId);

      if (appointmentIndex === -1) {
        throw new Error('Appointment not found');
      }

      // Remove the appointment from the array
      appointmentsData.splice(appointmentIndex, 1);

      // Save updated appointments data
      try {
        fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointmentsData, null, 2));
      } catch (error) {
        console.error('Error writing to appointments.json:', error);
        throw new Error('Failed to cancel appointment');
      }

      return true;
    },
  },
};
