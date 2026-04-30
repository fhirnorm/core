import type { FhirEncounter } from "../types/fhir.types";
import type { NormalizedEncounter } from "../types/normal.types";
import { getCoding } from "../utils/get-coding";

function referenceId(reference?: string): string | null {
  return reference?.split("/").pop() ?? null;
}

export function normalizeEncounter(encounter: FhirEncounter): NormalizedEncounter {
  const type = getCoding(encounter.type);
  const reason = getCoding(encounter.reasonCode);

  return {
    id: encounter.id,
    resourceType: "Encounter",
    status: encounter.status ?? null,
    class: encounter.class?.code ?? encounter.class?.display ?? null,
    type: type.code,
    display: type.display,
    subjectId: referenceId(encounter.subject?.reference),
    participantId: referenceId(encounter.participant?.[0]?.individual?.reference),
    startDate: encounter.period?.start ?? null,
    endDate: encounter.period?.end ?? null,
    reasonCode: reason.code,
    reasonDisplay: reason.display,
    locationName: encounter.location?.[0]?.location?.display ?? null,
    serviceProvider: encounter.serviceProvider?.display ?? referenceId(encounter.serviceProvider?.reference),
  };
}
