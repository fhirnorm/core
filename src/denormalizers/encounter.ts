import type { FhirEncounter } from "../types/fhir.types";
import type { NormalizedEncounter } from "../types/normal.types";
import { codingFrom } from "../utils/get-coding";

export function denormalizeEncounter(encounter: NormalizedEncounter): FhirEncounter {
  return {
    resourceType: "Encounter",
    ...(encounter.id ? { id: encounter.id } : {}),
    ...(encounter.status ? { status: encounter.status } : {}),
    ...(encounter.class ? { class: { code: encounter.class, display: encounter.class } } : {}),
    ...(encounter.type || encounter.display
      ? { type: [{ coding: codingFrom(encounter.type, encounter.display), text: encounter.display ?? undefined }] }
      : {}),
    ...(encounter.subjectId ? { subject: { reference: `Patient/${encounter.subjectId}` } } : {}),
    ...(encounter.participantId
      ? { participant: [{ individual: { reference: `Practitioner/${encounter.participantId}` } }] }
      : {}),
    ...(encounter.startDate || encounter.endDate
      ? { period: { ...(encounter.startDate ? { start: encounter.startDate } : {}), ...(encounter.endDate ? { end: encounter.endDate } : {}) } }
      : {}),
    ...(encounter.reasonCode || encounter.reasonDisplay
      ? { reasonCode: [{ coding: codingFrom(encounter.reasonCode, encounter.reasonDisplay), text: encounter.reasonDisplay ?? undefined }] }
      : {}),
    ...(encounter.locationName ? { location: [{ location: { display: encounter.locationName } }] } : {}),
    ...(encounter.serviceProvider ? { serviceProvider: { display: encounter.serviceProvider } } : {}),
  };
}
