import { FabricJSCanvas } from './components/canvas'
import { Editor } from './components/editor'
import tw from 'twin.macro'
import { CanvasContextMenu } from './components/canvas-contextmenu'
import { CanvasActions } from './components/canvas-actions'
import { LayersControl } from './components/layers-control'

function App() {
	return (
		<div css={tw`w-full flex`}>
			<CanvasContextMenu />
			<Editor />
			<div css={tw`bg-gray-300 w-full relative`}>
				<CanvasActions />
				<div css={tw`flex min-h-screen items-center w-full`}>
					<div
						css={tw`bg-white mx-auto h-auto hover:border border-yellow-500`}
					>
						<FabricJSCanvas />
					</div>
				</div>
			</div>
			<LayersControl />
		</div>
	)
}

export default App
