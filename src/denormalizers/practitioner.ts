import type { FhirPractitioner } from "../types/fhir.types";
import type { NormalizedPractitioner } from "../types/normal.types";
import { codingFrom } from "../utils/get-coding";

export function denormalizePractitioner(practitioner: NormalizedPractitioner): FhirPractitioner {
  return {
    resourceType: "Practitioner",
    ...(practitioner.id ? { id: practitioner.id } : {}),
    ...(practitioner.identifierSystem || practitioner.identifierValue
      ? {
          identifier: [
            {
              ...(practitioner.identifierSystem ? { system: practitioner.identifierSystem } : {}),
              ...(practitioner.identifierValue ? { value: practitioner.identifierValue } : {}),
            },
          ],
        }
      : {}),
    ...(practitioner.active !== undefined ? { active: practitioner.active } : {}),
    ...(practitioner.firstName || practitioner.lastName || practitioner.fullName
      ? {
          name: [
            {
              use: "official",
              ...(practitioner.lastName ? { family: practitioner.lastName } : {}),
              ...(practitioner.firstName ? { given: [practitioner.firstName] } : {}),
              ...(practitioner.fullName ? { text: practitioner.fullName } : {}),
            },
          ],
        }
      : {}),
    ...(practitioner.phone || practitioner.email
      ? {
          telecom: [
            ...(practitioner.phone ? [{ system: "phone" as const, value: practitioner.phone }] : []),
            ...(practitioner.email ? [{ system: "email" as const, value: practitioner.email }] : []),
          ],
        }
      : {}),
    ...(practitioner.address
      ? {
          address: [
            {
              ...(practitioner.address.line ? { line: [practitioner.address.line] } : {}),
              ...(practitioner.address.city ? { city: practitioner.address.city } : {}),
              ...(practitioner.address.state ? { state: practitioner.address.state } : {}),
              ...(practitioner.address.postalCode ? { postalCode: practitioner.address.postalCode } : {}),
              ...(practitioner.address.country ? { country: practitioner.address.country } : {}),
            },
          ],
        }
      : {}),
    ...(practitioner.gender ? { gender: practitioner.gender } : {}),
    ...(practitioner.dob ? { birthDate: practitioner.dob } : {}),
    ...(practitioner.qualificationCode || practitioner.qualificationDisplay || practitioner.qualificationIssuer
      ? {
          qualification: [
            {
              ...(practitioner.qualificationCode || practitioner.qualificationDisplay
                ? {
                    code: {
                      coding: codingFrom(practitioner.qualificationCode, practitioner.qualificationDisplay),
                      text: practitioner.qualificationDisplay ?? undefined,
                    },
                  }
                : {}),
              ...(practitioner.qualificationIssuer ? { issuer: { display: practitioner.qualificationIssuer } } : {}),
            },
          ],
        }
      : {}),
    ...(practitioner.language ? { communication: [{ text: practitioner.language }] } : {}),
  };
}
