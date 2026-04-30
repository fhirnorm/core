import type { FhirCodeableConcept, FhirCoding } from "../types/fhir.types";

export interface CodingResult {
  code?: string | null;
  display?: string | null;
}

export function getCoding(
  concept?: FhirCodeableConcept | FhirCodeableConcept[] | null,
): CodingResult {
  const item = Array.isArray(concept) ? concept[0] : concept;
  const coding = item?.coding?.[0];

  return {
    code: coding?.code ?? null,
    display: coding?.display ?? item?.text ?? null,
  };
}

export function codingFrom(code?: string | null, display?: string | null): FhirCoding[] | undefined {
  if (!code && !display) {
    return undefined;
  }

  return [
    {
      ...(code ? { code } : {}),
      ...(display ? { display } : {}),
    },
  ];
}
