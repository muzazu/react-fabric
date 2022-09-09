import { Hexagon, Image, Settings, Type } from 'react-feather'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'

export const EditorTabs = (props) => {
	const {
		state: {
			editor: { tab },
		},
		dispatch,
	} = useCanvas()

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
							dispatch({ editor: { tab: 'setting' } })
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
							dispatch({ editor: { tab: 'text' } })
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
							dispatch({ editor: { tab: 'image' } })
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
							dispatch({ editor: { tab: 'shapes' } })
						}}
					>
						<Hexagon />
					</button>
				</li>
			</ul>
		</nav>
	)
}
