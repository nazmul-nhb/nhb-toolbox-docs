---
id: toggleFullScreen
title: Toggle Full Screen Mode
---

## toggleFullScreen

Toggles the browser’s full-screen mode for a given element, or the entire document by default. Handles browser compatibility (including WebKit/Safari).

## Import

```typescript
import { toggleFullScreen } from 'nhb-toolbox';
```

## Function Signature

```typescript
function toggleFullScreen(element?: HTMLElement): void
```

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Full Screen Document" label="Full Screen Document">

```typescript
toggleFullScreen();
// Toggles full-screen mode on the entire page (document.documentElement).
```

</TabItem>
<TabItem value="Full Screen Element" label="Full Screen Element">

```typescript
const video = document.getElementById('stream-player');
toggleFullScreen(video);
// Toggles full-screen mode for #stream-player element.
```

</TabItem>
<TabItem value="Button Example" label="Button Example">

```typescript
<button onClick={() => toggleFullScreen(document.getElementById('canvas'))}>
  Toggle Canvas Full Screen
</button>
```

</TabItem>
</Tabs>

## API Reference

### Parameters

| Name    | Type         | Description                                      |
| ------- | ------------ | ------------------------------------------------ |
| element | HTMLElement? | (Optional) Element to toggle fullscreen for. <br></br> Defaults to the root element/document. |

### Returns

This function does not return anything (`void`). It triggers or exits full-screen mode as needed.

## Key Features

1. **Element or Document**: Can trigger full screen for any specific element, or the entire page.
2. **Browser Compatible**: Handles compatibility for most browsers, including Safari (WebKit).
3. **Smart Toggle**: Enters full screen if off, exits if already in full screen.
4. **No Reload Needed**: Transition is seamless with no page reload or navigation.

## Limitations

1. **Browser-only**: Requires DOM APIs. Not usable in Node.js/server.
2. **User Gesture Requirement**: Most browsers require user interaction (e.g., button click) to enter or exit full-screen mode.
3. **No Feedback/Status**: Does not return the current full-screen state.
4. **No Promise/Callback**: Does not notify when entry/exit is complete or if the request fails.
5. **Does not cycle elements**: Only toggles for the given element/document, not between multiple elements.

## Notes

- Full-screen activation may be blocked if called outside a trusted event handler (like a user click).
- Exiting full screen returns to normal view but does not restore prior scroll or focus state.
- Use `document.fullscreenElement` (or vendor-prefixed properties) to programmatically check if in full screen.
- For advanced use cases (listening for state changes), consider handling `fullscreenchange` event.

## Recommended Use Cases

- Media viewers and video players.
- Presentations, slideshows, or immersive content.
- Data dashboards and interactive canvases.
- Utility widgets/tools with maximized workspace modes.

---

**Conclusion:**  
`toggleFullScreen` adds immersive, distraction-free power to your UIs by instantly maximizing any element or your entire page. Handles browser quirks, so you don’t have to!
