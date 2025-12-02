---
id: Cipher
title: Cipher - Encrypt/Decrypt Text
---

## Cipher

A lightweight `stream-cipher` encryption utility using `HMAC-SHA256` for keystream generation and authentication.

### Overview

Cipher provides simple symmetric encryption for strings using a custom `HMAC`-based construction. It derives separate encryption and `MAC` keys from a secret and provides encryption, decryption, and validation methods. This is a **pure JavaScript implementation** with no external dependencies.

:::caution[Security Note]
This is a custom cryptographic construction and should be used for non-critical data protection only. For production-grade security, use established libraries like `libsodium` or Web Crypto API.
:::

### Import & Setup

```typescript
import { Cipher } from 'nhb-toolbox/hash';

// Initialize with a secret key
const cipher = new Cipher('your-secret-key-here');
```

### Basic Usage

#### Encrypting Data

```typescript
const plaintext = 'Sensitive data to protect';
const encryptedToken = cipher.encrypt(plaintext);
// Returns: base64-encoded string like "CAYjHUHatZWLNC...IsbKPtQUf9rAUCPTw+jiFnlBg0fP5PqwI4taA=="
```

#### Decrypting Data

```typescript
try {
  const decryptedText = cipher.decrypt(encryptedToken);
  console.log(decryptedText); // 'Sensitive data to protect'
} catch (error) {
  console.error('Decryption failed:', error.message);
}
```

#### Validating Tokens

```typescript
const isValid = cipher.isValid(encryptedToken);
// Returns: true if token is properly formatted and MAC is valid
```

### Encryption Scheme

#### Key Derivation

- **Encryption Key**: `HMAC-SHA256(secret, "enc")`
- **MAC Key**: `HMAC-SHA256(secret, "mac")`

#### Encryption Process

1. Generate random 16-byte IV from timestamp + random seed
2. Create keystream: `HMAC(encKey, iv || counter)` in counter mode
3. Ciphertext: `plaintext XOR keystream`
4. Tag: `HMAC(macKey, iv || ciphertext)`
5. Output: `base64(iv || ciphertext || tag)`

#### Format

```bash
[16-byte IV] + [ciphertext] + [32-byte MAC tag]
```

### API Reference

#### Constructor

```typescript
new Cipher(secret: string)
```

Creates a new Cipher instance with the specified secret.

**Parameters:**

- `secret`: Non-empty string used for key derivation

**Example:**

```typescript
const cipher = new Cipher(process.env.ENCRYPTION_KEY);
```

#### `encrypt(text: string): string`

Encrypts a UTF-8 string.

**Parameters:**

- `text`: Plaintext string to encrypt

**Returns:** Base64-encoded encrypted token

**Example:**

```typescript
const token = cipher.encrypt('Hello, World!');
```

#### `decrypt(token: string): string`

Decrypts a previously encrypted token.

**Parameters:**

- `token`: Base64-encoded token from `encrypt()`

**Returns:** Decrypted plaintext string

**Throws:** Error if token is invalid, tampered, or MAC doesn't match

**Example:**

```typescript
try {
  const text = cipher.decrypt(token);
} catch (error) {
  // Handle decryption failure
}
```

#### `isValid(token: string): boolean`

Validates token structure and MAC.

**Parameters:**

- `token`: Base64-encoded token to validate

**Returns:** `true` if token is properly formatted and MAC is valid

**Example:**

```typescript
if (cipher.isValid(token)) {
  // Safe to attempt decryption
}
```

### Common Patterns

#### Encrypted Configuration Storage

```typescript
class SecureConfig {
  private cipher: Cipher;

  constructor(secret: string) {
    this.cipher = new Cipher(secret);
  }

  storeConfig(config: object): string {
    const json = JSON.stringify(config);
    return this.cipher.encrypt(json);
  }

  loadConfig(encrypted: string): object {
    const json = this.cipher.decrypt(encrypted);
    return JSON.parse(json);
  }
}

// Usage
const secureConfig = new SecureConfig(process.env.CONFIG_SECRET);
const encrypted = secureConfig.storeConfig({ apiKey: 'abc123' });
const config = secureConfig.loadConfig(encrypted);
```

#### Secure Cookie/Storage

```typescript
function createSecureStorage(cipher: Cipher) {
  return {
    setItem(key: string, value: string): void {
      const encrypted = cipher.encrypt(value);
      localStorage.setItem(key, encrypted);
    },
    
    getItem(key: string): string | null {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      if (!cipher.isValid(encrypted)) {
        localStorage.removeItem(key);
        return null;
      }
      
      try {
        return cipher.decrypt(encrypted);
      } catch {
        localStorage.removeItem(key);
        return null;
      }
    }
  };
}
```

#### Encrypted Messaging

```typescript
class SecureMessenger {
  private cipher: Cipher;

  constructor(sharedSecret: string) {
    this.cipher = new Cipher(sharedSecret);
  }

  sendMessage(message: string): { encrypted: string; iv: string } {
    const encrypted = this.cipher.encrypt(message);
    return { encrypted };
  }

  receiveMessage(token: string): string {
    return this.cipher.decrypt(token);
  }
}

// Two parties with same shared secret
const alice = new SecureMessenger('shared-secret');
const bob = new SecureMessenger('shared-secret');

const message = alice.sendMessage('Meet at 5pm');
const decrypted = bob.receiveMessage(message.encrypted);
```

### Security Considerations

#### Limitations

1. **Custom Construction**: Not a standard algorithm like AES-GCM
2. **Deterministic IV**: IV generation uses timestamp + Math.random()
3. **JavaScript Timing**: Constant-time comparisons but JavaScript may leak timing
4. **No Key Rotation**: Single secret for entire lifecycle

#### Best Practices

```typescript
// 1. Use strong, random secrets
import { randomHex, Cipher } from 'nhb-toolbox/hash';
const strongSecret = randomHex(64); // store it in the .env
const cipher = new Cipher(strongSecret); // use the secret from .env

// 2. Validate before decryption
function safeDecrypt(cipher: Cipher, token: string): string | null {
  if (!cipher.isValid(token)) {
    return null;
  }
  
  try {
    return cipher.decrypt(token);
  } catch {
    return null;
  }
}

// 3. Combine with other security measures
class EnhancedCipher {
  private cipher: Cipher;
  private pepper: string; // Application-wide pepper

  constructor(userSecret: string, pepper: string) {
    const combinedSecret = userSecret + pepper;
    this.cipher = new Cipher(combinedSecret);
    this.pepper = pepper;
  }
  
  // ... wrapper methods
}
```

#### When Not to Use

❌ **Do not use for:**

- Passwords (use dedicated password hashing like bcrypt)
- Financial transactions
- Medical records
- Government/military data
- Long-term sensitive data storage

✅ **Appropriate uses:**

- Temporary session data
- Configuration values
- Non-critical application data
- Educational/demonstration purposes

### Error Handling

#### Common Errors

```typescript
try {
  const result = cipher.decrypt(token);
} catch (error) {
  if (error.message.includes('base64')) {
    // Invalid Base64 encoding
  } else if (error.message.includes('Malformed')) {
    // Token structure incorrect
  } else if (error.message.includes('tampered')) {
    // MAC validation failed - possible tampering
  } else {
    // Unexpected error
  }
}
```

#### Validation First Pattern

```typescript
function decryptWithValidation(cipher: Cipher, token: string): {
  success: boolean;
  data?: string;
  error?: string;
} {
  if (!cipher.isValid(token)) {
    return { success: false, error: 'Invalid token' };
  }
  
  try {
    const data = cipher.decrypt(token);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Decryption failed' 
    };
  }
}
```

### Performance

#### Considerations

- **Pure JavaScript**: Slower than native crypto but portable
- **HMAC-SHA256**: Relatively fast for moderate data sizes
- **Memory Efficient**: Uses `Uint8Array` for binary operations

#### Benchmark Example

```typescript
function benchmarkCipher(cipher: Cipher, dataSize: number) {
  const data = 'x'.repeat(dataSize);
  
  console.time('encrypt');
  const encrypted = cipher.encrypt(data);
  console.timeEnd('encrypt');
  
  console.time('decrypt');
  cipher.decrypt(encrypted);
  console.timeEnd('decrypt');
  
  return encrypted.length; // Show overhead
}
```

### Migration & Compatibility

#### From Simple XOR Encryption

```typescript
// Before: Weak XOR encryption
function weakEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}

// After: Cipher with proper authentication
const cipher = new Cipher(key);
const strongEncrypted = cipher.encrypt(text);
```

#### Data Format Migration

If you need to migrate from an older format:

```typescript
class MigratingCipher {
  private current: Cipher;
  private legacy?: Cipher;

  constructor(currentSecret: string, legacySecret?: string) {
    this.current = new Cipher(currentSecret);
    if (legacySecret) {
      this.legacy = new Cipher(legacySecret);
    }
  }

  decryptWithFallback(token: string): string {
    try {
      return this.current.decrypt(token);
    } catch (currentError) {
      if (this.legacy) {
        try {
          const result = this.legacy.decrypt(token);
          // Re-encrypt with new secret
          return this.current.encrypt(result);
        } catch (legacyError) {
          throw new Error('Decryption failed with both current and legacy secrets');
        }
      }
      throw currentError;
    }
  }
}
```

### Examples

#### Encrypted API Client

```typescript
class SecureApiClient {
  private cipher: Cipher;

  constructor(apiKey: string, secret: string) {
    this.cipher = new Cipher(secret);
  }

  async sendSecureRequest(endpoint: string, data: object) {
    const encryptedData = this.cipher.encrypt(JSON.stringify(data));
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Encrypted': 'true'
      },
      body: JSON.stringify({ data: encryptedData })
    });
    
    const result = await response.json();
    
    if (result.encrypted) {
      return JSON.parse(this.cipher.decrypt(result.data));
    }
    
    return result;
  }
}
```

#### Secure Feature Flags

```typescript
class SecureFeatureManager {
  private cipher: Cipher;
  private flags: Map<string, string>;

  constructor(secret: string) {
    this.cipher = new Cipher(secret);
    this.flags = new Map();
  }

  enableFeature(userId: string, feature: string, ttl: number = 3600) {
    const expiry = Date.now() + ttl * 1000;
    const data = JSON.stringify({ feature, userId, expiry });
    const token = this.cipher.encrypt(data);
    this.flags.set(`${userId}:${feature}`, token);
  }

  isFeatureEnabled(userId: string, feature: string): boolean {
    const key = `${userId}:${feature}`;
    const token = this.flags.get(key);
    
    if (!token) return false;
    
    try {
      const data = JSON.parse(this.cipher.decrypt(token));
      if (data.expiry < Date.now()) {
        this.flags.delete(key);
        return false;
      }
      return data.userId === userId && data.feature === feature;
    } catch {
      this.flags.delete(key);
      return false;
    }
  }
}
```

### Troubleshooting

#### Common Issues

> **Token must be a base64 string!**

- Input is not valid Base64
- Contains non-Base64 characters
- Encoding issues

> **Malformed or tampered token!**

- Token shorter than 48 bytes
- Structure corrupted
- Truncated during storage/transmission

> **Key in the token is tampered or invalid!**

- MAC validation failed
- Wrong secret used
- Token was modified

#### Debugging

```typescript
function debugToken(token: string) {
  try {
    const bytes = base64ToBytes(token);
    console.log('Total length:', bytes.length);
    console.log('IV (first 16 bytes):', bytes.slice(0, 16));
    console.log('Tag (last 32 bytes):', bytes.slice(-32));
    console.log('Ciphertext length:', bytes.length - 48);
  } catch {
    console.log('Invalid Base64');
  }
}
```

---

### See Also

- [Signet](signet) - For authentication tokens
- [Encoding Utilities](encoding) - For Base64, UTF-8 and binary conversions

:::caution[Important]
For production applications requiring strong cryptographic security, consider using the Web Crypto API or Node.js crypto module with established algorithms like AES-GCM.
:::
