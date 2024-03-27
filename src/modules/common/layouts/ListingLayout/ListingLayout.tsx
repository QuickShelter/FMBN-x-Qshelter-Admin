import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from './ListingLayout.module.css'
import Card from "../../Card";
import ProfileDropDown from "../../Nav/ProfileDropDown";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import Button from "../../Button";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pageTitle: string,
    contentClassName?: string
}

export default function ListingLayout({ children, contentClassName, pageTitle, ...rest }: IProps) {
    const user = useGetCurrentUser()
    const [_, setShowInvitationModal] = useState(false)

    return (
        <Card className={styles.container} {...rest}>
            <div className={styles.backSection}>
                <h2 className={styles.pageTitle}>{pageTitle}</h2>
                <div className="flex gap-3">
                    <Button
                        onClick={() => setShowInvitationModal(true)}
                        className=""
                    >
                        Add Admin
                    </Button>
                    {user && <ProfileDropDown user={user} />}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className={`${styles.content} ${contentClassName}`}>
                    {children}
                </div>
            </div>
        </Card>
    )
}
