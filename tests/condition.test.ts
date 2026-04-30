import { describe, expect, it } from "vitest";
import { denormalizeCondition, normalizeCondition } from "../src";
import { conditionFixture } from "./fixtures/condition.fixture";

describe("condition normalization", () => {
  it("returns plain condition fields", () => {
    const condition = normalizeCondition(conditionFixture);

    expect(condition).toMatchObject({
      id: "cond-1",
      resourceType: "Condition",
      code: "44054006",
      display: "Diabetes mellitus type 2",
      clinicalStatus: "active",
      verificationStatus: "confirmed",
      onsetDate: "2021-03-01",
      subjectId: "patient-1",
      encounterId: "enc-1",
      note: "Managed with medication and diet.",
    });
  });

  it("denormalizes to a valid FHIR Condition structure", () => {
    const fhir = denormalizeCondition(normalizeCondition(conditionFixture));

    expect(fhir.resourceType).toBe("Condition");
    expect(fhir.code?.coding?.[0]?.code).toBe("44054006");
    expect(fhir.subject?.reference).toBe("Patient/patient-1");
    expect(fhir.clinicalStatus?.coding?.[0]?.code).toBe("active");
  });

  it("handles missing optional fields", () => {
    const condition = normalizeCondition({ resourceType: "Condition", id: "minimal" });

    expect(condition.code).toBeNull();
    expect(condition.clinicalStatus).toBeNull();
    expect(condition.note).toBeNull();
  });
});
