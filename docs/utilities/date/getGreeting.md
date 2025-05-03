---
id: getGreeting  
title: Get Greeting  
---

## getGreeting

Returns a time-appropriate greeting message based on configurable time periods. Supports custom messages and time thresholds.

### Function Signature

```typescript
function getGreeting(configs?: GreetingConfigs): string;
```

### Parameters (GreetingConfigs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `morningEnds` | `Time` | `'11:59'` | When morning period ends (HH:MM) |
| `noonEnds` | `Time` | `'12:59'` | When noon period ends |
| `afternoonEnds` | `Time` | `'17:59'` | When afternoon period ends |
| `eveningEnds` | `Time` | `'23:59'` | When evening period ends |
| `midnightEnds` | `Time` | `'02:59'` | When midnight period ends |
| `currentTime` | `Time` | Current time | Override current time (HH:MM) |
| `appendToMsg` | `string` | `''` | Text to append to messages |
| `prependToMsg` | `string` | `''` | Text to prepend to messages |
| `morningMessage` | `string` | `'Good Morning!'` | Custom morning greeting |
| `noonMessage` | `string` | `'Good Noon!'` | Custom noon greeting |
| `afternoonMessage` | `string` | `'Good Afternoon!'` | Custom afternoon greeting |
| `eveningMessage` | `string` | `'Good Evening!'` | Custom evening greeting |
| `midnightMessage` | `string` | `'Hello, Night Owl!'` | Custom midnight greeting |
| `defaultMessage` | `string` | `'Greetings!'` | Fallback greeting |

### Time Period Logic

1. **Midnight**: Until `midnightEnds` (default: 02:59)
2. **Morning**: Until `morningEnds` (default: 11:59)
3. **Noon**: Until `noonEnds` (default: 12:59)  
4. **Afternoon**: Until `afternoonEnds` (default: 17:59)
5. **Evening**: Until `eveningEnds` (default: 23:59)

### Example Usage

#### Basic Usage

```typescript
import { getGreeting } from 'nhb-toolbox';

// Uses current time
console.log(getGreeting()); 
// "Good Morning!" (if between 03:00-11:59)
```

#### Custom Time

```typescript
console.log(getGreeting({ currentTime: '15:30' }));
// "Good Afternoon!"
```

#### Custom Messages

```typescript
console.log(getGreeting({
  afternoonMessage: 'Top of the afternoon!',
  prependToMsg: '👋 '
}));
// "👋 Top of the afternoon!"
```

#### Full Customization

```typescript
console.log(getGreeting({
  morningEnds: '10:00',
  noonEnds: '14:00',
  afternoonEnds: '18:00',
  eveningEnds: '22:00',
  midnightMessage: 'Working late?',
  currentTime: '01:30'
}));
// "Working late?"
```

#### Using Aliases

```typescript
import { greet } from 'nhb-toolbox';
greet({ morningMessage: 'Rise and shine!' });
```

### Type Definitions

#### Time Types

```typescript
type Hours = '00'|'01'|'02'|'03'|...'23';

type Minutes = '00'|'01'|'02'|'03'...|'59';

type Time = `${Hours}:${Minutes}`;
```

#### GreetingConfigs Interface

```typescript
interface GreetingConfigs {
  morningEnds?: Time;
  noonEnds?: Time;
  afternoonEnds?: Time;
  eveningEnds?: Time;
  midnightEnds?: Time;
  currentTime?: Time;
  appendToMsg?: string;
  prependToMsg?: string;
  morningMessage?: string;
  noonMessage?: string;
  afternoonMessage?: string;
  eveningMessage?: string;
  midnightMessage?: string;
  defaultMessage?: string;
}
```

### Aliases

- `generateGreeting`: Alias for `getGreeting`
- `greet`: Shortened alias for `getGreeting`

### Notes

1. **Time Validation**: Only accepts valid 24-hour format times (HH:MM), Invalid times fall back to current time
2. **Type Safety**: Enforces correct time string formats at compile time
3. **Message Construction**: Prepends/appends text exactly as provided
4. **Period Detection**: Uses inclusive ranges (`<=` end time)

### Use Cases

- Dynamic welcome messages
- Time-based UI theming
- Personalized greetings
- Localized time period detection

### Conclusion

The `getGreeting` function and its aliases provide:

1. **Flexible** time period configuration
2. **Type-safe** time string handling
3. **Multiple entry points** through aliases
4. **Customizable** greeting messages

Ideal for applications requiring:

- Contextual user greetings
- Time-aware interfaces
- Localized time handling
- Personalized messaging
