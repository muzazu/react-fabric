import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'

export const EditorImage = (props) => {
	return (
		<div {...props}>
			<h2 css={tw`text-2xl font-bold mb-8`}>Image</h2>
		</div>
	)
}
