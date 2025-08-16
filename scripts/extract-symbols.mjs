// @ts-check

import fs from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Project, SyntaxKind } from "ts-morph";

/**
 * Walk the package's dist/dts (from node_modules) and parse .d.ts files
 * to extract functions, classes, interfaces, type aliases, and constants.
 *
 * Output: static/data/symbols.json
 */

const PKG = "nhb-toolbox";
const DTS_ROOT = resolve("node_modules", PKG, "dist", "dts");
const OUT_DIR = resolve("static", "data");
const OUT_FILE = resolve(OUT_DIR, "symbols.json");
const VERSION_FILE = resolve(OUT_DIR, "package-version.txt");

function findDtsFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const e of entries) {
        const p = resolve(dir, e.name);
        if (e.isDirectory()) files = files.concat(findDtsFiles(p));
        else if (e.isFile() && p.endsWith(".d.ts")) files.push(p);
    }
    return files;
}

async function main() {
    if (!fs.existsSync(DTS_ROOT)) {
        console.error(`Could not find ${DTS_ROOT}. Did you install ${PKG}?`);
        process.exit(1);
    }

    const dtsFiles = findDtsFiles(DTS_ROOT);
    if (!dtsFiles.length) {
        console.error(`No .d.ts files found under ${DTS_ROOT}`);
        process.exit(1);
    }

    // Create a ts-morph project that reads those d.ts files.
    const project = new Project({
        tsConfigFilePath: undefined,
        compilerOptions: {
            allowJs: false,
            declaration: false,
        },
    });

    // Add each .d.ts file to the project
    for (const f of dtsFiles) project.addSourceFileAtPath(f);

    const sourceFiles = project.getSourceFiles();
    const items = [];

    for (const sf of sourceFiles) {
        // Top-level exported declarations
        const exports = sf.getExportedDeclarations();

        for (const [name, decls] of exports) {
            // Some names map to multiple declarations (overloads, interface + var ...)
            // pick the first meaningful decl and inspect its kind
            if (/_/g.test(name)) continue;
            const first = decls[0];
            if (!first) continue;

            const kind = first.getKindName();

            let signature = "";
            let starter = "";

            // try to read JSDoc summary (if present)
            let shortDoc = "";

            if (first && typeof (/** @type {any}*/ (first)).getJsDocs === "function") {
                const jsDocs = (/** @type {any}*/ (first)).getJsDocs();
                if (jsDocs && jsDocs.length) {
                    shortDoc = String(jsDocs[0].getDescription?.() || jsDocs[0].getComment?.() || "")
                        .trim()
                        .split("\n")[0] || "";
                }
            }

            // Functions: get parameters
            if (first.getKind() === SyntaxKind.FunctionDeclaration || first.getKind() === SyntaxKind.FunctionType) {
                // Try to get call signatures
                const sigs = first.getType().getCallSignatures();
                if (sigs.length) {
                    const sig = sigs[0];
                    const params = sig.getParameters().map((p) => p.getName());
                    signature = `${name}(${params.join(", ")})`;
                    starter = `import { ${name} } from "${PKG}";\nconsole.log(${name}(${params.join(", ")}));`;
                } else {
                    signature = `${name}()`;
                    starter = `import { ${name} } from "${PKG}";\nconsole.log(${name}());`;
                }
            } else if (first.getKind() === SyntaxKind.VariableDeclaration || first.getKind() === SyntaxKind.PropertySignature) {
                signature = `${name}`;
                starter = `import { ${name} } from "${PKG}";\nconsole.log(${name});`;
            } else if (first.getKind() === SyntaxKind.ClassDeclaration) {
                // find constructor params
                const ctor = first.getFirstChildByKind(SyntaxKind.Constructor) || null;
                let params = [];
                if (ctor) {
                    params = ctor.getParameters().map((p) => p.getName());
                }
                signature = `class ${name}(${params.join(", ")})`;
                starter = `import { ${name} } from "${PKG}";\nconst inst = new ${name}(${params.map((p) => p).join(", ")});\nconsole.log(inst);`;
            } else if (first.getKind() === SyntaxKind.InterfaceDeclaration || first.getKind() === SyntaxKind.TypeAliasDeclaration) {
                signature = `${name}`;
                starter = `// Type: ${name}\nimport type { ${name} } from "${PKG}";\nconsole.log("${name} type available");`;
            } else {
                // fallback
                signature = `${name}`;
                starter = `import * as nhb from "${PKG}";\nconsole.log(nhb.${name});`;
            }

            items.push({
                name,
                kind,
                signature,
                starter,
                shortDoc,
                // include file path relative to the dts root so you can map to docs if needed
                path: sf.getFilePath().replace(DTS_ROOT + "/", ""),
            });
        }
    }

    // Sort: functions then classes then others
    const order = { FunctionDeclaration: 0, ClassDeclaration: 1, InterfaceDeclaration: 2, TypeAliasDeclaration: 3, VariableDeclaration: 4, PropertySignature: 5 };
    items.sort((a, b) => ((order[a.kind] ?? 99) - (order[b.kind] ?? 99)) || a.name.localeCompare(b.name));

    const out = { count: items.length, items };

    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_FILE, JSON.stringify(out, null, 2), "utf-8");

    // also write package version (read from package.json installed)
    try {
        const pkgJson = JSON.parse(fs.readFileSync(resolve("node_modules", PKG, "package.json"), "utf-8"));
        await writeFile(VERSION_FILE, String(pkgJson.version || "latest"), "utf-8");
    } catch (err) {
        await writeFile(VERSION_FILE, "latest", "utf-8");
    }

    console.log(`Extracted ${items.length} symbols -> ${OUT_FILE}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
