export interface FhirCoding {
  system?: string;
  code?: string;
  display?: string;
}

export interface FhirCodeableConcept {
  coding?: FhirCoding[];
  text?: string;
}

export interface FhirReference {
  reference?: string;
  display?: string;
}

export interface FhirIdentifier {
  system?: string;
  value?: string;
}

export interface FhirExtension {
  url?: string;
  valueString?: string;
  valueCode?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueDecimal?: number;
  valueDate?: string;
  valueDateTime?: string;
  valueCoding?: FhirCoding;
  valueCodeableConcept?: FhirCodeableConcept;
}

export interface FhirHumanName {
  use?: string;
  family?: string;
  given?: string[];
  text?: string;
}

export interface FhirContactPoint {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
  use?: string;
}

export interface FhirAddress {
  line?: string[];
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface FhirAnnotation {
  text?: string;
  time?: string;
}

export interface FhirPeriod {
  start?: string;
  end?: string;
}

export interface FhirPatient {
  resourceType: "Patient";
  id?: string;
  active?: boolean;
  name?: FhirHumanName[];
  telecom?: FhirContactPoint[];
  gender?: string;
  birthDate?: string;
  address?: FhirAddress[];
  maritalStatus?: FhirCodeableConcept;
  communication?: Array<{
    language?: FhirCodeableConcept;
    preferred?: boolean;
  }>;
  extension?: FhirExtension[];
}

export interface FhirObservation {
  resourceType: "Observation";
  id?: string;
  status?: string;
  code?: FhirCodeableConcept;
  subject?: FhirReference;
  encounter?: FhirReference;
  effectiveDateTime?: string;
  valueQuantity?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  valueString?: string;
  interpretation?: FhirCodeableConcept[];
  note?: FhirAnnotation[];
}

export interface FhirCondition {
  resourceType: "Condition";
  id?: string;
  clinicalStatus?: FhirCodeableConcept;
  verificationStatus?: FhirCodeableConcept;
  code?: FhirCodeableConcept;
  subject?: FhirReference;
  encounter?: FhirReference;
  onsetDateTime?: string;
  abatementDateTime?: string;
  note?: FhirAnnotation[];
}

export interface FhirEncounter {
  resourceType: "Encounter";
  id?: string;
  status?: string;
  class?: FhirCoding;
  type?: FhirCodeableConcept[];
  subject?: FhirReference;
  participant?: Array<{
    individual?: FhirReference;
  }>;
  period?: {
    start?: string;
    end?: string;
  };
  reasonCode?: FhirCodeableConcept[];
  location?: Array<{
    location?: FhirReference;
  }>;
  serviceProvider?: FhirReference;
}

export interface FhirMedicationRequest {
  resourceType: "MedicationRequest";
  id?: string;
  status?: string;
  intent?: string;
  medicationCodeableConcept?: FhirCodeableConcept;
  subject?: FhirReference;
  requester?: FhirReference;
  authoredOn?: string;
  dosageInstruction?: Array<{
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    route?: FhirCodeableConcept;
  }>;
  note?: FhirAnnotation[];
}

export interface FhirPractitioner {
  resourceType: "Practitioner";
  id?: string;
  identifier?: FhirIdentifier[];
  active?: boolean;
  name?: FhirHumanName[];
  telecom?: FhirContactPoint[];
  address?: FhirAddress[];
  gender?: string;
  birthDate?: string;
  qualification?: Array<{
    identifier?: FhirIdentifier[];
    code?: FhirCodeableConcept;
    period?: FhirPeriod;
    issuer?: FhirReference;
  }>;
  communication?: FhirCodeableConcept[];
}

export type FhirResource =
  | FhirPatient
  | FhirObservation
  | FhirCondition
  | FhirEncounter
  | FhirMedicationRequest
  | FhirPractitioner;
