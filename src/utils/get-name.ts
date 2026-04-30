import type { FhirHumanName } from "../types/fhir.types";

export interface NameResult {
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
}

export function getName(names?: FhirHumanName[]): NameResult {
  const name = names?.find((item) => item.use === "official") ?? names?.[0];
  const firstName = name?.given?.[0] ?? null;
  const lastName = name?.family ?? null;
  const fullName =
    name?.text ??
    [firstName, lastName].filter(Boolean).join(" ") ??
    null;

  return {
    firstName,
    lastName,
    fullName: fullName || null,
  };
}
