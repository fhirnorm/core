import type { FhirPractitioner } from "../../src/types/fhir.types";

export const practitionerFixture: FhirPractitioner = {
  resourceType: "Practitioner",
  id: "prac-1",
  identifier: [{ system: "http://hl7.org/fhir/sid/us-npi", value: "1234567890" }],
  active: true,
  name: [{ use: "official", family: "Rivera", given: ["Elena"], text: "Dr. Elena Rivera" }],
  telecom: [
    { system: "phone", value: "+1-555-0199" },
    { system: "email", value: "elena.rivera@exampleclinic.org" },
  ],
  address: [
    {
      line: ["500 Care Ave"],
      city: "Boston",
      state: "MA",
      postalCode: "02118",
      country: "US",
    },
  ],
  gender: "female",
  birthDate: "1977-09-24",
  qualification: [
    {
      code: { coding: [{ code: "MD", display: "Doctor of Medicine" }] },
      issuer: { reference: "Organization/medical-board-ma", display: "Massachusetts Board of Registration in Medicine" },
    },
  ],
  communication: [{ coding: [{ code: "en", display: "English" }] }],
};
