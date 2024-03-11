import { IContribution, IContributionRequest } from "@/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import ContributionCard from "./ContributionCard";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  request: IContributionRequest;
}

export default function Contributions({
  className,
  request,
  ...rest
}: IProps) {
  const contributions: IContribution[] = request?.data?.contributions ?? []

  return (
    <div
      {...rest}
      className={`${className} card-no-mobile flex flex-col gap-4 sm:gap-5 sm:py-6 sm:px-6 px-0 py-4`}
    >
      <h2>Contributions</h2>
      <div className="flex flex-col gap-4">
        {contributions?.map(contribution => {
          return <ContributionCard contribution={contribution} />
        })}
      </div>
    </div>
  );
}
