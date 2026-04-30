import { denormalizeCondition } from "./denormalizers/condition";
import { denormalizeEncounter } from "./denormalizers/encounter";
import { denormalizeMedicationRequest } from "./denormalizers/medication-request";
import { denormalizeObservation } from "./denormalizers/observation";
import { denormalizePatient } from "./denormalizers/patient";
import { normalizeCondition } from "./normalizers/condition";
import { normalizeEncounter } from "./normalizers/encounter";
import { normalizeMedicationRequest } from "./normalizers/medication-request";
import { normalizeObservation } from "./normalizers/observation";
import { normalizePatient } from "./normalizers/patient";
import type { FhirResource } from "./types/fhir.types";
import type {
  NormalizedCondition,
  NormalizedEncounter,
  NormalizedMedicationRequest,
  NormalizedObservation,
  NormalizedPatient,
  NormalizedResource,
} from "./types/normal.types";

export function normalize(resource: FhirResource): NormalizedResource {
  switch (resource.resourceType) {
    case "Patient":
      return normalizePatient(resource);
    case "Observation":
      return normalizeObservation(resource);
    case "Condition":
      return normalizeCondition(resource);
    case "Encounter":
      return normalizeEncounter(resource);
    case "MedicationRequest":
      return normalizeMedicationRequest(resource);
    default:
      throw new Error(`Unsupported FHIR resourceType: ${(resource as { resourceType?: string }).resourceType}`);
  }
}

export function denormalize(resource: NormalizedPatient, resourceType?: "Patient"): ReturnType<typeof denormalizePatient>;
export function denormalize(resource: NormalizedObservation, resourceType?: "Observation"): ReturnType<typeof denormalizeObservation>;
export function denormalize(resource: NormalizedCondition, resourceType?: "Condition"): ReturnType<typeof denormalizeCondition>;
export function denormalize(resource: NormalizedEncounter, resourceType?: "Encounter"): ReturnType<typeof denormalizeEncounter>;
export function denormalize(
  resource: NormalizedMedicationRequest,
  resourceType?: "MedicationRequest",
): ReturnType<typeof denormalizeMedicationRequest>;
export function denormalize(resource: NormalizedResource, resourceType?: NormalizedResource["resourceType"]): FhirResource;
export function denormalize(resource: NormalizedResource, resourceType = resource.resourceType): FhirResource {
  switch (resourceType) {
    case "Patient":
      return denormalizePatient(resource as NormalizedPatient);
    case "Observation":
      return denormalizeObservation(resource as NormalizedObservation);
    case "Condition":
      return denormalizeCondition(resource as NormalizedCondition);
    case "Encounter":
      return denormalizeEncounter(resource as NormalizedEncounter);
    case "MedicationRequest":
      return denormalizeMedicationRequest(resource as NormalizedMedicationRequest);
    default:
      throw new Error(`Unsupported normalized resourceType: ${resourceType}`);
  }
}

export { denormalizeCondition } from "./denormalizers/condition";
export { denormalizeEncounter } from "./denormalizers/encounter";
export { denormalizeMedicationRequest } from "./denormalizers/medication-request";
export { denormalizeObservation } from "./denormalizers/observation";
export { denormalizePatient } from "./denormalizers/patient";
export { normalizeCondition } from "./normalizers/condition";
export { normalizeEncounter } from "./normalizers/encounter";
export { normalizeMedicationRequest } from "./normalizers/medication-request";
export { normalizeObservation } from "./normalizers/observation";
export { normalizePatient } from "./normalizers/patient";
export type * from "./types/normal.types";
