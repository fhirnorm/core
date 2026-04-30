import type { FhirObservation } from "../../src/types/fhir.types";

export const observationFixture: FhirObservation = {
  resourceType: "Observation",
  id: "obs-1",
  status: "final",
  code: {
    coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }],
  },
  subject: { reference: "Patient/patient-1" },
  encounter: { reference: "Encounter/enc-1" },
  effectiveDateTime: "2026-01-15T10:30:00Z",
  valueQuantity: { value: 122, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" },
  interpretation: [{ coding: [{ code: "N", display: "Normal" }] }],
  note: [{ text: "Taken while seated." }],
};
