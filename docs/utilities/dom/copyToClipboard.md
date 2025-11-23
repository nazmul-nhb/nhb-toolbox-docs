---
id: copyToClipboard
title: Copy Text to Clipboard
---

## copyToClipboard

Copies text to the user's clipboard using modern clipboard APIs when available, falling back to older methods for browser compatibility. Returns a Promise that resolves when the operation completes.

### Import

```typescript
import { copyToClipboard } from 'nhb-toolbox';
```

### Function Signature

```typescript
copyToClipboard(text: string): Promise<void>
```

### Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic">

```typescript
await copyToClipboard('Hello, world!');
// The text "Hello, world!" is now in the clipboard.
```

</TabItem>
<TabItem value="With Button" label="With UI Button">

```typescript
<button onClick={() => copyToClipboard('Copied!')}>
  Copy
</button>
```

</TabItem>
<TabItem value="Error Handling" label="With Error Logging">

```typescript
await copyToClipboard('May fail in unsupported browsers');
// Logs an error with throwing it again if copy fails.
```

</TabItem>
</Tabs>

### API Reference

#### Parameters

| Name | Type     | Description       |
| ---- | -------- | ----------------- |
| text | `string` | The text to copy. |

#### Returns

A Promise that resolves once the text is successfully copied, or after a fallback attempt.

### Key Features

1. **Universal Support**: Uses `navigator.clipboard.writeText` if available, else falls back to legacy method.
2. **Promise-based**: Can be awaited, useful in modern async workflows (click handlers, etc).
3. **Error Handling**: Logs error to console if copying fails, with throwing the error.

### Limitations

1. **Browser-only**: Not available in Node.js or non-browser environments.
2. **User Permissions**: Clipboard access may require user action or browser permissions.

### Notes

- Works without page reload or user prompt in supported browsers.
- May fail in rare cases if used in insecure (non-https) contexts or inside some browser iframes.
- For full support, ensure the function is triggered as a result of user interaction (e.g., button click).
- On legacy/unsupported browsers, falls back to creating a hidden `<textarea>`.

### Recommended Use Cases

- "Copy" buttons for code samples, passwords, or referral links.
- Improving UX with easy clipboard access.
- Copy-to-clipboard in dashboards, editors, or utilities.
- For React apps, consider using [**useCopyText**](https://github.com/nazmul-nhb/nhb-hooks?tab=readme-ov-file#usecopytext) hook from [**nhb-hooks**](https://www.npmjs.com/package/nhb-hooks) package for seamless integration.

---

**Conclusion:**  

`copyToClipboard` is a reliable, browser-focused solution for programmatic copying, handling compatibility quirks under the hood. Integrate it for pain-free copy actions—users appreciate simple clipboard access!
