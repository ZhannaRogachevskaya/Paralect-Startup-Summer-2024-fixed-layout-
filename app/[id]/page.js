"use client";
import { useState } from "react";
import "./page.css";
import { CardItemDuration } from "@/components/CardItemDuration/CardItemDuration";
import Link from "next/link";

import { MainLayout } from "../../components/MainLayout/MainLayout";

const Movie = (id) => {
  const [breadcrumbs, setBreadcrumbs] = useState("");
  const updateBreadcrumbs = (nameBreadcrumbs) => {
    setBreadcrumbs(nameBreadcrumbs);
  };
  return (
    <MainLayout>
      <div className="wrapper">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Movie </Link> / {breadcrumbs}
          </div>
          <CardItemDuration id={id} updateBreadcrumbs={updateBreadcrumbs} />
        </div>
      </div>
    </MainLayout>
  );
};
export default Movie;
