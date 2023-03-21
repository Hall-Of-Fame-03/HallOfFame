export function shrinkAndResizeImage(
  base64Image: string,
  width: number,
  height: number
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // Create an HTMLImageElement from the base64 string
    const img = new Image();
    img.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = img.width / img.height;

      // Calculate the new dimensions while maintaining the aspect ratio
      let newWidth, newHeight;
      if (width / height > aspectRatio) {
        newWidth = height * aspectRatio;
        newHeight = height;
      } else {
        newWidth = width;
        newHeight = width / aspectRatio;
      }

      // Create a canvas and draw the resized image onto it
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert the canvas to a base64 string and resolve the promise
      const resizedBase64 = canvas.toDataURL();
      resolve(resizedBase64);
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = base64Image;
  });
}
