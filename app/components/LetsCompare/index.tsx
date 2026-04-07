import styles from "./LetsCompare.module.scss";

const tableData = [
  {
    category: "Acquisition",
    esw: "Enterprise-grade marketing services and translated storefronts.",
    competitors: "Basic marketing tools with limited customisation.",
  },
  {
    category: "Checkout",
    esw: "Flexible models- composable, embedded, or hosted - always brand-owned and optimised for conversion.",
    competitors: "Hosted and template-driven, with limited brand control.",
  },
  {
    category: "Fulfilment",
    esw: "Worldwide omnichannel order management, fulfilment by ESW and compliant multi-carrier delivery.",
    competitors: "Relies heavily on a single carrier with limited flexibility for enterprise needs.",
  },
  {
    category: "Returns",
    esw: "Branded, localised returns with in-region processing for faster refunds and lower costs.",
    competitors: "Retailers manage most of the process and shoppers receive an inconsistent experience.",
  },
  {
    category: "Customer Experience",
    esw: "24/7 multilingual support from dedicated experts who know your brand.",
    competitors: "Ticketing system with reactive and slow service.",
  },
  {
    category: "Analytics",
    esw: "Actionable and accessible end-to-end insights across operations and the shopper journey.",
    competitors: "Basic dashboards with limited enterprise value and manual requests to CSM for reports.",
  },
  {
    category: "Partnership Model",
    esw: "Strategic, embedded partnerships built for enterprise growth.",
    competitors: "Prioritises volume, with no tailored strategy for enterprise brands.",
  },
  {
    category: "Multibrand Support",
    esw: "Unified management of multiple brands in one system.",
    competitors: "No support for multi-brand setups, resulting in data silos.",
  },
];

const LetsCompare = () => {
  return (
    <section className={styles["lets-compare"]}>
      <div className={styles["lets-compare__inner"]}>
        <h2 className={styles["lets-compare__heading"]}>Lets Compare</h2>
        <div className={styles["lets-compare__table-wrapper"]}>
          <table className={styles["lets-compare__table"]}>
            <thead>
              <tr>
                <th className={styles["lets-compare__th-empty"]} />
                <th className={styles["lets-compare__th"]}>ESW</th>
                <th className={styles["lets-compare__th"]}>Competitors</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ category, esw, competitors }) => (
                <tr key={category}>
                  <th className={styles["lets-compare__row-header"]} scope="row">
                    {category}
                  </th>
                  <td className={styles["lets-compare__td--esw"]}>{esw}</td>
                  <td className={styles["lets-compare__td--competitors"]}>{competitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LetsCompare;
