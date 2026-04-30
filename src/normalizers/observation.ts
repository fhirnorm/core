import type { FhirObservation } from "../types/fhir.types";
import type { NormalizedObservation } from "../types/normal.types";
import { getCoding } from "../utils/get-coding";

function referenceId(reference?: string): string | null {
  return reference?.split("/").pop() ?? null;
}

export function normalizeObservation(observation: FhirObservation): NormalizedObservation {
  const code = getCoding(observation.code);
  const interpretation = getCoding(observation.interpretation);

  return {
    id: observation.id,
    resourceType: "Observation",
    status: observation.status ?? null,
    code: code.code,
    display: code.display,
    value: observation.valueQuantity?.value ?? null,
    unit: observation.valueQuantity?.unit ?? observation.valueQuantity?.code ?? null,
    valueString: observation.valueString ?? null,
    effectiveDate: observation.effectiveDateTime ?? null,
    subjectId: referenceId(observation.subject?.reference),
    encounterId: referenceId(observation.encounter?.reference),
    interpretation: interpretation.display ?? interpretation.code ?? null,
    note: observation.note?.[0]?.text ?? null,
  };
}
