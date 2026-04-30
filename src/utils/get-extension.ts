import type { FhirExtension } from "../types/fhir.types";

export function getExtension(extensions: FhirExtension[] | undefined, url: string): unknown {
  const extension = extensions?.find((item) => item.url === url);
  if (!extension) {
    return undefined;
  }

  return (
    extension.valueString ??
    extension.valueCode ??
    extension.valueBoolean ??
    extension.valueInteger ??
    extension.valueDecimal ??
    extension.valueDate ??
    extension.valueDateTime ??
    extension.valueCoding ??
    extension.valueCodeableConcept
  );
}
