---
id: decodeUUID
title: Decode UUID
---

## decodeUUID

The `decodeUUID` function decodes a UUID into its internal components, including version, variant, timestamps for time-based UUIDs, and other metadata. Supports `RFC4122` UUID versions: 1-8.

### Function Signature

```ts
decodeUUID(uuid: string): DecodedUUID | null
```

### Parameters

| Parameter | Type     | Description                |
| --------- | -------- | -------------------------- |
| `uuid`    | `string` | The UUID string to decode. |

### Return Value

Returns a structured `DecodedUUID` object for valid UUIDs, or `null` for invalid UUIDs.

### Example Usage

```ts
import { decodeUUID, uuid } from 'nhb-toolbox/hash';

// Decode a random UUID v4
const info1 = decodeUUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");
// → { version: 4, variant: 'RFC4122', raw: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', ... }

// Decode a time-based UUID v1
const v1UUID = uuid({ version: "v1" });
const info2 = decodeUUID(v1UUID);
// → { version: 1, variant: 'RFC4122', timestamp: 1711234567890, node: 'eb303ca57c47', ... }

// Decode a v7 UUID (time-based)
const v7Info = decodeUUID("019ac9df-f35d-74ee-9b49-4f6b5ab39b68");
// → { version: 7, variant: 'RFC4122', timestamp: 1764323488605, ... }

// Invalid UUID returns null
const invalid = decodeUUID("not-a-uuid");
// → null
```

### Return Type

```ts
interface DecodedUUID {
  /** Original UUID string */
  raw: UUID<UUIDVersion>;
  /** Plain version without hyphens */
  plain: string;
  /** UUID version as number (1-8) */
  version: $UUIDVersion;
  /** UUID variant specification */
  variant: 'NCS' | 'RFC4122' | 'Microsoft' | 'Future';
  /** Single integer representation as BigInt */
  singleInt: bigint;
  /** Timestamp in milliseconds since Unix epoch (v1, v6, v7, v8) */
  timestamp?: number;
  /** Node identifier for v1 UUIDs */
  node?: string;
}
```

### Features

- **Cross-runtime compatibility**: Works in any JavaScript environment
- **Spec-accurate decoding**: Follows RFC4122 standards precisely
- **Timestamp conversion**: Automatically converts v1/v6 timestamps from UUID epoch (1582-10-15) to Unix milliseconds
- **Variant detection**: Identifies all standard UUID variants (NCS, RFC4122, Microsoft, Future)
- **BigInt support**: Provides the UUID as a single integer for mathematical operations

### Timestamp Handling

| Version   | Timestamp Source | Precision | Notes                                               |
| --------- | ---------------- | --------- | --------------------------------------------------- |
| **v1/v6** | UUID timestamp   | 100ns     | Converted from Gregorian epoch (1582) to Unix epoch |
| **v7**    | Unix timestamp   | 1ms       | Direct mapping to Unix time                         |
| **v8**    | Custom layout    | Varies    | Returns timestamp if matches known layout           |
| **v3/v5** | No timestamp     | N/A       | Hash-based UUIDs contain no time information        |

### Limitations

- **v2 UUIDs**: Specific decoding not implemented (deprecated standard)
- **v8 layouts**: Only returns timestamp for known layouts; custom layouts have limited decoding
- **Variant detection**: Based on RFC4122 rules; some edge cases may not be handled

### Use Cases

- Debugging and analyzing UUID generation
- Extracting creation timestamps from time-based UUIDs
- Validating UUID structure and compliance
- Converting between UUID representations
- Audit logging and traceability

### See Also

- [uuid](uuid) - Generate UUIDs across all versions
- [isUUID](/docs/guards/mixed-guards#isuuid) - Validate UUID strings
- [randomHex](randomHex) - Generate random hexadecimal strings
