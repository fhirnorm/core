import type { FhirCondition } from "../types/fhir.types";
import type { NormalizedCondition } from "../types/normal.types";
import { getCoding } from "../utils/get-coding";

function referenceId(reference?: string): string | null {
  return reference?.split("/").pop() ?? null;
}

export function normalizeCondition(condition: FhirCondition): NormalizedCondition {
  const code = getCoding(condition.code);

  return {
    id: condition.id,
    resourceType: "Condition",
    code: code.code,
    display: code.display,
    clinicalStatus: getCoding(condition.clinicalStatus).code,
    verificationStatus: getCoding(condition.verificationStatus).code,
    onsetDate: condition.onsetDateTime ?? null,
    abatementDate: condition.abatementDateTime ?? null,
    subjectId: referenceId(condition.subject?.reference),
    encounterId: referenceId(condition.encounter?.reference),
    note: condition.note?.[0]?.text ?? null,
  };
}
