import type { FhirCondition } from "../types/fhir.types";
import type { NormalizedCondition } from "../types/normal.types";
import { codingFrom } from "../utils/get-coding";

export function denormalizeCondition(condition: NormalizedCondition): FhirCondition {
  return {
    resourceType: "Condition",
    ...(condition.id ? { id: condition.id } : {}),
    ...(condition.clinicalStatus ? { clinicalStatus: { coding: codingFrom(condition.clinicalStatus, condition.clinicalStatus) } } : {}),
    ...(condition.verificationStatus ? { verificationStatus: { coding: codingFrom(condition.verificationStatus, condition.verificationStatus) } } : {}),
    ...(condition.code || condition.display
      ? { code: { coding: codingFrom(condition.code, condition.display), text: condition.display ?? undefined } }
      : {}),
    ...(condition.subjectId ? { subject: { reference: `Patient/${condition.subjectId}` } } : {}),
    ...(condition.encounterId ? { encounter: { reference: `Encounter/${condition.encounterId}` } } : {}),
    ...(condition.onsetDate ? { onsetDateTime: condition.onsetDate } : {}),
    ...(condition.abatementDate ? { abatementDateTime: condition.abatementDate } : {}),
    ...(condition.note ? { note: [{ text: condition.note }] } : {}),
  };
}
