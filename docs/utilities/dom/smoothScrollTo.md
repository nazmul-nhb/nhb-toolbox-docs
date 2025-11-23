---
id: smoothScrollTo
title: Smooth Scroll to Element
---

## smoothScrollTo

Smoothly scrolls the webpage to a given HTML element, with optional vertical pixel offset for fine positioning.

### Import

```typescript
import { smoothScrollTo } from 'nhb-toolbox';
```

### Function Signature

```typescript
smoothScrollTo(element: HTMLElement, offset?: number): void
```

### Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic">

```typescript
const mySection = document.getElementById('contact');
smoothScrollTo(mySection);
// Smoothly scrolls the page so #contact is at the top.
```

</TabItem>
<TabItem value="With Offset" label="With Offset">

```typescript
const mySection = document.getElementById('faq');
smoothScrollTo(mySection, -50);
// Scrolls to #faq, then adjusts up by 50px.
```

</TabItem>
<TabItem value="Scroll Down Extra" label="Positive Offset">

```typescript
const productList = document.getElementById('products');
smoothScrollTo(productList, 100);
// Scrolls to #products, then moves down 100px.
```

</TabItem>
</Tabs>

### API Reference

#### Parameters

| Name    | Type         | Description                                                                           |
| ------- | ------------ | ------------------------------------------------------------------------------------- |
| element | HTMLElement  | The DOM element to scroll to.                                                         |
| offset  | number       | (Optional) Additional vertical offset in pixels (positive = down, negative = up).     |

#### Returns

This function does not return anything (`void`).

### Key Features

1. **Native Smooth Scrolling**: Uses `scrollIntoView` with smooth behavior.
2. **Flexible Offset**: Supports extra offset for headers/fixed navigation or pixel-perfect alignment.
3. **No Page Reload**: Scrolls in place, with no layout shifts or reloads.
4. **Easy Integration**: Just pass a DOM element and an optional offset.

### Limitations

1. **Browser-only**: Requires `window` and DOM APIs—will not work server-side.
2. **Offset Timing**: Offset is applied after a short delay (300ms) to ensure smooth stacking, but timing may require adjustment depending on content/layout speed.
3. **Vertical Only**: Only handles vertical (Y-axis) scrolling.
4. **No Callback/Event**: Does not notify when scrolling is complete.
5. **Possible Overlap**: If new content loads dynamically after scrolling, you may need to call the function again.

### Notes

- Useful for navigation menus, anchor links, "scroll to top" or "back to section" UX.
- The offset is particularly handy when you have sticky headers or toolbars covering part of the scrolled-to element.
- For complex scenarios, consider listening for scroll events or using Intersection Observer for enhanced visibility tracking.

### Recommended Use Cases

- Navigating to sections in single-page applications (FAQs, docs, dashboards).
- Scroll-to-anchor feature with header-aware adjustment.
- Enhancing accessibility with keyboard navigation.
- Instant, animated focus for UI feedback (e.g., on form error validation).

---

**Conclusion:**  
`smoothScrollTo` offers developers a simple API for beautiful, modern scrolling experiences, with offset options for perfect UI alignment. Plug it into your navigation or UX flows for a premium feel!
