
// Helper to create an image from a URL
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

// Helper to get the cropped image as a File and preview URL
export default async function getCroppedImg(imageSrc, crop, fileName = 'cropped.jpg') {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        // eslint-disable-next-line
        console.error('Canvas is empty');
        return;
      }
      const file = new File([blob], fileName, { type: blob.type });
      const url = URL.createObjectURL(blob);
      resolve({ file, url });
    }, 'image/jpeg');
  });
} 