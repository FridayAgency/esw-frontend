"use client";

import * as React from 'react'
import { useState, useEffect } from "react";
import styles from "./openRole.module.scss";

import parse from "html-react-parser";
import Link from "next/link";
import Container from "@/app/components/Container";
import HeroHeaderSimple from "@/app/components/Panels/HeroHeaderSimple";
import ApplicationProcess from '@/app/components/Panels/ApplicationProcess';
import FeatureBlock from '@/app/components/Panels/FeatureBlock';
import Icon from "@/app/components/Icon";

import { differenceInDays } from "date-fns";

interface openRole {
  id: number | null;
  title: string;
  updated_at: string;
  content: string;
  location: string;
  team: string;
  absolute_url: string;
}

const normalizeHtmlForParser = (html: string) => {
  return html.replace(/<[^>]+>/g, (tag) => {
    return tag.replace(/(?:&nbsp;|\u00A0)+(?=[^\s"'<>\/=]+\s*=)/g, " ");
  });
};

const calculateDifferenceInDays = (dateInPast: Date) => {
  return differenceInDays(new Date(), dateInPast)
}

// const OpenRolePage: NextPage<PageParams> = async ({ params }) => {
const OpenRolePage = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = React.use(params);
  console.log({id});

  const [careerOpenRole, setCareerOpenRole] = React.useState<openRole>({id: parseInt(id), title: "", updated_at: "", content: "", location: "", team: "", absolute_url: ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let careerOpenRoleResponse = null;
  
  useEffect(() => {
    const fetchOpenRole = async () => {
      setLoading(true);
      try {
        const fetchCareerOpenRoleResponse = await fetch(`https://boards-api.greenhouse.io/v1/boards/esw/jobs/${id}`);
        if (!fetchCareerOpenRoleResponse.ok) {
          console.error("Error fetching open role");
          throw new Error(`HTTP error! status: ${fetchCareerOpenRoleResponse.status}`);
        } else {
          careerOpenRoleResponse = await fetchCareerOpenRoleResponse.json();
          console.log({careerOpenRoleResponse});
          setCareerOpenRole({
            id: careerOpenRoleResponse.id, title: careerOpenRoleResponse.title, updated_at: careerOpenRoleResponse.updated_at, 
            content: careerOpenRoleResponse.content ? parse(normalizeHtmlForParser(careerOpenRoleResponse.content)) as string : "",
            location: careerOpenRoleResponse?.offices[0]?.name, team: careerOpenRoleResponse.departments[0].name,
            absolute_url: careerOpenRoleResponse.absolute_url
          });
        }
      } catch (error) {
        console.error(error);
        setError("Error loading role.");
      } finally {
        setLoading(false);
      }
    }

    fetchOpenRole();
  }, []);

  return (
    <section className={styles["careers-open-role"]}>
      <HeroHeaderSimple panel={{title: careerOpenRole.title}} />
      <Container className={styles["careers-open-role__container"]}>
        <div className={styles["careers-open-role__content"]}>
          <div dangerouslySetInnerHTML={{ __html: careerOpenRole.content }} className={styles["careers-open-role__content__text"]} />
        </div>
        <div className={styles["careers-open-role__details"]}>
          <div className={styles["careers-open-role__details__location"]}>
            <h4 className={styles["careers-open-role__details__label"]}>
              <Icon type="location" /> Location
            </h4>
            <span className={styles["careers-open-role__details__content"]}>{careerOpenRole.location}</span>
          </div>
          <div className={styles["careers-open-role__details__team"]}>
            <h4 className={styles["careers-open-role__details__label"]}>
              <Icon type="target" /> Team
            </h4>
            <span className={styles["careers-open-role__details__content"]}>{careerOpenRole.team}</span>
          </div>
          <Link
            href={careerOpenRole.absolute_url}
            target='_blank'
            className={styles["careers-open-role__details__button"]}
          >
            <span className={styles["careers-open-role__details__button__dot"]}></span>
            Apply Now
          </Link>
        </div>
      </Container>
      <ApplicationProcess />
      <FeatureBlock panel={{
        background: "dark",
        title: "Life at ESW",
        subtitle: "Why ESW?",
        text: "<p>At ESW, we’re fostering a culture where innovation thrives, collaboration comes naturally, and inclusion is at the heart of everything we do, so our people can create work that truly matters.</p>",
        callToAction: {title: "Read More", url: "/life-at-esw/"}
        }} />
    </section>
  );
};

export default OpenRolePage;