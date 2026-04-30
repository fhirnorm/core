import type { FhirObservation } from "../types/fhir.types";
import type { NormalizedObservation } from "../types/normal.types";
import { codingFrom } from "../utils/get-coding";

export function denormalizeObservation(observation: NormalizedObservation): FhirObservation {
  return {
    resourceType: "Observation",
    ...(observation.id ? { id: observation.id } : {}),
    ...(observation.status ? { status: observation.status } : {}),
    ...(observation.code || observation.display
      ? { code: { coding: codingFrom(observation.code, observation.display), text: observation.display ?? undefined } }
      : {}),
    ...(observation.value !== null && observation.value !== undefined
      ? { valueQuantity: { value: observation.value, ...(observation.unit ? { unit: observation.unit, code: observation.unit } : {}) } }
      : {}),
    ...(observation.valueString ? { valueString: observation.valueString } : {}),
    ...(observation.effectiveDate ? { effectiveDateTime: observation.effectiveDate } : {}),
    ...(observation.subjectId ? { subject: { reference: `Patient/${observation.subjectId}` } } : {}),
    ...(observation.encounterId ? { encounter: { reference: `Encounter/${observation.encounterId}` } } : {}),
    ...(observation.interpretation ? { interpretation: [{ text: observation.interpretation }] } : {}),
    ...(observation.note ? { note: [{ text: observation.note }] } : {}),
  };
}
