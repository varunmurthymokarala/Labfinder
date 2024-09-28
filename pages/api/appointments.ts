import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Define the Appointment type
interface Appointment {
  id: string;
  providerId: string;
  dateTime: string;
  userEmail: string;
  reservationCode: string;
}

// Path to appointments.json file
const appointmentsFilePath = path.join(process.cwd(), 'appointments.json');

// Helper function to read appointments from file
const getAppointments = (): Appointment[] => {
  let appointments: Appointment[] = [];
  try {
    const data = fs.readFileSync(appointmentsFilePath, 'utf8');
    appointments = JSON.parse(data);
  } catch (error) {
    console.error('Error reading appointments.json:', error);
  }
  return appointments;
};

// Helper function to write appointments to file
const saveAppointments = (appointments: Appointment[]): void => {
  try {
    fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2));
  } catch (error) {
    console.error('Error writing to appointments.json:', error);
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const appointments = getAppointments();

  if (req.method === 'POST') {
    const { providerId, dateTime, userEmail } = req.body;

    // Validation for missing required fields
    if (!providerId || !dateTime || !userEmail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const reservationCode = uuidv4(); // Unique reservation code
    const appointment: Appointment = {
      id: uuidv4(),
      providerId,
      dateTime,
      userEmail,
      reservationCode,
    };

    // Add new appointment
    appointments.push(appointment);
    saveAppointments(appointments);

    return res.status(201).json({ message: 'Appointment successfully created', appointment });

  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const { dateTime } = req.body;

    // Explicitly define the type of the parameter in findIndex
    const appointmentIndex = appointments.findIndex((a: Appointment) => a.id === id);
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Reschedule appointment
    appointments[appointmentIndex].dateTime = dateTime;
    saveAppointments(appointments);

    return res.status(200).json({ message: 'Appointment successfully rescheduled', appointment: appointments[appointmentIndex] });

  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    // Explicitly define the type of the parameter in filter
    const newAppointments = appointments.filter((a: Appointment) => a.id !== id);
    if (newAppointments.length === appointments.length) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    saveAppointments(newAppointments);

    return res.status(200).json({ message: 'Appointment successfully canceled' });

  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
