# @fhirnorm/core

Convert FHIR R4 resources to plain normalized JSON and back. This package supports Patient, Observation, Condition, Encounter, MedicationRequest, and Practitioner resources with small, predictable objects that are easier to store, index, display, and transform.

## Install

```bash
npm install @fhirnorm/core
```

## Quick Usage

```ts
import { denormalize, normalize } from "@fhirnorm/core";

const fhirPatient = {
  resourceType: "Patient",
  id: "patient-1",
  name: [{ given: ["Anika"], family: "Sharma", text: "Anika Sharma" }],
  birthDate: "1988-04-12",
  gender: "female",
};

const plainPatient = normalize(fhirPatient);

// {
//   id: "patient-1",
//   resourceType: "Patient",
//   firstName: "Anika",
//   lastName: "Sharma",
//   fullName: "Anika Sharma",
//   dob: "1988-04-12",
//   gender: "female",
//   ...
// }

const backToFhir = denormalize(plainPatient, "Patient");
```

## Supported Resources

| Resource | Key normalized fields |
| --- | --- |
| Patient | `firstName`, `lastName`, `fullName`, `dob`, `gender`, `phone`, `email`, `address`, `maritalStatus`, `active`, `language` |
| Observation | `status`, `code`, `display`, `value`, `unit`, `valueString`, `effectiveDate`, `subjectId`, `encounterId`, `interpretation`, `note` |
| Condition | `code`, `display`, `clinicalStatus`, `verificationStatus`, `onsetDate`, `abatementDate`, `subjectId`, `encounterId`, `note` |
| Encounter | `status`, `class`, `type`, `display`, `subjectId`, `participantId`, `startDate`, `endDate`, `reasonCode`, `reasonDisplay`, `locationName`, `serviceProvider` |
| MedicationRequest | `status`, `intent`, `medicationCode`, `medicationDisplay`, `subjectId`, `requesterId`, `authoredOn`, `dosageInstruction`, `frequency`, `route`, `note` |
| Practitioner | `identifierSystem`, `identifierValue`, `firstName`, `lastName`, `fullName`, `gender`, `dob`, `phone`, `email`, `address`, `active`, `qualificationCode`, `qualificationDisplay`, `qualificationIssuer`, `language` |

## Resource Field Notes

### Practitioner

Practitioner is used for people formally involved in delivering healthcare, such as physicians, nurses, pharmacists, technicians, and other care team members. It is included because other clinical resources commonly reference clinicians as participants, requesters, performers, or authors.

| Normalized field | FHIR R4 source | Why it is used |
| --- | --- | --- |
| `identifierSystem`, `identifierValue` | `identifier[0].system`, `identifier[0].value` | Stores an external clinician identifier, such as an NPI or license number, for matching records across systems. |
| `firstName`, `lastName`, `fullName` | `name[0]` | Supports display, search, and user-facing attribution of clinical actions. |
| `gender`, `dob` | `gender`, `birthDate` | Preserves common demographic fields used in staff identity records. |
| `phone`, `email` | `telecom[]` | Keeps role-independent contact details available for care coordination. |
| `address` | `address[0]` | Captures the practitioner address when present; FHIR notes this is not role-specific. |
| `active` | `active` | Indicates whether the practitioner record is currently in use. |
| `qualificationCode`, `qualificationDisplay` | `qualification[0].code` | Captures credential or training information, such as MD, RN, or PharmD. |
| `qualificationIssuer` | `qualification[0].issuer` | Identifies the organization that issued or regulates the qualification. |
| `language` | `communication[0]` | Captures a language the practitioner can use for patient communication. |

## API

```ts
normalize(fhirResource)
denormalize(plainObject, resourceType)
```

Resource-specific helpers are also exported:

```ts
normalizePatient()
normalizeObservation()
normalizeCondition()
normalizeEncounter()
normalizeMedicationRequest()
normalizePractitioner()

denormalizePatient()
denormalizeObservation()
denormalizeCondition()
denormalizeEncounter()
denormalizeMedicationRequest()
denormalizePractitioner()
```

## Contributing

Issues and pull requests are welcome at [github.com/fhirnorm/fhir-normalizer](https://github.com/fhirnorm/fhir-normalizer).

## License

MIT
