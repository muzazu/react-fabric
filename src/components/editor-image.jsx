import { css } from '@emotion/css'
import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Image } from 'react-feather'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'

export const EditorImage = (props) => {
	const {
		state: { canvas, fabric, images: cImgs },
		dispatch,
	} = useCanvas()
	const [dragActive, setDragActive] = useState()
	const [images, setImages] = useState(cImgs)

	const onFileChange = (e) => {
		if (!e.target?.files?.length) return

		for (const val of e.target.files) {
			const url = URL.createObjectURL(val)
			setImages((state) => [...state, url])
		}
	}

	const handleDrop = (e) => {
		e.preventDefault()
		e.stopPropagation()
		if (!e.dataTransfer?.files?.length) return
		setDragActive(false)

		for (const val of e.dataTransfer.files) {
			const url = URL.createObjectURL(val)
			setImages((state) => [...state, url])
		}
	}

	// handle drag events
	const handleDrag = (e) => {
		e.preventDefault()
		e.stopPropagation()

		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	const addImage = (url) => {
		fabric.Image.fromURL(url, (myImg) => {
			const img = myImg.set({
				left: 0,
				top: 0,
				type: 'image',
			})
			canvas.add(img)
			canvas.renderAll()
		})
	}

	useEffect(() => {
		if (images) {
			dispatch({ images })
		}
	}, [images])

	return (
		<div {...props}>
			<h2 css={tw`text-2xl font-bold mb-8`}>Image</h2>

			<div css={tw`w-full mb-8`}>
				<label
					css={[
						tw`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none`,
						dragActive && tw`border-solid`,
					]}
					onDrop={handleDrop}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
				>
					<span css={tw`flex items-center space-x-2`}>
						<Image />
						<span css={tw`font-medium text-gray-600`}>
							Choose File or Drop it here
						</span>
					</span>
					<input
						type="file"
						name="file_upload"
						css={tw`hidden`}
						onChange={onFileChange}
					/>
				</label>
			</div>

			<Transition
				as={Fragment}
				enter={css(tw`transition duration-100 ease-out`)}
				enterFrom={css(tw`transform scale-95 opacity-0`)}
				enterTo={css(tw`transform scale-100 opacity-100`)}
				leave={css(tw`transition duration-75 ease-out`)}
				leaveFrom={css(tw`transform scale-100 opacity-100`)}
				leaveTo={css(tw`transform scale-95 opacity-0`)}
				show={images.length > 0}
			>
				<div
					css={tw`bg-blue-100 border-2 border-blue-800 shadow-md shadow-inner rounded py-8 px-4 flex flex-wrap max-h-96 overflow-auto`}
				>
					{images.map((val, idx) => (
						<div
							key={idx.toString()}
							css={tw`w-1/3 overflow-hidden p-2`}
						>
							<img
								src={val}
								alt="uploaded image"
								css={tw`w-full hover:border-2 rounded border-blue-300 cursor-pointer`}
								onClick={() => addImage(val)}
							/>
						</div>
					))}
				</div>
			</Transition>
		</div>
	)
}
