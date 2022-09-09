import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import { EditorText } from './editor-text'

export const Editor = (props) => {
	const {
		state: { editor },
	} = useCanvas()
    console.log(editor)
	return (
		<section css={tw`bg-white w-2/5 h-screen overflow-auto p-8`} {...props}>
			{(editor.tab == 'text' || !editor.tab) && <EditorText />}
		</section>
	)
}
