import { Hexagon, Image, Settings, Type } from 'react-feather'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'

export const EditorTabs = (props) => {
	const {
		state: {
			editor: { tab },
			canvas,
		},
		dispatch,
	} = useCanvas()

	const handleUpdateTab = (tab) => {
		// remove active object
		const activeObject = canvas?.getActiveObject() || null
		if (activeObject) canvas.discardActiveObject(activeObject)
		canvas.renderAll()

		dispatch({ editor: { tab } })
	}

	return (
		<nav {...props}>
			<ul>
				<li>
					<button
						css={[
							tw`text-gray-900 hover:bg-blue-50 flex w-full items-center px-6 py-4 text-sm cursor-pointer hover:border-r-2 border-blue-500`,
							tab === 'setting' && tw`bg-blue-50 border-r-2`,
						]}
						onClick={() => {
							handleUpdateTab('setting')
						}}
					>
						<Settings />
					</button>
				</li>
				<li>
					<button
						css={[
							tw`text-gray-900 hover:bg-blue-50 flex w-full items-center px-6 py-4 text-sm cursor-pointer hover:border-r-2 border-blue-500`,
							tab === 'text' && tw`bg-blue-50 border-r-2`,
						]}
						onClick={() => {
							handleUpdateTab('text')
						}}
					>
						<Type />
					</button>
				</li>
				<li>
					<button
						css={[
							tw`text-gray-900 hover:bg-blue-50 flex w-full items-center px-6 py-4 text-sm cursor-pointer hover:border-r-2 border-blue-500`,
							tab === 'image' && tw`bg-blue-50 border-r-2`,
						]}
						onClick={() => {
							handleUpdateTab('image')
						}}
					>
						<Image />
					</button>
				</li>
				<li>
					<button
						css={[
							tw`text-gray-900 hover:bg-blue-50 flex w-full items-center px-6 py-4 text-sm cursor-pointer hover:border-r-2 border-blue-500`,
							tab === 'shapes' && tw`bg-blue-50 border-r-2`,
						]}
						onClick={() => {
							handleUpdateTab('shapes')
						}}
					>
						<Hexagon />
					</button>
				</li>
			</ul>
		</nav>
	)
}
