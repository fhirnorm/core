import type { FhirCondition } from "../../src/types/fhir.types";

export const conditionFixture: FhirCondition = {
  resourceType: "Condition",
  id: "cond-1",
  clinicalStatus: { coding: [{ code: "active", display: "Active" }] },
  verificationStatus: { coding: [{ code: "confirmed", display: "Confirmed" }] },
  code: {
    coding: [{ system: "http://snomed.info/sct", code: "44054006", display: "Diabetes mellitus type 2" }],
  },
  subject: { reference: "Patient/patient-1" },
  encounter: { reference: "Encounter/enc-1" },
  onsetDateTime: "2021-03-01",
  note: [{ text: "Managed with medication and diet." }],
};
