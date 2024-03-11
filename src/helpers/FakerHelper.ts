import { IDocument } from "@/types";

export default class FakerHelper {
  public static documentsFromUrls = (urls: string) => {
    const docUrls = urls ? JSON.parse(urls) : [];
    const documents: IDocument[] = docUrls.map((url: string, index: number) => {
      return {
        id: index,
        url,
        name: "",
        deleted_at: "",
        created_at: "",
        updated_at: "",
      };
    });

    return documents;
  };
}
