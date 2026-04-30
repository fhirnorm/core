# @fhirnorm/core

Convert FHIR R4 resources to plain normalized JSON and back. This package supports Patient, Observation, Condition, Encounter, and MedicationRequest resources with small, predictable objects that are easier to store, index, display, and transform.

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

denormalizePatient()
denormalizeObservation()
denormalizeCondition()
denormalizeEncounter()
denormalizeMedicationRequest()
```

## Contributing

Issues and pull requests are welcome at [github.com/fhirnorm/fhir-normalizer](https://github.com/fhirnorm/fhir-normalizer).

## License

MIT
