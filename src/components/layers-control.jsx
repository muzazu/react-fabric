import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'

export const LayerPreview = ({ obj, ...props }) => {
	if (!obj) return

	const imgSrc = obj.toDataURL({
		format: 'png',
		quality: 0.8,
	})

	return (
		<div {...props}>
			<img src={imgSrc} css={tw`w-full`} />
		</div>
	)
}

export const LayersControl = (props) => {
	const {
		state: { canvas },
	} = useCanvas()

	const layers = canvas?.getObjects() || []

	const setActiveObject = (obj) => {
		canvas.setActiveObject(obj)
		canvas.renderAll()
	}

	return (
		<div css={tw`py-8 px-4 bg-white w-1/3`} {...props}>
			<h2 css={tw`text-2xl font-bold mb-8`}>Layers</h2>
			<div
				css={[
					tw`px-4 py-4 -mx-4 -mb-8 bg-gray-100 overflow-y-auto border-t border-gray-300`,
					{
						minHeight: 'calc(100vh - 98px)',
						maxHeight: 'calc(100vh - 98px)',
					},
				]}
			>
				{layers.map((val, idx) => (
					<div
						key={idx.toString()}
						css={tw`w-full bg-gray-300 hover:bg-gray-200 rounded-md border border-gray-400 cursor-pointer mb-4`}
						onClick={() => {
							setActiveObject(val)
						}}
					>
						<div css={tw`px-4 py-4 flex space-x-4`}>
							<LayerPreview
								obj={val}
								css={tw`w-1/4 bg-white rounded-md border border-gray-300`}
							/>
							<div css={tw`w-full`}>
								<div css={tw`truncate`}>
									{val.type.toUpperCase()}{' '}
									{val.text && `- ${val.text}`}
								</div>
								<div css={tw`text-sm text-gray-600`}>
									Layer - {idx + 1}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
