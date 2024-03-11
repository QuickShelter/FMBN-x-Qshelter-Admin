import { ICurrency } from "@/types";
import FormatHelper from "./FormatHelper";

export default class CurrencyHelper {
    public static format(amount: number, currency?: ICurrency) {
        if (currency === 'USD') {
            return FormatHelper.dollarFormatter.format(amount)
        }

        return FormatHelper.nairaFormatter.format(amount)
    }
}