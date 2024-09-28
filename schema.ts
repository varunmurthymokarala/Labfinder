import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Provider {
    id: ID!
    facilityName: String!
    doctorName: String!
    specialty: String!
    availableHours: [String!]!
  }

  type Appointment {
    id: ID!
    providerId: String!
    dateTime: String!
    userEmail: String
    reservationCode: String!
  }

  type Query {
    providers: [Provider!]!
    provider(id: ID!): Provider
    appointments: [Appointment!]!
    appointment(id: ID!): Appointment
  }

  type Mutation {
    createAppointment(providerId: ID!, dateTime: String!, userEmail: String): Appointment
    rescheduleAppointment(appointmentId: ID!, newDateTime: String!): Appointment
    cancelAppointment(appointmentId: ID!): Boolean
  }
`;
