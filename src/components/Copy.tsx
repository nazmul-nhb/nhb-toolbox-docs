import { useColorMode } from '@docusaurus/theme-common';
import { useCopyText } from 'nhb-hooks';
import { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
	/** * The string content to be copied. */
	text: string;
	/** * Text content to display in place of original content after successful copy. */
	afterCopy?: string;
	/** * Text content to display for the toast message. */
	message?: string;
}

export default function Copy({ text, afterCopy = '✅', message = 'Token Copied!' }: Props) {
	const { colorMode } = useColorMode();

	const { copiedText, copyToClipboard } = useCopyText({
		onSuccess: (msg) => toast.success(msg),
		resetTimeOut: 1500,
	});

	return (
		<Fragment>
			<button
				onClick={() => copyToClipboard(text, message)}
				style={{
					background: 'none',
					border: 'none',
					color: colorMode === 'dark' ? '#7cc2ff' : '#228be6',
					cursor: 'pointer',
					padding: 0,
					fontFamily: 'var(--ifm-font-family-monospace)',
				}}
			>
				{copiedText ? afterCopy : text}
			</button>
			<Toaster
				toastOptions={{
					...(colorMode === 'dark' && {
						success: { style: { color: 'white', background: 'black' } },
					}),
					...(colorMode === 'dark' && {
						iconTheme: { primary: 'teal', secondary: 'dark' },
					}),
				}}
				position="top-center"
			/>
		</Fragment>
	);
}
