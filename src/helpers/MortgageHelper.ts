import { IApplicationData } from "@/types";

export default class MortgageHelper {
    public static getMortgageValues(data: IApplicationData | null, propertyPrice: number) {
        const values = {
            mortgage: 0,
            equity: 0,
            cash: 0,
            equityFromRsa: 0
        }

        if (!data) {
            return values
        }

        const p = propertyPrice
        const k = Number(data.equity_percentage) ?? 0
        const e = p * k / 100 // Equity
        const m = p - e // Mortgage amount
        const q = (data.rsa_percentage && data.rsa_balance) ? data.rsa_percentage * data.rsa_balance / 100 : 0 // Equity from RSA

        const c = e - q

        values.mortgage = m
        values.cash = c
        values.equity = e
        values.equityFromRsa = q

        return values;
    }
}
