import { describe, expect, it } from "vitest";
import { denormalize, denormalizePatient, normalize, normalizePatient } from "../src";
import { patientFixture } from "./fixtures/patient.fixture";

describe("patient normalization", () => {
  it("returns plain patient fields", () => {
    const patient = normalizePatient(patientFixture);

    expect(patient).toMatchObject({
      id: "patient-1",
      resourceType: "Patient",
      firstName: "Anika",
      lastName: "Sharma",
      fullName: "Anika Sharma",
      dob: "1988-04-12",
      gender: "female",
      phone: "+1-555-0101",
      email: "anika.sharma@example.com",
      maritalStatus: "Married",
      active: true,
      language: "English",
    });
    expect(patient.address?.line).toBe("123 Health St, Apt 4B");
  });

  it("denormalizes to a valid FHIR Patient structure", () => {
    const fhir = denormalizePatient(normalizePatient(patientFixture));

    expect(fhir.resourceType).toBe("Patient");
    expect(fhir.name?.[0]?.given).toEqual(["Anika"]);
    expect(fhir.telecom?.map((item) => item.system)).toEqual(["phone", "email"]);
    expect(denormalize(normalize(patientFixture), "Patient").resourceType).toBe("Patient");
  });

  it("handles missing optional fields", () => {
    const patient = normalizePatient({ resourceType: "Patient", id: "minimal" });

    expect(patient.firstName).toBeNull();
    expect(patient.phone).toBeNull();
    expect(patient.address?.city).toBeNull();
  });
});
