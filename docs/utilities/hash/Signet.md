---
id: Signet
title: Signet - Sign, Decode, Verify Tokens
---

## Signet

A lightweight, secure implementation of *JWT-like tokens* using `HMAC-SHA256` signatures.

:::info
Does not rely on `Node.js` or `Web APIs`. **Works on any JS engine**
:::

### Overview

Signet is a zero-dependency token implementation similar to JSON Web Tokens (`JWT`) but with a smaller footprint and simpler API. It provides secure token creation, verification, and decoding with `HMAC-SHA256` signatures and standard `JWT` claims.

### Import & Setup

```typescript
import { Signet } from 'nhb-toolbox/hash';

// Initialize with a secret key (keep this secure!)
const signet = new Signet('your-secret-key-here');
```

### Basic Usage

#### Creating a Token

```typescript
// Create a token with custom payload
const token = signet.sign(
  { userId: 123, role: 'admin', email: 'user@example.com' },
  {
    expiresIn: '2h',           // Token expires in 2 hours
    audience: 'my-app',        // Intended audience
    issuer: 'auth-service',    // Who issued it
    subject: 'user-auth'       // Subject of the token
  }
);
```

#### Verifying a Token

```typescript
// Verify token with validation options
const result = signet.verify(token, {
  audience: 'my-app',
  issuer: 'auth-service'
});

if (result.isValid) {
  console.log('Authenticated user:', result.payload.userId);
  console.log('Token expires at:', result.payload.expDate);
} else {
  console.log('Authentication failed:', result.error);
}
```

#### Decoding a Token (Without Verification)

```typescript
// Inspect token contents without verification
const decoded = signet.decode(token);
console.log('Header:', decoded.header);
console.log('Custom data:', decoded.payload);
```

### Token Structure

Signet tokens follow the standard JWT format: `header.payload.signature`

#### Header

```json
{
  "alg": "HS256",
  "typ": "SIGNET+JWT"
}
```

#### Payload

Includes standard JWT claims plus your custom data:

- `iat`, `iatDate`: Issued at timestamp and `Date` object
- `exp`, `expDate`: Expiration time (if `expiresIn` provided)
- `nbf`, `nbfDate`: Not before time (if `notBefore` provided)
- `aud`: Audience
- `sub`: Subject  
- `iss`: Issuer
- Custom properties from your payload

## API Reference

### Constructor

```typescript
new Signet(secret: string)
```

Creates a new Signet instance with the specified secret key.

**Parameters:**

- `secret`: Non-empty string used for signing/verifying tokens

**Example:**

```typescript
const signet = new Signet(process.env.JWT_SECRET);
```

### sign()

Creates and signs a new token.

**Signature:**

```ts
sign(payload: GenericObject, options?: SignOptions): TokenString
```

**Parameters:**

- `payload`: Custom data to include in token (must be non-empty object)
- `options`: Optional configuration for claims and expiration

**Example:**

```typescript
const token = signet.sign(
  { userId: 456 },
  { expiresIn: '1d', audience: 'api' }
);
```

### verify()

Verifies token signature and validates claims.

**Signature:**

```ts
verify<T>(token: string, options?: VerifyOptions): VerifiedToken<T>
```

**Parameters:**

- `token`: Token string to verify
- `options`: Optional validation criteria

**Returns:** Object with `isValid` boolean and either `payload` or `error`

**Example:**

```typescript
const result = signet.verify<UserData>(token, {
  audience: 'api',
  issuer: 'auth'
});
```

### verifyOrThrow()

Verifies token and throws error if invalid.

**Signature:**

```ts
verifyOrThrow<T>(token: string, options?: VerifyOptions): VerifiedToken<T>
```

**Example:**

```typescript
try {
  const result = signet.verifyOrThrow(token);
  // Token is valid
} catch (error) {
  // Handle invalid token
}
```

### decode()

Decodes token without verifying signature.

**Signature:**

```ts
decode<T>(token: string): DecodedToken<T>
```

**Example:**

```typescript
const decoded = signet.decode<{ userId: number }>(token);
console.log(decoded.payload.userId); // Type-safe access
```

### decodePayload()

Extracts payload without verification (convenience method).

**Signature:**

```ts
decodePayload<T>(token: string): SignetPayload<T>
```

**Example:**

```typescript
const payload = signet.decodePayload(token);
console.log(payload.iatDate);
```

### Validation Methods

#### `hasExpired(token: string): boolean`

Checks if token has expired based on `exp` claim.

#### `isTooEarly(token: string): boolean`  

Checks if token's `nbf` claim indicates it's not yet valid.

#### `isInvalidIssuer(token: string, expected: string): boolean`

Validates issuer claim.

#### `isInvalidAudience(token: string, expected: string | string[]): boolean`

Validates audience claim.

#### `isInvalidSubject(token: string, expected: string): boolean`

Validates subject claim.

### Time Formats

Signet accepts flexible time formats for `expiresIn` and `notBefore`:

```typescript
// Various time formats
signet.sign(payload, { expiresIn: '2h' });        // 2 hours
signet.sign(payload, { expiresIn: '30m' });       // 30 minutes  
signet.sign(payload, { expiresIn: '1d' });        // 1 day
signet.sign(payload, { expiresIn: '3600' });      // 3600 seconds
signet.sign(payload, { expiresIn: 7200 });        // 7200 seconds
```

#### Supported Units

| Unit        | Variants                                             |
| ----------- | ---------------------------------------------------- |
| Year        | `y`, `yr`, `yrs`, `year`, `years`                    |
| Month       | `mo`, `month`, `months`                              |
| Week        | `w`, `week`, `weeks`                                 |
| Day         | `d`, `day`, `days`                                   |
| Hour        | `h`, `hr`, `hrs`, `hour`, `hours`                    |
| Minute      | `m`, `min`, `mins`, `minute`, `minutes`              |
| Second      | `s`, `sec`, `secs`, `second`, `seconds`              |
| Millisecond | `ms`, `msec`, `msecs`, `millisecond`, `milliseconds` |

:::tip[Info]
Internally uses [**parseMSec**](/docs/utilities/date/parse-time#parsemsec) utility to parse time to ms
:::

### TypeScript Support

Signet provides full TypeScript support with generic types:

```typescript
interface UserToken {
  userId: number;
  email: string;
  permissions: string[];
}

// Type-safe token creation: payload must be an object type
const token = signet.sign({
  userId: 123,
  email: 'user@example.com',
  permissions: ['read', 'write']
});

// Type-safe verification  
const result = signet.verify<UserToken>(token);
if (result.isValid) {
  const { userId, permissions } = result.payload; // Correctly typed
}
```

### Security Features

#### HMAC-SHA256 Signatures

- Uses cryptographically secure HMAC-SHA256 for signatures
- Constant-time signature comparison prevents timing attacks

#### Claim Validation

- Automatic expiration checking
- Not-before validation
- Issuer, audience, and subject validation
- All validations are optional and configurable

#### Secure by Default

- Requires non-empty secret
- Validates token structure
- Handles malformed tokens gracefully

### Common Patterns

#### Express.js Middleware

```typescript
function authMiddleware(signet: Signet) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const result = signet.verifyOrThrow(token, {
        audience: 'api',
        issuer: 'auth-service'
      });
      req.user = result.payload;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
}
```

#### Refresh Token Pattern

```typescript
function refreshAccessToken(refreshToken: string): string | null {
  const result = signet.verify(refreshToken, {
    audience: 'refresh',
    issuer: 'auth-service'
  });

  if (!result.isValid) {
    return null;
  }

  // Create new access token
  return signet.sign(
    { userId: result.payload.userId },
    { expiresIn: '15m', audience: 'access' }
  );
}
```

#### Multi-Tenant Applications

```typescript
function validateTenantToken(token: string, tenantId: string): boolean {
  const result = signet.verify(token);
  
  if (!result.isValid) {
    return false;
  }

  // Check if token has required tenant scope
  const scopes = result.payload.scopes || [];
  return scopes.includes(`tenant:${tenantId}`);
}
```

### Error Handling

#### Verification Errors

The `verify` method returns an error object:

```typescript
const result = signet.verify(token);

if (!result.isValid) {
  switch (result.error) {
    case 'Invalid or tampered signature!':
      // Token was modified
      break;
    case 'Token has expired!':
      // Token expired, need refresh
      break;
    case 'Invalid token audience!':
      // Wrong audience
      break;
    default:
      // Other errors
  }
}
```

#### Exception Handling with `verifyOrThrow`

```typescript
try {
  const result = signet.verifyOrThrow(token);
  // Process valid token
} catch (error) {
  if (error.message.includes('expired')) {
    // Handle expired token
  } else if (error.message.includes('audience')) {
    // Handle wrong audience
  } else {
    // Handle other errors
  }
}
```

### Performance & Considerations

#### Lightweight

- Zero dependencies
- Pure JavaScript implementation
- Small bundle size

#### Memory Efficient

- Uses Uint8Array for binary operations
- Minimal object allocations
- Efficient string operations

#### Suitable For

- API authentication
- Session management  
- One-time use tokens
- Secure data exchange

#### Not Suitable For

- Very high-throughput applications (consider native crypto)
- Tokens larger than 64KB (JWT size limit)
- Asymmetric cryptography needs (use JWK/JWS instead)

### Migration from JWT

If you're using jsonwebtoken library:

```typescript
// Before (jsonwebtoken)
import jwt from 'jsonwebtoken';
const token = jwt.sign(payload, secret, { expiresIn: '1h' });
const decoded = jwt.verify(token, secret);

// After (Signet)
import { Signet } from 'nhb-toolbox/hash';
const signet = new Signet(secret);
const token = signet.sign(payload, { expiresIn: '1h' });
const result = signet.verify(token);
```

### Best Practices

#### 1. Secure Secret Management

```typescript
// Store secret in environment variables
const signet = new Signet(process.env.JWT_SECRET);

// Rotate secrets periodically
const currentSignet = new Signet(getCurrentSecret());
const legacySignet = new Signet(getLegacySecret()); // For token migration
```

#### 2. Appropriate Token Lifetimes

```typescript
// Access tokens: short-lived
signet.sign(payload, { expiresIn: '15m' });

// Refresh tokens: longer-lived  
signet.sign(payload, { expiresIn: '7d' });

// One-time tokens: very short
signet.sign(payload, { expiresIn: '5m' });
```

#### 3. Validate Relevant Claims

```typescript
// Always validate audience and issuer
signet.verify(token, {
  audience: 'your-app',
  issuer: 'your-service'
});

// Validate subject when user-specific
signet.verify(token, {
  subject: expectedUserId
});
```

#### 4. Handle Token Storage Securely

```typescript
// Web: Use HTTP-only cookies
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});
```

### Troubleshooting

#### Common Issues

> **Invalid or tampered signature!**

- Secret mismatch between signing and verifying
- Token was modified after creation
- Encoding/decoding issues

> **Token has expired!**

- Token past its `exp` claim
- System clock skew between services

> **Invalid token audience!**

- Token created for different audience
- Multi-tenant configuration mismatch

#### Debugging Tips

```typescript
// Decode to inspect without verification
const decoded = signet.decode(token);
console.log('Header:', decoded.header);
console.log('Payload:', decoded.payload);
console.log('Expires at:', decoded.payload.expDate);

// Check specific claims
console.log('Has expired?', signet.hasExpired(token));
console.log('Valid issuer?', !signet.isInvalidIssuer(token, 'expected-issuer'));
```
