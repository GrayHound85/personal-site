"use client";

import { useEffect, useRef, useState } from "react";

import ProjectCard from "@/components/sections/porfolio/ProjectCard";
import Card from "@/components/ui/Card";
import type { ProjectCardIconOptions } from "@/types/projects";

type ProjectGridItem = {
  id: string;
  link: string;
  image?: string;
  icon?: ProjectCardIconOptions;
  title: string;
  eager: boolean;
};

type ProjectsGridProps = {
  projects: ProjectGridItem[];
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [placeholderCount, setPlaceholderCount] = useState(0);

  useEffect(() => {
    function updatePlaceholderCount() {
      const panel = panelRef.current;
      const grid = gridRef.current;

      if (!panel || !grid) return;

      const gridStyle = getComputedStyle(grid);
      const columns = gridStyle.gridTemplateColumns.trim().split(/\s+/).length;
      const rowGap = Number.parseFloat(gridStyle.rowGap) || 0;
      const trackWidth = (grid.clientWidth - rowGap * (columns - 1)) / columns;
      const firstItem = grid.firstElementChild as HTMLElement | null;
      const cardWidth = firstItem?.getBoundingClientRect().width || trackWidth;
      const cardHeight = cardWidth * 0.7;
      const card = grid.parentElement;
      const cardStyle = card ? getComputedStyle(card) : null;
      const padding = cardStyle
        ? (Number.parseFloat(cardStyle.paddingTop) || 0) +
          (Number.parseFloat(cardStyle.paddingBottom) || 0)
        : 0;
      const availableHeight = Math.max(0, panel.clientHeight - padding);
      const rowsThatFit = Math.floor(
        (availableHeight + rowGap) / (cardHeight + rowGap),
      );
      const nextCount = Math.max(0, rowsThatFit * columns - projects.length);

      setPlaceholderCount((currentCount) =>
        currentCount === nextCount ? currentCount : nextCount,
      );
    }

    const resizeObserver = new ResizeObserver(updatePlaceholderCount);
    if (panelRef.current) resizeObserver.observe(panelRef.current);
    if (gridRef.current) resizeObserver.observe(gridRef.current);
    window.addEventListener("resize", updatePlaceholderCount);
    updatePlaceholderCount();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePlaceholderCount);
    };
  }, [projects.length]);

  return (
    <div
      ref={panelRef}
      className="scrollbar-hidden min-h-0 w-full max-w-screen-2xl flex-1 overflow-y-auto"
    >
      <Card className="min-h-full w-full border-none p-4 sm:p-6 lg:p-8">
        <div
          ref={gridRef}
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              link={project.link}
              image={project.image}
              icon={project.icon}
              title={project.title}
              eager={project.eager}
            />
          ))}
          {Array.from({ length: placeholderCount }, (_, index) => (
            <div
              key={`future-project-${index}`}
              aria-hidden="true"
              className="aspect-10/7 w-full max-w-100 rounded-card_inner bg-panel/30"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
