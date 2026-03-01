import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface CropImageProps {
  image: string;
  aspect?: number;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const cropWidth = crop.width * scaleX;
      const cropHeight = crop.height * scaleY;
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No context');
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        cropWidth,
        cropHeight
      );
      resolve(canvas.toDataURL('image/jpeg'));
    };
    image.onerror = reject;
  });
}

const CropImage: React.FC<CropImageProps> = ({ image, aspect = 1, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(aspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteCb = useCallback((_: unknown, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(image, croppedAreaPixels);
    onCropComplete(croppedImg);
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-[420px] sm:h-[520px] bg-neutral-900 rounded overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteCb}
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-neutral-800/90 rounded px-2 py-1">
          <label htmlFor="crop-aspect" className="text-xs font-medium text-neutral-900 dark:text-neutral-100">Formato</label>
          <select
            id="crop-aspect"
            value={String(aspectRatio)}
            onChange={e => setAspectRatio(Number(e.target.value))}
            className="text-sm border rounded px-2 py-1 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
          >
            <option value="1">Cuadrado (1:1)</option>
            <option value={String(4 / 5)}>Vertical (4:5)</option>
            <option value={String(4 / 3)}>Balanceado (4:3)</option>
            <option value={String(5 / 3)}>Horizontal (5:3)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white/90 dark:bg-neutral-800/90 rounded px-2 py-1">
          <label htmlFor="crop-zoom" className="text-xs font-medium text-neutral-900 dark:text-neutral-100">Zoom</label>
          <input
            id="crop-zoom"
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="w-28 sm:w-32"
          />
        </div>
        <button onClick={handleDone} className="btn-ice px-4 py-2 shrink-0">Recortar</button>
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded shrink-0">Cancelar</button>
      </div>
    </div>
  );
};

export default CropImage;
