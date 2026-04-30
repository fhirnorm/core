import type { FhirPatient } from "../../src/types/fhir.types";

export const patientFixture: FhirPatient = {
  resourceType: "Patient",
  id: "patient-1",
  active: true,
  name: [{ use: "official", family: "Sharma", given: ["Anika"], text: "Anika Sharma" }],
  telecom: [
    { system: "phone", value: "+1-555-0101" },
    { system: "email", value: "anika.sharma@example.com" },
  ],
  gender: "female",
  birthDate: "1988-04-12",
  address: [
    {
      line: ["123 Health St", "Apt 4B"],
      city: "Boston",
      state: "MA",
      postalCode: "02118",
      country: "US",
    },
  ],
  maritalStatus: {
    coding: [{ code: "M", display: "Married" }],
  },
  communication: [{ language: { coding: [{ code: "en", display: "English" }] }, preferred: true }],
};
