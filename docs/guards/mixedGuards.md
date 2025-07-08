---
id: mixed-guards
title: Mixed Guards
---

Collection of domain-specific type guards for validating common data formats and runtime environments.

<!-- markdownlint-disable-file MD024 -->
## Import

```typescript
import {
  isEmail, isEmailArray, isDateString, isUUID,
  isBrowser, isNode, isURL, isBase64,
  isPhoneNumber, isIPAddress, isEnvironment,
  isNumericString
} from 'nhb-toolbox';
```

## String Format Guards

### `isEmail`

```typescript
function isEmail(value: unknown): value is string
```

#### Description

Validates if a string conforms to standard email format. Uses comprehensive regex pattern covering:

- Local part (before @)
- Domain part (after @)
- Top-level domain (2+ characters)
- Common special characters (., %, +, -)

#### Examples

```typescript
// Valid emails
isEmail('user@example.com');      // true
isEmail('first.last@sub.domain.co.uk'); // true
isEmail('user+filter@example.org'); // true

// Invalid emails
isEmail('plainstring');           // false
isEmail('user@.com');             // false
isEmail('@example.com');          // false
isEmail('user@domain');           // false

// Type narrowing
const input: unknown = 'test@example.com';
if (isEmail(input)) {
  const [local, domain] = input.split('@'); // input is string
}
```

### `isEmailArray`

```typescript
function isEmailArray(value: unknown): value is string[]
```

#### Description

Validates that all elements in an array are valid email strings. Combines array and email validation in single operation.

#### Examples

```typescript
// Valid cases
isEmailArray(['a@b.com', 'x@y.org']); // true
isEmailArray([]);                     // true (empty array considered valid)

// Invalid cases
isEmailArray(['invalid', 'a@b.com']); // false
isEmailArray('not an array');         // false

// Practical usage
function processContacts(emails: unknown) {
  if (isEmailArray(emails)) {
    return emails.map(sendNewsletter); // emails is string[]
  }
  throw new Error('Invalid email list');
}
```

### `isDateString`

```typescript
function isDateString(value: unknown): value is string
```

#### Description

Validates if a string can be parsed into a valid Date. More strict than direct Date parsing as it requires properly formatted date strings.

#### Examples

```typescript
// Valid date strings
isDateString('2023-01-01');        // true
isDateString('2020-02-29T12:00:00Z'); // true (leap year)

// Invalid cases
isDateString('not a date');        // false
isDateString('2023-02-30');       // false (invalid date)
isDateString(1234567890);         // false (timestamp number)

// Usage with Date conversion
function parseDate(input: unknown) {
  return isDateString(input) ? new Date(input) : null;
}
```

### `isUUID`

```typescript
function isUUID(value: unknown): value is string
```

#### Description

Validates if a string is a version 4 UUID following RFC 4122 standard format. Checks:

- 8-4-4-4-12 hex digit pattern
- Version 4 marker ('4' in third group)
- Variant marker (8, 9, a, or b in fourth group)

#### Examples

```typescript
// Valid UUIDv4
isUUID('d9428888-122b-11e8-b642-0ed5f89f718b'); // true
isUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8'); // true

// Invalid formats
isUUID('not-a-uuid');             // false
isUUID('12345678-1234-1234-1234-123456789abc'); // false (invalid version)
isUUID(123456789);                // false

// Practical usage
interface Resource {
  id: string;
  name: string;
}

function validateResource(res: unknown): res is Resource {
  return isObject(res) && isUUID(res.id) && isString(res.name);
}
```

### `isURL`

```typescript
function isURL(value: unknown): value is string
```

#### Description

Validates if a string is a properly formatted URL using the browser's URL constructor. Checks:

- Valid protocol (http/https/ftp etc.)
- Proper domain structure
- Optional path/query/hash components

#### Examples

```typescript
// Valid URLs
isURL('https://example.com');     // true
isURL('ftp://files.test/path?q=1'); // true
isURL('//cdn.domain/image.png');  // true (protocol-relative)

// Invalid URLs
isURL('example.com');             // false (missing protocol)
isURL('http://');                 // false (empty domain)
isURL(123456);                    // false

// Safe URL creation
function createLink(href: unknown) {
  return isURL(href) ? new URL(href) : null;
}
```

### `isBase64`

```typescript
function isBase64(value: unknown): value is string
```

#### Description

Validates if a string is properly Base64 encoded. Accepts both standard and URL-safe variants including padding.

#### Examples

```typescript
// Valid Base64
isBase64('SGVsbG8gd29ybGQ=');     // true
isBase64('YWJjMTIz');             // true
isBase64('AAECAwQF');             // true

// Invalid cases
isBase64('Not base64!');          // false
isBase64('SGVsbG8gd29ybGQ');      // false (missing padding)
isBase64({});                     // false

// Decoding safely
function decodeBase64(input: unknown) {
  return isBase64(input) ? atob(input) : null;
}
```

### `isPhoneNumber`

```typescript
function isPhoneNumber(value: unknown): value is string
```

#### Description

Validates international phone numbers using E.164 format standard. Checks:

- Optional leading +
- Country code (1-15 digits)
- Subscriber number

#### Examples

```typescript
// Valid numbers
isPhoneNumber('+1234567890');     // true
isPhoneNumber('11234567890');     // true
isPhoneNumber('+441234567890');   // true

// Invalid numbers
isPhoneNumber('123-456-7890');    // false (contains separators)
isPhoneNumber('1800FLOWERS');     // false (contains letters)
isPhoneNumber('+123');            // false (too short)

// Formatting example
function formatPhone(input: unknown) {
  if (isPhoneNumber(input)) {
    return input.startsWith('+') ? input : `+${input}`;
  }
  return null;
}
```

### `isIPAddress`

```typescript
function isIPAddress(value: unknown): value is string
```

#### Description

Validates both IPv4 and IPv6 address formats including:

- IPv4 dotted notation (192.168.1.1)
- IPv6 hexadecimal notation (2001:0db8:85a3::8a2e:0370:7334)
- Compressed IPv6 forms
- Does NOT validate range/scope

#### Examples

```typescript
// Valid IPs
isIPAddress('192.168.1.1');       // true
isIPAddress('::1');               // true (IPv6 localhost)
isIPAddress('2001:db8::8a2e:370:7334'); // true

// Invalid IPs
isIPAddress('256.300.1.1');       // false (invalid octet)
isIPAddress('localhost');         // false
isIPAddress('192.168.1');         // false (incomplete)

// Usage
function blockIP(ip: unknown) {
  if (isIPAddress(ip)) {
    firewall.addBlock(ip);  // ip is string
  }
}
```

### `isNumericString`

```typescript
function isNumericString(value: unknown): value is `${number}`
```

#### Description

Validates whether a value is a **string that fully represents a finite number**.

This function checks:

- ✅ Integers: `'42'`, `'-15'`
- ✅ Decimals: `'3.14'`, `'0.5'`, `'-.99'`
- ✅ Scientific notation: `'1e5'`, `'-2.5e-3'`
- ✅ Strings with leading/trailing whitespace (they are trimmed)

It **excludes** any string that would result in:

- ❌ `NaN` (e.g. `'abc'`, `''`, `'42px'`)
- ❌ `Infinity`, `-Infinity`
- ❌ Hexadecimal numbers (e.g. `'0xFF'`)
- ❌ Strings that only partially parse into a number

Internally uses `Number.isFinite(Number(value))` for validation.

---

#### Examples

```typescript
// ✅ Valid cases
isNumericString('42');            // true
isNumericString('3.14159');       // true
isNumericString('-0.5');          // true
isNumericString('1e6');           // true
isNumericString('   15.2   ');    // true

// ❌ Invalid cases
isNumericString('');              // false
isNumericString('NaN');           // false
isNumericString('Infinity');      // false
isNumericString('0xFF');          // false
isNumericString('3.14px');        // false
isNumericString('  ');            // false

// ✅ Type-safe conversion
function toNumber(value: unknown) {
  return isNumericString(value) ? Number(value) : NaN;
}
```

Please, refer to number guard: [isNumber](primitiveGuards#isnumber) for stringified number checking.

---

## Environment Guards

### `isBrowser`

```typescript
function isBrowser(): boolean
```

#### Description

Determines if code is running in a web browser environment by checking for:

- window object
- document object
- Absence of Node.js indicators

#### Examples

```typescript
// In browser
isBrowser();                     // true

// In Node.js/SSR
isBrowser();                     // false

// Environment-specific logic
function getWindowSize() {
  if (isBrowser()) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  return null;
}
```

### `isNode`

```typescript
function isNode(): boolean
```

#### Description

Determines if code is running in a Node.js environment by checking:

- process object
- process.versions.node
- Absence of browser APIs

#### Examples

```typescript
// In Node.js
isNode();                        // true

// In browser
isNode();                        // false

// Module loading
function loadModule() {
  if (isNode()) {
    return require('fs');  // Node-specific module
  }
  throw new Error('Node.js required');
}
```

### `isEnvironment`

```typescript
function isEnvironment(env: string): boolean
```

#### Description

Checks if current Node.js environment matches specified value (case-sensitive). Common values:

- "development"
- "production"
- "test"

#### Examples

```typescript
process.env.NODE_ENV = 'production';

// Matching cases
isEnvironment('production');      // true

// Non-matching cases
isEnvironment('development');     // false

// Environment-specific config
function getConfig() {
  return isEnvironment('production')
    ? productionConfig
    : developmentConfig;
}
```

## Aliases

| Main Export      | Alias Names                                           |
|------------------|-------------------------------------------------------|
| `isEmail`        | `isValidEmail`                                        |
| `isURL`          | `isValidURL`                                          |
| `isEnvironment`  | `isExpectedNodeENV`, `isNodeENV`, `isNodeEnvironment` |

## Use Cases

### Form Validation

```typescript
function validateContactForm(data: unknown) {
  return isObjectWithKeys(data, ['name', 'email', 'phone']) &&
    isNonEmptyString(data.name) &&
    isEmail(data.email) &&
    (isPhoneNumber(data.phone) || data.phone === '');
}
```

### API Response Handling

```typescript
interface APIUser {
  id: string;
  email: string;
  createdAt: string;
}

function isAPIUser(data: unknown): data is APIUser {
  return isObjectWithKeys(data, ['id', 'email', 'createdAt']) &&
    isUUID(data.id) &&
    isEmail(data.email) &&
    isDateString(data.createdAt);
}
```

### Environment-Specific Code

```typescript
function logger(message: string) {
  if (isEnvironment('development')) {
    console.debug(`[DEV] ${message}`);
  } else if (isBrowser()) {
    sendToAnalytics(message);
  }
}
```

## Notes

1. **Validation Strictness**: All regex patterns balance correctness with common real-world usage
2. **Performance**: Optimized validation logic with early returns
3. **Type Safety**: Guards use TypeScript type predicates for proper narrowing
4. **International Support**: Phone and email validations handle international formats
5. **Edge Cases**: All guards handle null/undefined and invalid types properly
