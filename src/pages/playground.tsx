import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useMemo, useState } from 'react';

/**
 * NHB Toolbox Playground (runs entirely in-browser).
 * - Loads /data/symbols.json (generated in prebuild)
 * - Lets user search & insert a starter snippet
 * - Sandpack pulls nhb-toolbox from npm at the exact docs version
 */
export default function Playground(): JSX.Element {
	const [symbols, setSymbols] = useState<{
		count: number;
		items: { name: string; kind: string; starter: string }[];
	} | null>(null);
	const [version, setVersion] = useState<string>('latest');
	const [query, setQuery] = useState('');
	const [code, setCode] = useState<string>(
		() => `import React from "react";
import { createRoot } from "react-dom/client";
import * as nhb from "nhb-toolbox";

function App() {
  return <pre>nhb-toolbox playground ready</pre>;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);`
	);

	useEffect(() => {
		fetch('/data/symbols.json')
			.then((r) => r.json())
			.then(setSymbols)
			.catch(() => setSymbols({ count: 0, items: [] }));
		fetch('/data/package-version.txt')
			.then((r) => r.text())
			.then((v) => setVersion(v.trim()))
			.catch(() => {});
	}, []);

	const filtered = useMemo(() => {
		if (!symbols) return [];
		const q = query.trim().toLowerCase();
		if (!q) return symbols.items.slice(0, 60);
		return symbols.items
			.filter((it) => (it.name + ' ' + it.kind).toLowerCase().includes(q))
			.slice(0, 100);
	}, [symbols, query]);

	function wrap(starter: string) {
		return `${starter}`;
	}

	return (
		<div className="container" style={{ padding: 20 }}>
			<h1>NHB Toolbox Playground</h1>
			<p>Search any function/class, insert a snippet, and run it instantly.</p>

			<div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
				<aside
					style={{
						border: '1px solid var(--ifm-color-emphasis-300)',
						borderRadius: 12,
						padding: 12,
						maxHeight: 540,
						overflow: 'auto',
					}}
				>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search functions, classes..."
						aria-label="Search symbols"
						style={{
							width: '100%',
							padding: 8,
							marginBottom: 12,
							borderRadius: 8,
							border: '1px solid var(--ifm-color-emphasis-300)',
						}}
					/>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
						{filtered.map((it, i) => (
							<li key={i} style={{ marginBottom: 8 }}>
								<button
									onClick={() => setCode(wrap(it.starter))}
									style={{
										width: '100%',
										textAlign: 'left',
										padding: 8,
										borderRadius: 8,
										border: '1px solid var(--ifm-color-emphasis-300)',
										background: 'var(--ifm-background-surface-color)',
										cursor: 'pointer',
									}}
								>
									<div style={{ fontWeight: 600 }}>{it.name}</div>
									<div style={{ fontSize: 12, opacity: 0.7 }}>
										{it.kind}
									</div>
								</button>
							</li>
						))}
						{!filtered.length && <li style={{ opacity: 0.7 }}>No matches.</li>}
					</ul>
				</aside>

				<main>
					<Sandpack
						template="react-ts"
						options={{ editorHeight: 540, showConsole: true }}
						files={{
							'/index.tsx': { code, active: true },
							'/public/index.html': { code: "<div id='root'></div>" },
						}}
						customSetup={{
							dependencies: {
								react: '^18.0.0',
								'react-dom': '^18.0.0',
								// lock to the docs’ displayed npm version for perfect parity
								'nhb-toolbox': version || 'latest',
							},
						}}
					/>
				</main>
			</div>
		</div>
	);
}
