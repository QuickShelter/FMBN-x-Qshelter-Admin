import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from './ViewLayout.module.css'
import PageBackButton from "../../PageBackButton";
import Card from "../../Card";
import ContentLayout from "../ContentLayout";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export default function ViewLayout({ children, ...rest }: IProps) {
    return (
        <ContentLayout className={styles.container} {...rest}>
            <div className={styles.backSection}>
                <PageBackButton text="Back" className="" />
            </div>
            <div className="flex-1 flex flex-col px-[140px]">
                <Card className={styles.content}>
                    {children}
                </Card>
            </div>
        </ContentLayout>
    )
}
