import { describe, expect, it } from "vitest";
import { denormalizeObservation, normalizeObservation } from "../src";
import { observationFixture } from "./fixtures/observation.fixture";

describe("observation normalization", () => {
  it("returns plain observation fields", () => {
    const observation = normalizeObservation(observationFixture);

    expect(observation).toMatchObject({
      id: "obs-1",
      resourceType: "Observation",
      status: "final",
      code: "8480-6",
      display: "Systolic blood pressure",
      value: 122,
      unit: "mmHg",
      effectiveDate: "2026-01-15T10:30:00Z",
      subjectId: "patient-1",
      encounterId: "enc-1",
      interpretation: "Normal",
      note: "Taken while seated.",
    });
  });

  it("denormalizes to a valid FHIR Observation structure", () => {
    const fhir = denormalizeObservation(normalizeObservation(observationFixture));

    expect(fhir.resourceType).toBe("Observation");
    expect(fhir.code?.coding?.[0]?.code).toBe("8480-6");
    expect(fhir.subject?.reference).toBe("Patient/patient-1");
    expect(fhir.valueQuantity?.value).toBe(122);
  });

  it("handles missing optional fields", () => {
    const observation = normalizeObservation({ resourceType: "Observation", id: "minimal" });

    expect(observation.code).toBeNull();
    expect(observation.value).toBeNull();
    expect(observation.subjectId).toBeNull();
  });
});
