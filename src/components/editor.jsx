import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import { EditorTabs } from './editor-tabs'
import { EditorText } from './editor-text'

export const Editor = (props) => {
	const {
		state: { editor },
	} = useCanvas()

	return (
		<section css={tw`bg-white w-2/5 h-screen`} {...props}>
			<div css={tw`flex min-h-full`}>
				<EditorTabs />
				<div
					css={tw`p-8 w-full border-l border-gray-200 overflow-auto`}
				>
					{(editor.tab == 'text' || !editor.tab) && <EditorText />}
				</div>
			</div>
		</section>
	)
}
