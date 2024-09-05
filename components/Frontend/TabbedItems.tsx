"use client";
import { Tabs } from "flowbite-react";
// import { content } from "flowbite-react/tailwind";
import { HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Activity, Microscope, Stethoscope, Syringe } from "lucide-react";

export default function TabbedItems() {
  const services = [
    {
      title: "Telehealth",
      image: "/doctor/dt1.jpg",
      slug: "telehealth",
    },
    {
      title: "Video prescription",
      image: "/doctor/dt2.jpg",
      slug: "telehealth",
    },
    {
      title: "Weight loss",
      image: "/doctor/dt3.jpg",
      slug: "telehealth",
    },
    {
      title: "UTI consult",
      image: "/doctor/dt4.jpg",
      slug: "telehealth",
    },
    {
      title: "Mental health",
      image: "/doctor/dt5.jpg",
      slug: "telehealth",
    },
    {
      title: "ED consult",
      image: "/doctor/dt6.jpg",
      slug: "telehealth",
    },
    {
      title: "Urgent care",
      image: "/doctor/dt7.jpg",
      slug: "telehealth",
    },
  ];
  const tabs = [
    {
      title: "Popular Services",
      icon: Stethoscope,
      component: <ServiceList data={services} />,
      content: [],
    },
    {
      title: "Doctors",
      icon: Microscope,
      component: <LinkCards className="bg-purple-800" />,
      content: [],
    },
    {
      title: "Specialists",
      icon: Activity,
      component: <LinkCards className="bg-blue-900" />,
      content: [],
    },
    {
      title: "Symptoms",
      icon: Syringe,
      component: <LinkCards className="bg-green-700" />,
      content: [],
    },
  ];
  return (
    <Tabs aria-label="Tabs with underline" variant="underline">
      {tabs.map((tab, i) => {
        return (
          <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
            {tab.component}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
}
