import type { FhirPatient } from "../types/fhir.types";
import type { NormalizedPatient } from "../types/normal.types";
import { getCoding } from "../utils/get-coding";
import { getName } from "../utils/get-name";

export function normalizePatient(patient: FhirPatient): NormalizedPatient {
  const name = getName(patient.name);
  const address = patient.address?.[0];
  const phone = patient.telecom?.find((item) => item.system === "phone")?.value ?? null;
  const email = patient.telecom?.find((item) => item.system === "email")?.value ?? null;

  return {
    id: patient.id,
    resourceType: "Patient",
    ...name,
    dob: patient.birthDate ?? null,
    gender: patient.gender ?? null,
    phone,
    email,
    address: {
      line: address?.line?.join(", ") ?? null,
      city: address?.city ?? null,
      state: address?.state ?? null,
      postalCode: address?.postalCode ?? null,
      country: address?.country ?? null,
    },
    maritalStatus: getCoding(patient.maritalStatus).display,
    active: patient.active,
    language: getCoding(patient.communication?.[0]?.language).display,
  };
}
