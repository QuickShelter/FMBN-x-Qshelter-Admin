import { IPaginatedRequest, IProject, IProperty, IRequest, ITransaction, ITransactionType, IUser } from "@/types";
import pdfMake from "pdfmake/build/pdfmake";
import UserHelper from "./UserHelper";
import { PageOrientation, TDocumentDefinitions } from "pdfmake/interfaces";
import PropertyHelper from "./PropertyHelper";
import FormatHelper from "./FormatHelper";
import StringHelper from "./StringHelper";
import EnvironmentHelper from "./EnvironmentHelper";
import CurrencyHelper from "./CurrencyHelper";
import logo from '../assets/data-urls/logo'

const TRANSACTION_REF_LENGTH = 8
const LOGO_WIDTH = 50
const LOGO_ALIGNMENT = 'left'
const LOGO_MARGIN_BOTTOM = 20

export default class ExportHelper {
  /**
   * encodeAndExport
   */
  public static encodeAndExportCsv(augList: (string | null | number | undefined)[][]) {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      augList.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  /**
   * Initialize Font
   */
  public static initializeFont() {
    pdfMake.fonts = {
      // download default Roboto font from cdnjs.com
      // https://pdfmake.github.io/docs/0.1/fonts/custom-fonts-client-side/url/
      Roboto: {
        normal:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      },
    };
  }

  /**
   *
   * @param {array} items
   * @returns
   */
  public static exportRequestCsv = (items: IRequest[]) => {
    const headings: string[] = ["Title", "Requested By"];

    const augList = [
      headings,
      ...items.map((item) =>
        [item.title, item.requester_id].map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"` // Account for fields with commas
            : value
        )
      ),
    ];

    this.encodeAndExportCsv(augList);
  };

  /**
   *
   * @param {array} items
   * @returns
   */
  public static exportUserCsv(items: IUser[]): Promise<void> {
    const headings: string[] = ["Name", "Phone Number", "Roles", "Date Joined"];

    const augList = [
      headings,
      ...items.map((user) =>
        [
          UserHelper.getFullName(user),
          user.phone,
          user.roles.join(", "),
          user?.created_at ? new Date(user?.created_at).toLocaleDateString() : 'N/A',
        ].map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"` // Account for fields with commas
            : value
        )
      ),
    ];

    return new Promise((resolve, reject) => {
      try {
        resolve(this.encodeAndExportCsv(augList))
      } catch (error) {
        reject(error)
      }
    })

  };

  /**
   *
   * @param {array} items
   * @returns
   */
  public static exportTransactionsCsv(items: ITransaction[]): Promise<void> {
    const headings: string[] = ["S/N", "Wallet ID", "Currency", "Amount", "Type", "Status", "Ref", "Date"];

    const augList = [
      headings,
      ...items.map((transaction, index) =>
        [
          index + 1,
          transaction.wallet_id,
          transaction.currency,
          transaction.amount,
          StringHelper.stripUnderscores(transaction.type) ?? "N/A",
          StringHelper.stripUnderscores(transaction.status) ?? "N/A",
          StringHelper.getLastN(transaction.ref, TRANSACTION_REF_LENGTH) ?? "N/A",
          new Date(transaction?.created_at).toLocaleDateString(),
        ].map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"` // Account for fields with commas
            : value
        )
      ),
    ];

    return new Promise((resolve, reject) => {
      try {
        resolve(this.encodeAndExportCsv(augList))
      } catch (error) {
        reject(error)
      }
    })
  };

  /**
   *
   * @param {array} items
   * @returns
   */
  public static exportProjectsCsv(items: IProject[]): Promise<void> {
    const headings: string[] = ["Location", "Developer", "Status", "Review Date"];

    const augList = [
      headings,
      ...items.map((project) =>
        [
          project.proposedLocation ?? "N/A",
          project.developer?.businessName ?? "N/A",
          StringHelper.stripUnderscores(project.status) ?? "N/A",
          project.createdAt ? new Date(project?.createdAt).toLocaleDateString() : 'N/A',
        ].map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"` // Account for fields with commas
            : value
        )
      ),
    ];

    return new Promise((resolve, reject) => {
      try {
        resolve(this.encodeAndExportCsv(augList))
      } catch (error) {
        reject(error)
      }
    })
  };

  /**
   *
   * @param {array} items
   * @returns
   */
  public static exportPropertiesCsv = (items: IProperty[]) => {
    const headings: string[] = ["Title", "City", "State", "Price", "Status", "Date"];

    const augList = [
      headings,
      ...items.map((property) =>
        [
          property.title ?? "N/A",
          property.city ?? "N/A",
          property.state ?? "N/A",
          FormatHelper.nairaFormatter.format(property.price) ?? "N/A",
          StringHelper.stripUnderscores(property.status) ?? "N/A",
          property.created_at ? new Date(property?.created_at).toLocaleDateString() : 'N/A',
        ].map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"` // Account for fields with commas
            : value
        )
      ),
    ];

    return new Promise((resolve, reject) => {
      try {
        resolve(this.encodeAndExportCsv(augList))
      } catch (error) {
        reject(error)
      }
    })
  };

  /**
   *
   * @param {array} items
   * @returns
   */
  public static exportRequestsCsv = (items: IPaginatedRequest[]) => {
    const headings: string[] = ["Title", "Requested By", "State", "Price", "Status", "Date"];

    const augList = [
      headings,
      ...items.map((request) =>
        [
          request.title ?? "N/A",
          request.requester_id ?? "N/A",
          StringHelper.stripUnderscores(request.type) ?? "N/A",
          StringHelper.stripUnderscores(request.status) ?? "N/A",
          request.created_at ? new Date(request?.created_at).toLocaleDateString() : 'N/A',
        ].map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"` // Account for fields with commas
            : value
        )
      ),
    ];

    this.encodeAndExportCsv(augList);
  };

  public static exportRequestsPDF(data: IPaginatedRequest[]) {
    const tableBody = [];
    const tableHeader = ["S/N", "Title", "Requested By", "Type", "Status", "Date"];

    // Add table header
    tableBody.push(tableHeader);

    // Add table rows
    data.forEach((row, index) => {
      tableBody.push([
        index + 1,
        row.title,
        row.requester_id,
        StringHelper.stripUnderscores(row.type),
        StringHelper.stripUnderscores(row.status),
        new Date(row.created_at).toLocaleDateString(),
      ]);
    });

    this.initializeFont();

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          image: logo,
          width: LOGO_WIDTH,
          alignment: LOGO_ALIGNMENT,
          marginBottom: LOGO_MARGIN_BOTTOM
        },
        {
          table: {
            headerRows: 1,
            body: tableBody,
          },
        },
      ],
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake.createPdf(docDefinition).download("table.pdf");
  }

  public static exportProjectsPDF(data: IProject[]) {
    const tableBody = [];
    const tableHeader = ["S/N", "Location", "Developer", "Status", "Review Date"];

    // Add table header
    tableBody.push(tableHeader);

    // Add table rows
    data.forEach((row, index) => {
      tableBody.push([
        index + 1,
        row?.proposedLocation ?? "N/A",
        row?.developer?.businessName ?? "N/A",
        StringHelper.stripUnderscores(row.status) ?? "N/A",
        row?.reviewedAt ? new Date(row?.reviewedAt).toLocaleDateString() : 'N/A',
      ]);
    });

    this.initializeFont();

    const docDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            body: tableBody,
          },
        },
      ],
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake.createPdf(docDefinition).download(`${EnvironmentHelper.PROJECT_OWNER} Projects.pdf`);
  }

  public static exportUsersPDF(data: IUser[]) {
    const tableBody = [];
    const tableHeader = ["S/N", "Name", "Phone Number", "Roles", "Date Joined"];

    // Add table header
    tableBody.push(tableHeader);

    // Add table rows
    data.forEach((user, index) => {
      tableBody.push([
        index + 1,
        UserHelper.getFullName(user),
        user.phone,
        user.roles.join(", "),
        user?.created_at ? new Date(user?.created_at).toLocaleDateString() : 'N/A',
      ]);
    });

    this.initializeFont();

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          image: logo,
          width: LOGO_WIDTH,
          alignment: LOGO_ALIGNMENT,
          marginBottom: LOGO_MARGIN_BOTTOM
        },
        {
          table: {
            headerRows: 1,
            body: tableBody,
          },
        },
      ],
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake.createPdf(docDefinition).download("table.pdf");
  }

  public static exportTestPDF() {
    const docDefinition = {
      content: [
        {
          image: logo,
          width: 200
        },
      ],
      defaultStyle: {
        font: "Roboto",
      }
    };

    pdfMake.createPdf(docDefinition).download("test.pdf");
  }

  public static exportTransactionsPDF(data: ITransaction[], type: ITransactionType | undefined | ''): Promise<void> {
    const tableBody = [];
    const tableHeader = ["S/N", "Wallet ID", "Currency", "Amount", "Type", "Status", "Ref", "Date"];

    // Add table header
    tableBody.push(tableHeader);

    // Add table rows
    data.forEach((transaction, index) => {
      tableBody.push([
        index + 1,
        transaction.wallet_id,
        transaction.currency,
        transaction.amount,
        StringHelper.stripUnderscores(transaction.type) ?? "N/A",
        StringHelper.stripUnderscores(transaction.status) ?? "N/A",
        StringHelper.getLastN(transaction?.ref, TRANSACTION_REF_LENGTH) ?? "N/A",
        new Date(transaction.created_at).toLocaleDateString(),
      ]);
    });

    this.initializeFont();

    const creditNaira = data?.filter(item => item.type === 'credit' && item.currency === 'NGN').reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
    const creditDollars = data?.filter(item => item.type === 'credit' && item.currency === 'USD').reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
    const debitNaira = data?.filter(item => item.type === 'debit' && item.currency === 'NGN').reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
    const debitDollar = data?.filter(item => item.type === 'debit' && item.currency === 'USD').reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)

    const pageOrientation: PageOrientation = "landscape"

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          image: logo,
          width: LOGO_WIDTH,
          alignment: LOGO_ALIGNMENT,
          marginBottom: LOGO_MARGIN_BOTTOM
        },
        {
          table: {
            headerRows: 1,
            body: tableBody,
          },
        },
        '\n',
        type == 'debit' || !type ? `Total Debit = ${CurrencyHelper.format(debitNaira, 'NGN')}\t|\t ${CurrencyHelper.format(debitDollar, 'USD')}\n\n` : '',
        type == 'credit' || !type ? `Total Credit = ${CurrencyHelper.format(creditNaira, 'NGN')}\t|\t${CurrencyHelper.format(creditDollars, 'USD')}\n` : '',
      ],
      defaultStyle: {
        font: "Roboto",
      },
      pageOrientation: pageOrientation,
    };


    return new Promise((resolve, _) => {
      resolve(pdfMake.createPdf(docDefinition).download("transactions.pdf"))
    })
  }

  public static exportPropertiesPDF(data: IProperty[]) {
    const tableBody = [];
    const tableHeader = ["S/N", "Title", "Address", "City", "State", "Price", "Status", "Date"];

    // Add table header
    tableBody.push(tableHeader);

    // Add table rows
    data.forEach((property, index) => {
      tableBody.push([
        index + 1,
        property.title,
        property.address,
        property.city,
        property.state,
        FormatHelper.nairaFormatter.format(property.price),
        StringHelper.stripUnderscores(property.status) ?? "N/A",
        new Date(property.created_at).toLocaleDateString(),
      ]);
    });

    this.initializeFont();

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          image: logo,
          width: LOGO_WIDTH,
          alignment: LOGO_ALIGNMENT,
          marginBottom: LOGO_MARGIN_BOTTOM
        },
        {
          table: {
            headerRows: 1,
            body: tableBody,
          },
        },
      ],
      defaultStyle: {
        font: "Roboto",
      },
    };

    const returnValue = pdfMake.createPdf(docDefinition).download("table.pdf");

    return new Promise((resolve, _) => {
      resolve(returnValue)
    })


  }

  public static async exportPropertyToPDF(property: IProperty, displayImageDataUrl: string) {
    //const displayImageDataUrl = await ImageHelper.imageUrlToDataUrl('https://mofidevbucket.s3.amazonaws.com/property_images/64366490991705584033668.jpg')
    //const displayImageDataUrl = await ImageHelper.imageUrlToDataUrl(property?.display_image)
    this.initializeFont();

    const docDefinition: TDocumentDefinitions = {
      content: [
        property.title ?? "",
        `Address: ${property.address}`,
        {
          image: displayImageDataUrl ? displayImageDataUrl?.toString() : '',
          width: 150,
          height: 150,
        },
        `Amenities: `,
        {
          ul: PropertyHelper.getAmenitiesFromProperty(property)
        }
      ],
      styles: {

      },
      defaultStyle: {
        font: "Roboto",
        fontSize: 16,
      },
    };

    pdfMake.createPdf(docDefinition).download(`${property.title}.pdf`);
  }
}
