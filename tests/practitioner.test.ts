import { describe, expect, it } from "vitest";
import { denormalize, denormalizePractitioner, normalize, normalizePractitioner } from "../src";
import { practitionerFixture } from "./fixtures/practitioner.fixture";

describe("practitioner normalization", () => {
  it("returns plain practitioner fields", () => {
    const practitioner = normalizePractitioner(practitionerFixture);

    expect(practitioner).toMatchObject({
      id: "prac-1",
      resourceType: "Practitioner",
      identifierSystem: "http://hl7.org/fhir/sid/us-npi",
      identifierValue: "1234567890",
      firstName: "Elena",
      lastName: "Rivera",
      fullName: "Dr. Elena Rivera",
      gender: "female",
      dob: "1977-09-24",
      phone: "+1-555-0199",
      email: "elena.rivera@exampleclinic.org",
      active: true,
      qualificationCode: "MD",
      qualificationDisplay: "Doctor of Medicine",
      qualificationIssuer: "Massachusetts Board of Registration in Medicine",
      language: "English",
    });
    expect(practitioner.address?.city).toBe("Boston");
  });

  it("denormalizes to a valid FHIR Practitioner structure", () => {
    const fhir = denormalizePractitioner(normalizePractitioner(practitionerFixture));

    expect(fhir.resourceType).toBe("Practitioner");
    expect(fhir.identifier?.[0]?.value).toBe("1234567890");
    expect(fhir.name?.[0]?.given).toEqual(["Elena"]);
    expect(fhir.qualification?.[0]?.code?.coding?.[0]?.code).toBe("MD");
    expect(denormalize(normalize(practitionerFixture), "Practitioner").resourceType).toBe("Practitioner");
  });

  it("handles missing optional fields", () => {
    const practitioner = normalizePractitioner({ resourceType: "Practitioner", id: "minimal" });

    expect(practitioner.identifierValue).toBeNull();
    expect(practitioner.firstName).toBeNull();
    expect(practitioner.qualificationCode).toBeNull();
    expect(practitioner.address?.city).toBeNull();
  });
});
