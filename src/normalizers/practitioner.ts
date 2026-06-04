import type { FhirPractitioner } from "../types/fhir.types";
import type { NormalizedPractitioner } from "../types/normal.types";
import { getCoding } from "../utils/get-coding";
import { getName } from "../utils/get-name";

export function normalizePractitioner(practitioner: FhirPractitioner): NormalizedPractitioner {
  const name = getName(practitioner.name);
  const address = practitioner.address?.[0];
  const identifier = practitioner.identifier?.[0];
  const qualification = practitioner.qualification?.[0];
  const qualificationCode = getCoding(qualification?.code);
  const phone = practitioner.telecom?.find((item) => item.system === "phone")?.value ?? null;
  const email = practitioner.telecom?.find((item) => item.system === "email")?.value ?? null;

  return {
    id: practitioner.id,
    resourceType: "Practitioner",
    identifierSystem: identifier?.system ?? null,
    identifierValue: identifier?.value ?? null,
    ...name,
    gender: practitioner.gender ?? null,
    dob: practitioner.birthDate ?? null,
    phone,
    email,
    address: {
      line: address?.line?.join(", ") ?? null,
      city: address?.city ?? null,
      state: address?.state ?? null,
      postalCode: address?.postalCode ?? null,
      country: address?.country ?? null,
    },
    active: practitioner.active,
    qualificationCode: qualificationCode.code,
    qualificationDisplay: qualificationCode.display,
    qualificationIssuer: qualification?.issuer?.display ?? qualification?.issuer?.reference ?? null,
    language: getCoding(practitioner.communication).display,
  };
}
