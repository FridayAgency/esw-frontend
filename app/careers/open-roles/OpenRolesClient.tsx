"use client";

import { useState, useMemo } from "react";
import styles from "./openRoles.module.scss";

import { ClassName } from "@fridayagency/classnames";

import Link from "next/link";
import Container from "@/app/components/Container";
import Icon from "@/app/components/Icon";

import { differenceInDays } from "date-fns";
import StayConnected from "../../components/Panels/StayConnected";

export interface Job {
  id: number;
  title: string;
  updated_at: string;
  departments: { name: string }[];
  offices: { location: string }[];
}

const calculateDifferenceInDays = (dateInPast: Date) => differenceInDays(new Date(), dateInPast);

const PAGE_SIZE = 8;

const OpenRolesPage = ({ jobs, fetchError }: { jobs: Job[]; fetchError?: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ searchTerm: "", location: "", team: "" });

  const locations = useMemo(
    () => Array.from(new Set(jobs.flatMap((j) => j.offices.map((o) => o.location)).filter(Boolean))).sort(),
    [jobs],
  );

  const teams = useMemo(
    () => Array.from(new Set(jobs.flatMap((j) => j.departments.map((d) => d.name)).filter(Boolean))).sort(),
    [jobs],
  );

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const matchesSearch =
          !appliedFilters.searchTerm || job.title.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase());
        const matchesLocation =
          !appliedFilters.location || job.offices.some((o) => o.location === appliedFilters.location);
        const matchesTeam = !appliedFilters.team || job.departments.some((d) => d.name === appliedFilters.team);
        return matchesSearch && matchesLocation && matchesTeam;
      }),
    [jobs, appliedFilters],
  );

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedFilters({ searchTerm, location: locationFilter, team: teamFilter });
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastPost: number = currentPage * PAGE_SIZE;
  const indexOfFirstPost: number = indexOfLastPost - PAGE_SIZE;
  const pageNumbers: number[] = [];
  const pagedJobs = useMemo(
    () => filteredJobs.slice(indexOfFirstPost, indexOfLastPost),
    [currentPage, filteredJobs]
  );

  for (let i = 1; i <= Math.ceil(filteredJobs.length / PAGE_SIZE); i++) {
    pageNumbers.push(i);
  }

  const previousButtonDisabled = currentPage <= 1;
  const previousButtonClass = new ClassName([styles["careers-open-roles__pagination__previous"]]);
  if (previousButtonDisabled) previousButtonClass.add(styles["disabled"]);

  const nextButtonDisabled = currentPage >= pageNumbers.length;
  const nextButtonClass = new ClassName([styles["careers-open-roles__pagination__next"]]);
  if (nextButtonDisabled) nextButtonClass.add(styles["disabled"]);

  const paginate = (pageNumber: number, e: any) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className={styles["careers-open-roles"]}>
        <Container flush narrow>
          <h2 className={styles["careers-open-roles__title"]}>Find Your Role</h2>

          <div className={styles["careers-open-roles__filter"]}>
            <form onSubmit={handleSubmit} className={styles["careers-open-roles__filter__form"]}>
              <div className={styles["careers-open-roles__filter__form__input-group"]}>
                <label htmlFor="search-term" className={styles["careers-open-roles__filter__form__label"]}>
                  Search
                </label>
                <input
                  id="search-term"
                  name="search-term"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, keyword"
                  className={styles["careers-open-roles__filter__form__input"]}
                />
              </div>
              <div className={styles["careers-open-roles__filter__form__input-group"]}>
                <label htmlFor="location" className={styles["careers-open-roles__filter__form__label"]}>
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["careers-open-roles__filter__form__input-group"]}>
                <label htmlFor="team" className={styles["careers-open-roles__filter__form__label"]}>
                  Team
                </label>
                <select id="team" name="team" value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
                  <option value="">All Teams</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles["careers-open-roles__filter__form__button"]}>
                <span className={styles["careers-open-roles__filter__form__button__dot"]}></span>
                Search Open Roles
              </button>
            </form>
          </div>

          {fetchError && <p className={styles["careers-open-roles__error"]}>{fetchError}</p>}

          <div className={styles["careers-open-roles__list"]}>
            <h3 className={styles["careers-open-roles__list__title"]}>{filteredJobs.length} Open Roles Found</h3>
            {pagedJobs.map((role) => (
              <Link
                href={`/careers/open-roles/${role.id}`}
                key={role.id}
                className={styles["careers-open-roles__list__item"]}
              >
                <div className={styles["careers-open-roles__list__item__heading"]}>
                  <h4 className={styles["careers-open-roles__list__item__title"]}>
                    <span>{role.title}</span>
                  </h4>
                  <div className={styles["careers-open-roles__list__item__updated-at"]}>
                    <Icon type="clock" />
                    {calculateDifferenceInDays(new Date(role.updated_at))} DAYS AGO
                  </div>
                </div>
                <div className={styles["careers-open-roles__list__item__details"]}>
                  <div className={styles["careers-open-roles__list__item__location"]}>
                    <Icon type="location" />
                    {role.offices[0]?.location ?? "—"}
                  </div>
                  <div className={styles["careers-open-roles__list__item__department"]}>
                    <Icon type="target" />
                    {role.departments[0]?.name ?? "—"}
                  </div>
                </div>
                <div className={styles["careers-open-roles__list__item__footer"]}>
                  <div className={styles["careers-open-roles__list__item__footer__arrow"]}>
                    <Icon type="arrowRight" />
                  </div>
                </div>
              </Link>
            ))}
            {pageNumbers.length > 1 && (
            <nav aria-label="pagination">
              <ul className={styles["careers-open-roles__pagination"]}>
                <button
                  aria-controls="pagination"
                  className={previousButtonClass.toString()}
                  onClick={(e) => paginate(currentPage - 1, e)}
                  disabled={currentPage <= 1}
                >
                  <Icon type="chevronDown" />
                </button>
                {pageNumbers.map((number, index) => {
                  const isActive = currentPage === index + 1;
                  const tabClass = new ClassName([styles["careers-open-roles__pagination__page-item"]]);
                  if (isActive) tabClass.add(styles["careers-open-roles__pagination__page-item--active"]);
                  return (
                    <li
                      key={number}
                      className={tabClass.toString()}
                    >
                      <a
                        onClick={(e) => paginate(number, e)}
                        href="!#"
                        className={styles["careers-open-roles__pagination__page-item__page-link"]}
                        aria-selected={isActive}
                      >
                        {number}
                      </a>
                    </li>
                  )
                })}
                <button
                  aria-controls="pagination"
                  className={nextButtonClass.toString()}
                  onClick={(e) => paginate(currentPage + 1, e)}
                  disabled={currentPage >= pageNumbers.length ? true : false}
                >
                  <Icon type="chevronDown" />
                </button>
              </ul>
            </nav>
            )}
          </div>
        </Container>
      </section>
      <StayConnected />
    </>
  );
};

export default OpenRolesPage;
