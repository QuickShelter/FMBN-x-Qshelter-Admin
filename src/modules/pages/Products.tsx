import { Helmet } from "react-helmet";
import { useState } from "react";
import styles from "./Products.module.css";
import Modal from "../common/Modal/Modal";
import Card from "../common/Card/Card";
import UsersExport from "../users/Listing/UsersExport";
import Listing from "../products/Listing";
import { mockProducts } from "@/mock/products";
import TableWrapper from "../common/TableWrapper";
import DetailCard from "../common/DetailCard";
import ProductsDoughnutVisx, { ICategoriesChartDataPoint } from "../common/visualisations/ProductsDoughnutVisx";
import { scaleOrdinal } from "@visx/scale";
import ProductsChartLegendVisx from "../common/visualisations/ProductsChartLegendVisx";
import ListingLayout from "../common/layouts/ListingLayout";

export default function Products() {
  const [showExportModal, setShowExportModal] = useState(false);

  const data: ICategoriesChartDataPoint[] = [
    {
      key: "NHF Loans",
      color: "#D1505F",
      value: 25,
    },
    {
      key: "Rent-to-Own",
      color: "#679CF5",
      value: 10,
    },
    {
      key: "Estate Development Loans",
      color: "#94C676",
      value: 20,
    },
    {
      key: "Construction Loans",
      color: "#F7CB45",
      value: 15,
    },
    {
      key: "Renovation Loans",
      color: "#9962D8",
      value: 30,
    },
  ];

  // const stats: IDoughnutStats[] = [
  //   { label: 'NHF Loans', value: 10 },
  //   { label: 'Rent-to-Own', value: 10 },
  //   { label: 'Estate Development Loans', value: 10 },
  //   { label: 'Construction Loans', value: 10 },
  //   { label: 'Renovation Loans', value: 10 },
  // ]

  const colorScale = scaleOrdinal({
    domain: ["NHF Loans", "Rent-to-Own", "Estate Development Loans", "Construction Loans", "Renovation Loans"],
    range: [
      "#D1505F",
      "#679CF5",
      "#94C676",
      "#F7CB45",
      "#9962D8",
    ],
  });

  const infoScale = scaleOrdinal({
    domain: ["Completed", "Land & Infrastructure", "Off-plan"],
    range: [
      `10`,
      `10`,
      `10`,
    ],
  });

  return (
    <ListingLayout pageTitle="Products">
      <div className={styles.container}>
        <Modal
          show={showExportModal}
          onCancel={() => setShowExportModal(false)}
        >
          <UsersExport onClose={() => setShowExportModal(false)} />
        </Modal>
        <Helmet>
          <title>Products</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col sm:p-8 flex-1 gap-5 sm:h-fit">
            <div className={"card-no-mobile flex flex-col sm:grid sm:grid-cols-[538fr,406fr] gap-6 sm:p-6 sm:items-start"}>
              <div className="card-no-mobile flex flex-col sm:flex-row sm:items-center p-4 sm:p-6 gap-4 sm:h-[300px]">
                <div className="h-[200px] w-[200px]">
                  <ProductsDoughnutVisx
                    increment={5}
                    outerRadius={200}
                    padding={0}
                    data={data}
                  />
                </div>
                <div className="flex-1">
                  <ProductsChartLegendVisx
                    infoScale={infoScale}
                    colorScale={colorScale}
                  />
                </div>
              </div>
              <div className="card-no-mobile sm:p-6 flex flex-col gap-4">
                <Card className={`px-4 py-3 ${styles.shadow}`}>
                  <DetailCard label="Loan Products" value={5} />
                </Card>
                <Card className={`px-4 py-3 ${styles.shadow}`}>
                  <DetailCard label="Loan Products" value={5} />
                </Card>
                <Card className={`px-4 py-3 ${styles.shadow}`}>
                  <DetailCard label="Loan Products" value={5} />
                </Card>
              </div>
            </div>
            <Card className={`px-2 sm:px-6 py-4 ${styles.shadow}`}>
              <TableWrapper className="">
                <Listing data={mockProducts} offset={12} />
              </TableWrapper>
            </Card>
          </div>
        </div>
      </div >
    </ListingLayout>
  );
}
