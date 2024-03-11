import { ChangeEventHandler, InputHTMLAttributes } from "react"
import Select from "./form/Select"
import { IRequestType, ITransactionType } from "@/types"
import { useNavigate } from "react-router-dom"

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
    navs: {
        value: string,
        label: string
    }[],
    changePath: (value: IRequestType | ITransactionType | string) => void | string,
    containerClassName?: string,
    currentValue: string
}

export default function NavSelect({ containerClassName, currentValue, navs, changePath, ...rest }: IProps) {
    const navigate = useNavigate()

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const value = (e.target as HTMLSelectElement).value
        const path = changePath(value)
        navigate(`${path}`)
    }

    return (
        <Select defaultValue={currentValue} containerClassName={`${containerClassName}`} {...rest} name="" id="" onChange={handleChange}>
            {navs.map((nav) => <option key={nav.value} value={nav.value} >{nav.label}</option>)}
        </Select>
    )
}
