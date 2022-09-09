export const init = (fabric, canvas) => {
	/**
	 * handle replace MTR/rotate control with icon
	 */
	let loadedIcon = null

	const isControlRotate = (ctrl) => {
		return ctrl.x == 0 && ctrl.y == -0.5 && ctrl.offsetY == -40
	}

	fabric.util.object.extend(fabric.Object.prototype, {
		hasRotatingPoint: true,
		selectedIconImage: new Image(),
		iconSrc: '/assets/images/icon-rotate.png',

		drawControls: function (ctx, styleOverride) {
			styleOverride = styleOverride || {}
			ctx.save()

			const self = this

			let retinaScaling = this.canvas.getRetinaScaling(),
				matrix,
				p
			ctx.setTransform(retinaScaling, 0, 0, retinaScaling, 0, 0)
			ctx.strokeStyle = ctx.fillStyle =
				styleOverride.cornerColor || this.cornerColor
			if (!this.transparentCorners) {
				ctx.strokeStyle =
					styleOverride.cornerStrokeColor || this.cornerStrokeColor
			}
			this._setLineDash(
				ctx,
				styleOverride.cornerDashArray || this.cornerDashArray
			)
			this.setCoords()
			if (this.group) {
				// fabricJS does not really support drawing controls inside groups,
				// this piece of code here helps having at least the control in places.
				// If an application needs to show some objects as selected because of some UI state
				// can still call Object._renderControls() on any object they desire, independently of groups.
				// using no padding, circular controls and hiding the rotating cursor is higly suggested,
				matrix = this.group.calcTransformMatrix()
			}

			this.forEachControl(function (control, key, fabricObject) {
				p = fabricObject.oCoords[key]
				if (control.getVisibility(fabricObject, key)) {
					if (matrix) {
						p = fabric.util.transformPoint(p, matrix)
					}

					if (isControlRotate(control)) {
						if (loadedIcon) {
							ctx.drawImage(loadedIcon, p.x - 6, p.y - 8, 14, 14)
						} else {
							self.selectedIconImage.src = self.iconSrc
							self.selectedIconImage.onload = function () {
								self.isLoaded = true
								loadedIcon = this
								ctx.drawImage(this, p.x - 6, p.y - 8, 14, 14)

								canvas.renderAll()
							}
						}
					} else {
						control.render(
							ctx,
							p.x,
							p.y,
							styleOverride,
							fabricObject
						)
					}
				}
			})

			ctx.restore()

			return this
		},
	})
}
