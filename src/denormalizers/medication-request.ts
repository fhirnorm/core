import type { FhirMedicationRequest } from "../types/fhir.types";
import type { NormalizedMedicationRequest } from "../types/normal.types";
import { codingFrom } from "../utils/get-coding";

function parseFrequency(frequency?: string | null):
  | { frequency?: number; period?: number; periodUnit?: string }
  | undefined {
  const match = frequency?.match(/^(\d+)(?: per (\d+))?(?: (\w+))?$/);
  if (!match) {
    return undefined;
  }

  return {
    frequency: Number(match[1]),
    ...(match[2] ? { period: Number(match[2]) } : {}),
    ...(match[3] ? { periodUnit: match[3] } : {}),
  };
}

export function denormalizeMedicationRequest(
  medicationRequest: NormalizedMedicationRequest,
): FhirMedicationRequest {
  const repeat = parseFrequency(medicationRequest.frequency);

  return {
    resourceType: "MedicationRequest",
    ...(medicationRequest.id ? { id: medicationRequest.id } : {}),
    ...(medicationRequest.status ? { status: medicationRequest.status } : {}),
    ...(medicationRequest.intent ? { intent: medicationRequest.intent } : {}),
    ...(medicationRequest.medicationCode || medicationRequest.medicationDisplay
      ? {
          medicationCodeableConcept: {
            coding: codingFrom(medicationRequest.medicationCode, medicationRequest.medicationDisplay),
            text: medicationRequest.medicationDisplay ?? undefined,
          },
        }
      : {}),
    ...(medicationRequest.subjectId ? { subject: { reference: `Patient/${medicationRequest.subjectId}` } } : {}),
    ...(medicationRequest.requesterId ? { requester: { reference: `Practitioner/${medicationRequest.requesterId}` } } : {}),
    ...(medicationRequest.authoredOn ? { authoredOn: medicationRequest.authoredOn } : {}),
    ...(medicationRequest.dosageInstruction || medicationRequest.route || repeat
      ? {
          dosageInstruction: [
            {
              ...(medicationRequest.dosageInstruction ? { text: medicationRequest.dosageInstruction } : {}),
              ...(repeat ? { timing: { repeat } } : {}),
              ...(medicationRequest.route ? { route: { text: medicationRequest.route } } : {}),
            },
          ],
        }
      : {}),
    ...(medicationRequest.note ? { note: [{ text: medicationRequest.note }] } : {}),
  };
}
