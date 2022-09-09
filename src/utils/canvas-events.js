export const onObjectSelected = ({ selected }) => {
	if (selected?.length === 1) return selected[0].type

	return null
}

export const overrideRotateIcon = (fabric) => {
	fabric.util.object.extend(fabric.Object.prototype, {
		hasRotatingPoint: true,
		selectedIconImage: new Image(),
		iconSrc: '/assets/images/icon-rotate.png?v=__APP_VERSION__',

		_drawControl: function (control, ctx, methodName, left, top) {
			let self = this
			let size = this.cornerSize

			ctx.save()

			if (!self.isControlVisible(control)) {
				return
			}

			isVML() ||
				self.transparentCorners ||
				ctx.clearRect(left, top, size, size)

			if (control != 'mtr') {
				ctx.strokeRect(left, top, size, size)
			}

			ctx.restore()

			return this
		},
	})

	return fabric
}
