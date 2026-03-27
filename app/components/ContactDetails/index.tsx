import { CompanyInformation } from "@/types/graphql";
import styles from "./ContactDetails.module.scss";
import Icon from "../Icon";

const ContactDetails: React.FC<{ companyInformation: CompanyInformation }> = ({ companyInformation }) => {
  return (
    <div className={styles["contact__details"]}>
      <h2>Contact Us</h2>
      <ul>
        <li>
          <a href={`mailto:${companyInformation.companyInfo?.email}`}>{companyInformation.companyInfo?.email}</a>
        </li>
        <li>
          <a href={`tel:${companyInformation.companyInfo?.phoneNumber}`}>
            {companyInformation.companyInfo?.phoneNumber}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactDetails;
