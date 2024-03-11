import { IBase64Upload } from "@/types";

export default class ImageHelper {
  public static parseSrcDuringEdit() {

  }


  public static isString(image?: IBase64Upload | string): image is string {
    return typeof (image) == 'string';
  }

  public static isBase64Upload(image?: IBase64Upload | string): image is IBase64Upload {
    if (!image || typeof (image) == 'string') return false

    const img = image as IBase64Upload

    if (!img.attachment) return false

    return typeof (img.attachment) == "string";
  }

  public static getSrc(image: Blob | MediaSource | string) {
    if (typeof image === "string") {
      return image;
    }

    if (typeof image === "object") {
      return URL.createObjectURL(image);
    }
  }

  public static imageUrlToDataUrl(imageUrl?: string | null) {
    return new Promise<string | ArrayBuffer | undefined>((resolve, reject) => {
      // Fetch the image data
      if (!imageUrl) {
        resolve(undefined)
      } else {
        fetch(imageUrl, {
          credentials: 'same-origin',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch image');
            }
            return response.blob();
          })
          .then((blob) => {
            // Read the image data as Data URL
            const reader = new FileReader();
            reader.onloadend = () => {
              const dataUrl = reader.result;
              resolve(dataUrl ?? undefined);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(blob);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  public static getExtension(file: File) {
    // Extract file extension from the file name
    const extension = file.name.split('.').pop() || '';
    return extension;
  }

  public static async getBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;

        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  public static getExtensionFromUrl(url: string) {
    const extension = url.split('.').pop() || '';
    return extension;
  }

  public static async getBase64AndExtension(file: File): Promise<{ base64: string; extension: string }> {
    return new Promise<{ base64: string; extension: string }>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const extension = file.name.split('.').pop() || '';

        resolve({ base64, extension });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  public static prepImagesForRequest(images: (IBase64Upload | string)[] | null): (IBase64Upload | string)[] {
    if (!images) {
      return []
    }

    return images.map(image => {

      if (this.isBase64Upload(image)) {
        return {
          attachment: image.attachment.split('base64,')?.[1],
          attachment_ext: image.attachment_ext
        }
      }

      return image
    })
  }
}
