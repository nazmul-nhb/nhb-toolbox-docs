---
id: extract-color-values
title: Extract Color Values
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Utility functions to extract numeric values from CSS color strings in RGB/RGBA/HSL/HSLA formats with strict format validation.

## Import

```typescript
import { extractSolidColorValues, extractAlphaColorValues } from 'nhb-toolbox';
import type { HSL, HSLA, RGB, RGBA } from 'nhb-toolbox/types/colors';
```

## Function Signatures

```typescript
// For solid colors (RGB/HSL)
function extractSolidColorValues(color: HSL | RGB): SolidValues;

// For alpha colors (RGBA/HSLA)
function extractAlphaColorValues(color: HSLA | RGBA): AlphaValues;
```

## Usage Examples

<Tabs>
<TabItem value="solid" label="Solid Colors" default>

### RGB Extraction

```typescript
const rgbValues = extractSolidColorValues('rgb(66, 103, 69)');
// Returns [66, 103, 69]
```

### HSL Extraction

```typescript
const hslValues = extractSolidColorValues('hsl(120, 42.86%, 41.18%)');
// Returns [120, 42.86, 41.18]
```

### Invalid Solid Color

```typescript
const invalid = extractSolidColorValues('rgba(255, 0, 0, 0.5)');
// Returns [0, 0, 0] - fails RGB/HSL check
```

</TabItem>
<TabItem value="alpha" label="Alpha Colors">

### RGBA Extraction

```typescript
const rgbaValues = extractAlphaColorValues('rgba(66, 103, 69, 0.6)');
// Returns [66, 103, 69, 0.6]
```

### HSLA Extraction

```typescript
const hslaValues = extractAlphaColorValues('hsla(120, 42.86%, 41.18%, 0.9)');
// Returns [120, 42.86, 41.18, 0.9]
```

### Invalid Alpha Color

```typescript
const invalid = extractAlphaColorValues('rgb(255, 0, 0)');
// Returns [0, 0, 0, 0] - fails RGBA/HSLA check
```

</TabItem>
</Tabs>

## Behavior Details

1. **Number Extraction**: Parses numeric values from color strings
2. **Strict Validation**: Uses internal type guards (`_isRGB`, `_isHSL`, etc.) to verify formats and ranges
3. **Percentage Handling**: Converts percentages to decimal numbers (e.g., `50.2%` → `50.2`)
4. **Fallback Values**: Returns `[0, 0, 0]` or `[0, 0, 0, 0]` for invalid formats
5. **Type Safety**: Returns typed tuples matching expected value counts
6. **Format-Specific**: Each function handles only its designated color formats

## Implementation Notes

1. **Validation Includes**:
   - RGB values must be 0-255 integers
   - HSL saturation/lightness must be 0-100% percentages
   - Alpha must be 0-1 (inclusive)
   - Exact function syntax matching

2. **Performance**:
   - Type guards optimize validation
   - Single regex pass for extraction
   - No unnecessary conversions

## Key Differences

| Feature       | `extractSolidColorValues` | `extractAlphaColorValues` |
|---------------|---------------------------|---------------------------|
| Input Formats | RGB, HSL                  | RGBA, HSLA                |
| Return Length | 3 values                  | 4 values                  |
| Alpha Channel | No                        | Yes                       |

## Validation Rules

| Function                  | Valid Formats            | Invalid Examples                                                |
|---------------------------|--------------------------|-----------------------------------------------------------------|
| `extractSolidColorValues` | `rgb(...)`, `hsl(...)`   | `rgba(...)`, `hsla(...)`, hex, named colors or any other inputs |
| `extractAlphaColorValues` | `rgba(...)`, `hsla(...)` | `rgb(...)`, `hsl(...)`, hex, named colors or any other inputs   |

## Recommended Use Cases

- Color manipulation utilities
- CSS-in-JS implementations
- Color conversion functions
- CSS preprocessors
- Design system utilities
- Data visualization tools
- Theme configuration systems

## Limitations

1. **Format Strict**: Only works with CSS functional notation
2. **No Hex Support**: Doesn't handle hex color formats
3. **No Named Colors**: Doesn't support color names like 'red'
4. **No Error Handling**: Silently returns zeroes for invalid formats

## Type Definitions

```ts
/** * Represents a tuple of three numerical values corresponding to RGB or HSL color components. */
type SolidValues = [number, number, number];

/** * Represents a tuple of four numerical values corresponding to RGBA or HSLA color components. */
type AlphaValues = [number, number, number, number];

/**
 * * Represents an RGB color string.
 * * Format: `rgb(R, G, B)`
 *
 * - R (Red): 0-255
 * - G (Green): 0-255
 * - B (Blue): 0-255
 */
type RGB =
 | `rgb(${number}, ${number}, ${number})`
 | `rgb(${number},${number},${number})`;

/**
 * * Represents an HSL color string.
 * * Format: `hsl(H, S%, L%)`
 *
 * - H (Hue): 0-360
 * - S (Saturation): 0-100%
 * - L (Lightness): 0-100%
 */
type HSL =
 | `hsl(${number}, ${number}%, ${number}%)`
 | `hsl(${number},${number}%,${number}%)`;

/**
 * * Represents an RGBA color string, now includes optional alpha (opacity).
 * * Format: `rgba(R, G, B, A)`
 */
type RGBA =
 | `rgba(${number}, ${number}, ${number}, ${number})`
 | `rgba(${number},${number},${number},${number})`;

/**
 * * Represents an HSLA color string with optional alpha channel.
 * * Format: `hsla(H, S%, L%, A)`
 */
type HSLA =
 | `hsla(${number}, ${number}%, ${number}%, ${number})`
 | `hsla(${number},${number}%,${number}%,${number})`;
 ```
