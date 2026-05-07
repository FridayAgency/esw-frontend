// "use client";

// import { useEffect, useRef } from "react";

import { GET_CAREER_POSTS } from "@/data";
import client from "@/lib/client";
import Link from "next/link";
import { PagePanelsPagePanelsCareersOpenRolesLayout } from "@/types/graphql";

import Container from "@/app/components/Container";
import parse from "html-react-parser";
import { differenceInDays } from "date-fns";

import styles from "./CareersOpenRoles.module.scss";
import Icon from "../../Icon";

interface CareersOpenRolesProps {
  panel: PagePanelsPagePanelsCareersOpenRolesLayout;
}

// const careerOpenRolesRef = useRef<{jobs: any[], meta: {total: number}}>({jobs: [], meta: {total: 0}});

const normalizeHtmlForParser = (html: string) => {
  return html.replace(/<[^>]+>/g, (tag) => {
    return tag.replace(/(?:&nbsp;|\u00A0)+(?=[^\s"'<>\/=]+\s*=)/g, " ");
  });
};

const calculateDifferenceInDays = (dateInPast: Date) => {
  return differenceInDays(new Date(), dateInPast)
}

// const fetchOpenRoles = async () => {
//   console.warn("fetchOpenRoles")
//   const fetchCareerOpenRolesResponse = await fetch(`https://boards-api.greenhouse.io/v1/boards/esw/jobs/?content=true`);
//   if (fetchCareerOpenRolesResponse.ok) {
//     careerOpenRolesRef.current = await fetchCareerOpenRolesResponse.json();
//   } else {
//     console.error("Error fetching career open roles");
//   }
//   console.warn("careerOpenRolesRef.current")
//   console.log(careerOpenRolesRef.current);
// }

// useEffect(() => {
//   fetchOpenRoles();
// }, []);

const CareersOpenRoles: React.FC<CareersOpenRolesProps> = async ({ panel }) => {
  const careerOpenRolesResponse = await fetch(`https://boards-api.greenhouse.io/v1/boards/esw/jobs/?content=true`);

  let careerOpenRoles: {jobs: any[], meta: {total: number}} = {jobs: [], meta: {total: 0}};
  if (careerOpenRolesResponse.ok) {
    careerOpenRoles = await careerOpenRolesResponse.json();
  } else {
    console.error("Error fetching career open roles");
  }
  console.log({careerOpenRoles});

  const items = careerOpenRoles?.jobs ? careerOpenRoles.jobs : [];
  const itemsFormatted: {id: string, title: string, location: string, department: string, content: string, updated_at: string}[] = [];
  const itemsTotal = careerOpenRoles?.meta?.total ? careerOpenRoles?.meta?.total : 0
  const departments: string[] = []
  const locations: string[] = []

  items.forEach((item) => {
    if (!departments.includes(item.departments[0].name)) {
      departments.push(item.departments[0].name)
    }

    if (!locations.includes(item.location.name)) {
      locations.push(item.location.name)
    }

    itemsFormatted.push({
      id: item.id,
      title: item.title,
      location: item.location.name,
      department: item.departments[0].name,
      content: item.content ? parse(normalizeHtmlForParser(item.content)) as string : "",
      updated_at: item.updated_at
    });
  });

  return (
    <section className={styles["careers-open-roles"]}>
      <Container flush narrow className={styles.careersOpenRoles}>
        <div className="careers-open-roles__filter">
          {/* <h2>Find Your Role</h2>
          <input type="text"></input>
          <h2>Departments</h2>
          {departments.map((department, index) => (
            <div key={index} className={styles["careers-open-roles__department"]}>
              <div className={styles["careers-open-roles__department-name"]}>{department}</div>
            </div>
          ))}

          <h2>Locations</h2>
          {locations.map((location, index) => (
            <div key={index} className={styles["careers-open-roles__location"]}>
              <div className={styles["careers-open-roles__location-name"]}>{location}</div>
            </div>
          ))} */}
        </div>

        <div className="careers-open-roles__list">
          <h3 className={styles["careers-open-roles__list__title"]}>{itemsTotal} Open Roles Found</h3>
          {itemsFormatted.map((item) => (
            <Link href={`/open-roles/${item.id}`} key={item.id} className={styles["careers-open-roles__list__item"]}>
              <div className={styles["careers-open-roles__list__item__heading"]}>
                <h4 className={styles["careers-open-roles__list__item__title"]}>{item.title}</h4>
                <div className={styles["careers-open-roles__list__item__updated-at"]}><Icon type="clock" />{calculateDifferenceInDays(new Date(item.updated_at))} DAYS AGO</div>
              </div>
              <div className={styles["careers-open-roles__list__item__details"]}>
                <div className={styles["careers-open-roles__list__item__location"]}><Icon type="location" />{item.location}</div>
                <div className={styles["careers-open-roles__list__item__department"]}><Icon type="target" />{item.department}</div>
              </div>
              <div className={styles["careers-open-roles__list__item__footer"]}>
                <div className={styles["careers-open-roles__list__item__footer__arrow"]}><Icon type="arrowRight" /></div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CareersOpenRoles;
