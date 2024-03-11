import { IProject } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import DetailCard from "../DetailCard";
import FormatHelper from "@/helpers/FormatHelper";
import StringHelper from "@/helpers/StringHelper";

interface IProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    project: IProject;
}
const ProjectTemplate = ({ className, project, ...rest }: IProps) => {
    const developer = project.developer

    return < div {...rest} className={`${className} flex flex-col gap-4 px-6 py-6`} >
        <h1 className="font-lg">Renewed Hope Project</h1>
        <div className="grid grid-cols-2 gap-4">
            <DetailCard label="State" value={project.state} />
            <DetailCard label="City" value={project.city} />
            <DetailCard label="Status" value={StringHelper.stripUnderscores(project.status)} />
            <DetailCard label="Gross Development Value" value={FormatHelper.nairaFormatter.format(project.gdv)} />
        </div>
        <div className="flex flex-col gap-4">
            <DetailCard label="Developer" value={developer?.businessName} />
        </div>
        <div>
            <h2>Buildings</h2>
            <div>
                {project.proposedProperties.map(property => {
                    return <div className="grid grid-cols-2 gap-4">
                        <DetailCard label="Number of Bedrooms" value={property.nBeds} />
                        <DetailCard label="Type" value={property.type} />
                        <DetailCard label="Number of Units" value={property.nUnits} />
                        <DetailCard label="Target Price" value={FormatHelper.nairaFormatter.format(property.targetPrice)} />
                    </div>
                })}
            </div>
        </div>
    </div >
}

export default ProjectTemplate