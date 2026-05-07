"use client";

import { useState, useEffect } from "react";
import styles from "./openRoles.module.scss";

import Link from "next/link";
import Container from "@/app/components/Container";
import HeroHeaderSimple from "@/app/components/Panels/HeroHeaderSimple";
import Icon from "@/app/components/Icon";

import { differenceInDays } from "date-fns";

const calculateDifferenceInDays = (dateInPast: Date) => {
  return differenceInDays(new Date(), dateInPast)
}

const OpenRolesPage = () => {
  const [careerOpenRoles, setCareerOpenRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    console.warn('handleSubmit');
  }

  let careerOpenRolesResponse = null;
  
  useEffect(() => {
    const fetchOpenRoles = async () => {
      setLoading(true);
      try {
        const fetchCareerOpenRolesResponse = await fetch(`https://boards-api.greenhouse.io/v1/boards/esw/jobs/?content=true`);
        if (!fetchCareerOpenRolesResponse.ok) {
          console.error("Error fetching career open roles");
          throw new Error(`HTTP error! status: ${fetchCareerOpenRolesResponse.status}`);
        } else {
          careerOpenRolesResponse = await fetchCareerOpenRolesResponse.json();
          setCareerOpenRoles(careerOpenRolesResponse.jobs);
        }
      } catch (error) {
        console.error(error);
        setError('Error loading open roles.');
      } finally {
        setLoading(false);
      }
    }

    fetchOpenRoles();
  }, []);

  return (
    <section className={styles["careers-open-roles"]}>
      <HeroHeaderSimple panel={{title: "Open Roles", copy: "Our team is growing across all of our international offices and we’re looking for great people to join us!"}}></HeroHeaderSimple>
      <Container flush narrow className={styles.careersOpenRoles}>
        <h2 className={styles["careers-open-roles__title"]}>Find Your Role</h2>

        <div className={styles["careers-open-roles__filter"]}>
          <form onSubmit={handleSubmit} className={styles["careers-open-roles__filter__form"]}>
            <div className={styles["careers-open-roles__filter__form__input-group"]}>
              <label htmlFor="search-term" className={styles["careers-open-roles__filter__form__label"]}>Search</label>
              <input
                id="search-term"
                name="search-term"
                type="text"
                value={searchTerm}
                onFocus={() => setSearchTerm("")}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, keyword"
                className={styles["careers-open-roles__filter__form__input"]}
                autoFocus
              />
            </div>
            <div className={styles["careers-open-roles__filter__form__input-group"]}>
              <label htmlFor="location" className={styles["careers-open-roles__filter__form__label"]}>Location</label>
              <select id="location" name="location">
                <option value="">All Locations</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className={styles["careers-open-roles__filter__form__input-group"]}>
              <label htmlFor="team" className={styles["careers-open-roles__filter__form__label"]}>Team</label>
              <select id="team" name="team">
                <option value="">All Teams</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Technology">Technology</option>
                <option value="Corporate &amp; Admin">Corporate &amp; Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles["careers-open-roles__filter__form__button"]}
            >
              <span className={styles["careers-open-roles__filter__form__button__dot"]}></span>
              {loading ? "Searching..." : "Search Open Roles"}
            </button>
          </form>
        </div>

        <div className="careers-open-roles__list">
          <h3 className={styles["careers-open-roles__list__title"]}>{careerOpenRoles.length} Open Roles Found</h3>
          {careerOpenRoles.map((role: {id: number, title: string, updated_at: string, departments: {name: string}[], offices: {location: string}[]}) => {
            return (
              <Link href={`/open-roles/${role.id}`} key={role.id} className={styles["careers-open-roles__list__item"]}>
                <div className={styles["careers-open-roles__list__item__heading"]}>
                  <h4 className={styles["careers-open-roles__list__item__title"]}><span>{role.title}</span></h4>
                  <div className={styles["careers-open-roles__list__item__updated-at"]}><Icon type="clock" />{calculateDifferenceInDays(new Date(role.updated_at))} DAYS AGO</div>
                </div>
                <div className={styles["careers-open-roles__list__item__details"]}>
                  <div className={styles["careers-open-roles__list__item__location"]}><Icon type="location" />{role.offices[0].location}</div>
                  <div className={styles["careers-open-roles__list__item__department"]}><Icon type="target" />{role.departments[0].name}</div>
                </div>
                <div className={styles["careers-open-roles__list__item__footer"]}>
                  <div className={styles["careers-open-roles__list__item__footer__arrow"]}><Icon type="arrowRight" /></div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  );
};

export default OpenRolesPage;