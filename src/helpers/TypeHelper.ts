import { IApplicationDocument, IDocument, IPropertyDocument } from "@/types";

export default class TypeHelper {
  public static isPropertyDocument(
    document: IDocument
  ): document is IPropertyDocument {
    return "description" in document;
  }

  public static isApplicationDocument(
    document: IDocument
  ): document is IApplicationDocument {
    return !("description" in document);
  }
}
