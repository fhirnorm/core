import type { FhirMedicationRequest } from "../../src/types/fhir.types";

export const medicationRequestFixture: FhirMedicationRequest = {
  resourceType: "MedicationRequest",
  id: "medrx-1",
  status: "active",
  intent: "order",
  medicationCodeableConcept: {
    coding: [{ system: "http://www.nlm.nih.gov/research/umls/rxnorm", code: "860975", display: "Metformin 500 MG Oral Tablet" }],
  },
  subject: { reference: "Patient/patient-1" },
  requester: { reference: "Practitioner/prac-1" },
  authoredOn: "2026-01-15",
  dosageInstruction: [
    {
      text: "Take one tablet by mouth twice daily with meals.",
      timing: { repeat: { frequency: 2, period: 1, periodUnit: "d" } },
      route: { coding: [{ code: "26643006", display: "Oral route" }] },
    },
  ],
  note: [{ text: "Review renal function at next visit." }],
};
