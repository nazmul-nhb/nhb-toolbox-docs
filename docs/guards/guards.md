---
id: guards
title: Type Guards
---

## Use Cases

### Data Validation Pipelines

```typescript
function processData(data: unknown) {
  if (isArray(data)) {
    return data.map(processData);
  }
  
  if (isObject(data)) {
    return Object.fromEntries(
      Object.entries(data)
        .map(([k, v]) => [k, processData(v)])
    );
  }
  
  if (isDate(data)) {
    return data.toISOString();
  }
  
  return data;
}
```

### API Response Handling

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  if (isObjectWithKeys<User>(data, ['id', 'name', 'email']) &&
      isString(data.name) &&
      isString(data.email)) {
    return data;
  }
  throw new Error('Invalid user data format');
}
```

### Configuration Loading

```typescript
interface Config {
  apiUrl: string;
  retries: number;
  timeout: number;
}

function loadConfig(): Config {
  const config = readConfigFile(); // returns unknown
  
  if (isObjectWithKeys<Config>(config, ['apiUrl', 'retries', 'timeout']) &&
      isString(config.apiUrl) &&
      isNumber(config.retries) &&
      isNumber(config.timeout)) {
    return config;
  }
  
  throw new Error('Invalid configuration format');
}
```

### Error Handling

```typescript
function handleError(error: unknown) {
  if (isError(error)) {
    console.error(`Error: ${error.message}`);
    trackError(error);
  } else if (isString(error)) {
    console.error(error);
  } else {
    console.error('Unknown error occurred');
  }
}
```

## Notes

1. **Performance**: All guards use minimal operations for maximum speed
2. **Type Safety**: Each guard provides proper TypeScript type narrowing
3. **Consistency**: Matches JavaScript's type system behavior exactly
4. **Edge Cases**: Handles null/undefined and exotic cases properly
5. **Purity**: No side effects in any implementation
6. **Cross-Realm**: Works with objects from different JavaScript realms
