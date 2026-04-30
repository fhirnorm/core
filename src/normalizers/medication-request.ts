import type { FhirMedicationRequest } from "../types/fhir.types";
import type { NormalizedMedicationRequest } from "../types/normal.types";
import { getCoding } from "../utils/get-coding";

function referenceId(reference?: string): string | null {
  return reference?.split("/").pop() ?? null;
}

function frequencyText(repeat?: { frequency?: number; period?: number; periodUnit?: string }): string | null {
  if (!repeat?.frequency) {
    return null;
  }

  const period = repeat.period ? ` per ${repeat.period}` : "";
  const unit = repeat.periodUnit ? ` ${repeat.periodUnit}` : "";
  return `${repeat.frequency}${period}${unit}`.trim();
}

export function normalizeMedicationRequest(
  medicationRequest: FhirMedicationRequest,
): NormalizedMedicationRequest {
  const medication = getCoding(medicationRequest.medicationCodeableConcept);
  const dosage = medicationRequest.dosageInstruction?.[0];

  return {
    id: medicationRequest.id,
    resourceType: "MedicationRequest",
    status: medicationRequest.status ?? null,
    intent: medicationRequest.intent ?? null,
    medicationCode: medication.code,
    medicationDisplay: medication.display,
    subjectId: referenceId(medicationRequest.subject?.reference),
    requesterId: referenceId(medicationRequest.requester?.reference),
    authoredOn: medicationRequest.authoredOn ?? null,
    dosageInstruction: dosage?.text ?? null,
    frequency: frequencyText(dosage?.timing?.repeat),
    route: getCoding(dosage?.route).display,
    note: medicationRequest.note?.[0]?.text ?? null,
  };
}
