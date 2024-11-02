import React from 'react'

type ImageOverlayProps = {
  imgSrc: string
  imgAlt: string
  onClose: () => void
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  imgSrc,
  imgAlt,
  onClose
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <img src={imgSrc} alt={imgAlt} className="max-h-full max-w-full" />
    </div>
  )
}

export default ImageOverlay
