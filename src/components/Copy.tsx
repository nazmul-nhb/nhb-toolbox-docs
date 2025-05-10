import { useColorMode } from '@docusaurus/theme-common';
import { useCopyText } from 'nhb-hooks';
import { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
	text: string;
}

export default function Copy({ text }: Props) {
	const { colorMode } = useColorMode();

	const { copiedText, copyToClipboard } = useCopyText({
		onSuccess: (msg) => toast.success(msg),
		resetTimeOut: 1000,
	});

	return (
		<Fragment>
			<button
				onClick={() => copyToClipboard(text, 'Token Copied')}
				style={{
					background: 'none',
					border: 'none',
					color: colorMode === 'dark' ? '#7cc2ff' : '#228be6',
					cursor: 'pointer',
					padding: 0,
					fontFamily: 'var(--ifm-font-family-monospace)',
				}}
			>
				{copiedText ? '✅' : text}
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
