import type { FhirPatient } from "../types/fhir.types";
import type { NormalizedPatient } from "../types/normal.types";

export function denormalizePatient(patient: NormalizedPatient): FhirPatient {
  return {
    resourceType: "Patient",
    ...(patient.id ? { id: patient.id } : {}),
    ...(patient.active !== undefined ? { active: patient.active } : {}),
    ...(patient.firstName || patient.lastName || patient.fullName
      ? {
          name: [
            {
              use: "official",
              ...(patient.lastName ? { family: patient.lastName } : {}),
              ...(patient.firstName ? { given: [patient.firstName] } : {}),
              ...(patient.fullName ? { text: patient.fullName } : {}),
            },
          ],
        }
      : {}),
    ...(patient.phone || patient.email
      ? {
          telecom: [
            ...(patient.phone ? [{ system: "phone" as const, value: patient.phone }] : []),
            ...(patient.email ? [{ system: "email" as const, value: patient.email }] : []),
          ],
        }
      : {}),
    ...(patient.gender ? { gender: patient.gender } : {}),
    ...(patient.dob ? { birthDate: patient.dob } : {}),
    ...(patient.address
      ? {
          address: [
            {
              ...(patient.address.line ? { line: [patient.address.line] } : {}),
              ...(patient.address.city ? { city: patient.address.city } : {}),
              ...(patient.address.state ? { state: patient.address.state } : {}),
              ...(patient.address.postalCode ? { postalCode: patient.address.postalCode } : {}),
              ...(patient.address.country ? { country: patient.address.country } : {}),
            },
          ],
        }
      : {}),
    ...(patient.maritalStatus
      ? { maritalStatus: { text: patient.maritalStatus } }
      : {}),
    ...(patient.language
      ? { communication: [{ language: { text: patient.language }, preferred: true }] }
      : {}),
  };
}
