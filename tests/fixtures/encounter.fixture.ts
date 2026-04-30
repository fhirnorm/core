import type { FhirEncounter } from "../../src/types/fhir.types";

export const encounterFixture: FhirEncounter = {
  resourceType: "Encounter",
  id: "enc-1",
  status: "finished",
  class: { system: "http://terminology.hl7.org/CodeSystem/v3-ActCode", code: "AMB", display: "ambulatory" },
  type: [{ coding: [{ code: "185349003", display: "Encounter for check up" }] }],
  subject: { reference: "Patient/patient-1" },
  participant: [{ individual: { reference: "Practitioner/prac-1", display: "Dr. Rivera" } }],
  period: { start: "2026-01-15T10:00:00Z", end: "2026-01-15T10:45:00Z" },
  reasonCode: [{ coding: [{ code: "routine", display: "Routine follow-up" }] }],
  location: [{ location: { reference: "Location/clinic-1", display: "Downtown Clinic" } }],
  serviceProvider: { reference: "Organization/org-1", display: "FHIRNorm Medical Group" },
};
