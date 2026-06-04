export interface NormalizedAddress {
  line?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
}

export interface NormalizedPatient {
  id?: string;
  resourceType: "Patient";
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  dob?: string | null;
  gender?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: NormalizedAddress;
  maritalStatus?: string | null;
  active?: boolean;
  language?: string | null;
}

export interface NormalizedObservation {
  id?: string;
  resourceType: "Observation";
  status?: string | null;
  code?: string | null;
  display?: string | null;
  value?: number | null;
  unit?: string | null;
  valueString?: string | null;
  effectiveDate?: string | null;
  subjectId?: string | null;
  encounterId?: string | null;
  interpretation?: string | null;
  note?: string | null;
}

export interface NormalizedCondition {
  id?: string;
  resourceType: "Condition";
  code?: string | null;
  display?: string | null;
  clinicalStatus?: string | null;
  verificationStatus?: string | null;
  onsetDate?: string | null;
  abatementDate?: string | null;
  subjectId?: string | null;
  encounterId?: string | null;
  note?: string | null;
}

export interface NormalizedEncounter {
  id?: string;
  resourceType: "Encounter";
  status?: string | null;
  class?: string | null;
  type?: string | null;
  display?: string | null;
  subjectId?: string | null;
  participantId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  reasonCode?: string | null;
  reasonDisplay?: string | null;
  locationName?: string | null;
  serviceProvider?: string | null;
}

export interface NormalizedMedicationRequest {
  id?: string;
  resourceType: "MedicationRequest";
  status?: string | null;
  intent?: string | null;
  medicationCode?: string | null;
  medicationDisplay?: string | null;
  subjectId?: string | null;
  requesterId?: string | null;
  authoredOn?: string | null;
  dosageInstruction?: string | null;
  frequency?: string | null;
  route?: string | null;
  note?: string | null;
}

export interface NormalizedPractitioner {
  id?: string;
  resourceType: "Practitioner";
  identifierSystem?: string | null;
  identifierValue?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  gender?: string | null;
  dob?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: NormalizedAddress;
  active?: boolean;
  qualificationCode?: string | null;
  qualificationDisplay?: string | null;
  qualificationIssuer?: string | null;
  language?: string | null;
}

export type NormalizedResource =
  | NormalizedPatient
  | NormalizedObservation
  | NormalizedCondition
  | NormalizedEncounter
  | NormalizedMedicationRequest
  | NormalizedPractitioner;
