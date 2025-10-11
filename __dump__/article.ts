/**
 * @class
 * Determines whether to use "a" or "an" before a given word/phrase.
 * Uses heuristics for acronyms/initialisms and common phonetic exceptions.
 */

export class Article {
	/** List of special-case rules for phonetic exceptions. */
	static #rules: Array<{ test: RegExp; article: 'a' | 'an' }> = [
		// Words that begin with a silent "h" → use "an"
		{ test: /^(honest|honor|hour|heir)/i, article: 'an' },

		// Words that start with a pronounced "u" (like "you") → use "a"
		{ test: /^(unicorn|university|user|eulogy|european|utensil)/i, article: 'a' },

		// Words starting with "one" or "once" → use "a"
		{ test: /^(one|once)/i, article: 'a' },

		// Acronyms starting with vowel sound (F, L, M, N, R, S, X)
		{ test: /^[FHLMNRSX]\b/i, article: 'an' },

		// Acronyms starting with consonant sound
		{ test: /^[BCDGHJKPQTWYZ]\b/i, article: 'a' },

		// Catch-all vowel start rule → "an"
		{ test: /^[aeiou]/i, article: 'an' },
	];

	/** Letters whose *names* start with a vowel sound (a, e, f, h, i, l, m, n, o, r, s, x). */
	private static readonly VOWEL_SOUND_LETTERS = new Set([
		'a',
		'e',
		'f',
		'h',
		'i',
		'l',
		'm',
		'n',
		'o',
		'r',
		's',
		'x',
	]);

	/** Words that are pronounced with an initial vowel sound despite spelling. */
	private static readonly SPECIAL_AN = [
		/^(honest|honor|hour|heir|honou?r|heirloom)/i, // silent h
		/^[aeiou]/i, // fallback vowel-start
	];

	/** Words that start with a consonant-like sound despite vowel spelling (e.g., "one", "university"). */
	private static readonly SPECIAL_A = [
		/^(one|once)/i, // "one" -> 'w' sound
		/^(uni([^n]|$)|unicorn|university|useful|user|utensil|euro|european|eulogy)/i, // "you" sound U / EU
	];

	/**
	 * Heuristic: determine whether the token is likely an *initialism/acronym* that is
	 * pronounced as a sequence of letter-names (e.g., "FBI", "M.B.A.", "MSc", "XKCD").
	 *
	 * The heuristics used:
	 *  - contains dots between letters: "M.B.A."
	 *  - is all-caps and length >= 2: "FBI", "MBA"
	 *  - contains 2 or more uppercase letters anywhere: "MSc", "eBay" -> "eBay" will NOT be treated as initialism
	 *  - short token (<= 3) that looks like an abbreviation (fallback)
	 *
	 * These are heuristics — you can extend with a whitelist if you need 100% coverage.
	 */
	private static isLikelyInitialism(token: string): boolean {
		if (!token) return false;

		// contains dot-separated letters, e.g., "M.B.A."
		if (/[A-Za-z]\.[A-Za-z]/.test(token)) return true;

		// all uppercase (≥2): "FBI", "MBA"
		if (/^[A-Z]{2,}$/.test(token)) return true;

		// two or more uppercase letters anywhere (covers "MSc" when S is uppercase)
		const upperMatches = token.match(/[A-Z]/g);
		if (upperMatches && upperMatches.length >= 2) return true;

		// short tokens (1-3 letters) that are mixed-case/one-upper (heuristic fallback).
		// This helps in many real-world cases like "MSc" (some styles use "MSc").
		if (token.length <= 3 && /^[A-Za-z]+$/.test(token) && /[A-Z]/.test(token[0])) {
			// treat short, non-wordy-looking tokens as initialism (tradeoff)
			return true;
		}

		return false;
	}

	/**
	 * Returns "a" or "an" for the provided phrase/word.
	 *
	 * Intention: if the input looks like an initialism (MSc, MBA, F.B.I.), this method decides
	 * based on the *name* of the first letter (e.g., "M" -> "em" -> vowel sound -> "an").
	 *
	 * Otherwise it applies a set of phonetic exception rules and falls back to first-letter vowel test.
	 */
	static getArticle(word: string): 'a' | 'an' {
		if (!word || typeof word !== 'string') return 'a';

		const token = word.trim().split(/\s+/)[0]; // consider only first token
		if (!token) return 'a';

		// explicit exceptional AN words (silent h, etc.)
		for (const rx of this.SPECIAL_AN) {
			if (rx.test(token)) return 'an';
		}

		// explicit exceptional A words (one-, uni-, etc.)
		for (const rx of this.SPECIAL_A) {
			if (rx.test(token)) return 'a';
		}

		// If it's likely an initialism/acronym, decide by the *first letter's name*:
		// e.g., "F" => "ef" (vowel sound) => "an F"
		if (this.isLikelyInitialism(token)) {
			const first = token[0].toLowerCase();
			return this.VOWEL_SOUND_LETTERS.has(first) ? 'an' : 'a';
		}

		// fallback: words starting with vowel letter => 'an', else 'a'
		return /^[aeiou]/i.test(token) ? 'an' : 'a';
	}

	/**
	 * Returns the given phrase prefixed with the correct indefinite article.
	 */
	static withArticle(phrase: string): string {
		const article = this.getArticle(phrase);
		return `${article} ${phrase}`;
	}
}
