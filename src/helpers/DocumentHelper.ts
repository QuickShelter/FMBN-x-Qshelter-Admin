import { FileSize } from "@/enums";
import { DevApiDocumentSubPath, IDevApiDocument } from "@/types";

/**
 * Example function that might throw an error.
 * @throws {Error} Throws an error if a random condition is met.
 * @returns {string} Returns the correct subpath.
 */
export default class DocumentHelper {
    public static convertToMB(value: number) {
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        return formatter.format(value / FileSize.MB)
    }

    public static displaySize(value: number) {
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })

        if (value / FileSize.MB < 1) {
            return `${formatter.format(value / FileSize.KB)} KB`
        }

        return `${formatter.format(value / FileSize.MB)} MB`
    }

    public static getSubpath = (document: IDevApiDocument) => {
        if (document.developerId) {
            return DevApiDocumentSubPath.DEVELOPER_DOCUMENT
        }

        if (document.developerDirectorId) {
            return DevApiDocumentSubPath.DEVELOPER_DIRECTOR_DOCUMENT
        }

        if (document.proposedDevelopmentId) {
            return DevApiDocumentSubPath.PROPOSED_DEVELOPMENT_DOCUMENT
        }

        throw new Error("Type not found");
    }

    public static documentNameMap: Record<string, string> = {
        acceptanceLetter: 'Employment Letter',
        staffId: 'Staff ID',
        paySlip: 'Pay Slip',
        nhfLoanForm: 'NHF Loan Form',
        signedPropertyDocument: 'Sign Property Document',
        utilityDocument: 'Utiity Document',
        birthCertificateLetter: 'Birth Certicate Letter',
    }
}