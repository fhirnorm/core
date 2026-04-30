import { describe, expect, it } from "vitest";
import { denormalizeMedicationRequest, normalizeMedicationRequest } from "../src";
import { medicationRequestFixture } from "./fixtures/medication-request.fixture";

describe("medication request normalization", () => {
  it("returns plain medication request fields", () => {
    const medicationRequest = normalizeMedicationRequest(medicationRequestFixture);

    expect(medicationRequest).toMatchObject({
      id: "medrx-1",
      resourceType: "MedicationRequest",
      status: "active",
      intent: "order",
      medicationCode: "860975",
      medicationDisplay: "Metformin 500 MG Oral Tablet",
      subjectId: "patient-1",
      requesterId: "prac-1",
      authoredOn: "2026-01-15",
      dosageInstruction: "Take one tablet by mouth twice daily with meals.",
      frequency: "2 per 1 d",
      route: "Oral route",
      note: "Review renal function at next visit.",
    });
  });

  it("denormalizes to a valid FHIR MedicationRequest structure", () => {
    const fhir = denormalizeMedicationRequest(normalizeMedicationRequest(medicationRequestFixture));

    expect(fhir.resourceType).toBe("MedicationRequest");
    expect(fhir.medicationCodeableConcept?.coding?.[0]?.code).toBe("860975");
    expect(fhir.subject?.reference).toBe("Patient/patient-1");
    expect(fhir.dosageInstruction?.[0]?.timing?.repeat?.frequency).toBe(2);
  });

  it("handles missing optional fields", () => {
    const medicationRequest = normalizeMedicationRequest({ resourceType: "MedicationRequest", id: "minimal" });

    expect(medicationRequest.medicationCode).toBeNull();
    expect(medicationRequest.frequency).toBeNull();
    expect(medicationRequest.note).toBeNull();
  });
});
