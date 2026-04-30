import { describe, expect, it } from "vitest";
import { denormalizeEncounter, normalizeEncounter } from "../src";
import { encounterFixture } from "./fixtures/encounter.fixture";

describe("encounter normalization", () => {
  it("returns plain encounter fields", () => {
    const encounter = normalizeEncounter(encounterFixture);

    expect(encounter).toMatchObject({
      id: "enc-1",
      resourceType: "Encounter",
      status: "finished",
      class: "AMB",
      type: "185349003",
      display: "Encounter for check up",
      subjectId: "patient-1",
      participantId: "prac-1",
      startDate: "2026-01-15T10:00:00Z",
      endDate: "2026-01-15T10:45:00Z",
      reasonCode: "routine",
      reasonDisplay: "Routine follow-up",
      locationName: "Downtown Clinic",
      serviceProvider: "FHIRNorm Medical Group",
    });
  });

  it("denormalizes to a valid FHIR Encounter structure", () => {
    const fhir = denormalizeEncounter(normalizeEncounter(encounterFixture));

    expect(fhir.resourceType).toBe("Encounter");
    expect(fhir.class?.code).toBe("AMB");
    expect(fhir.subject?.reference).toBe("Patient/patient-1");
    expect(fhir.period?.end).toBe("2026-01-15T10:45:00Z");
  });

  it("handles missing optional fields", () => {
    const encounter = normalizeEncounter({ resourceType: "Encounter", id: "minimal" });

    expect(encounter.class).toBeNull();
    expect(encounter.participantId).toBeNull();
    expect(encounter.locationName).toBeNull();
  });
});
