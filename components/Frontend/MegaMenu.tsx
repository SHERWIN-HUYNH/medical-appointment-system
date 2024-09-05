"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const megaMenu = [
  {
    title: "Top Booked",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Presenting repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "Video prescription refill",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "In-person doctor visit",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "UTI consult",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
    ],
  },
  {
    title: "Doctors",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Presenting repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "Video prescription refill",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "In-person doctor visit",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "UTI consult",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
    ],
  },
  {
    title: "Specialists",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Presenting repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "Video prescription refill",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "In-person doctor visit",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "UTI consult",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
    ],
  },
  {
    title: "Symptoms",
    services: [
      {
        title: "Telehealth",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Presenting repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "Video prescription refill",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "In-person doctor visit",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
      {
        title: "UTI consult",
        slug: "tele-health",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium repellendus corrupti ut illo. Rerum minus eaque quia fugiat. Quos voluptas illum laboriosam. Sit minima quae illo odio ducimus saepe sapiente.",
      },
    ],
  },
];
export default function MegaMenu() {
  return (
    <NavigationMenu className="bg-white">
      <NavigationMenuList className="space-x-4">
        {megaMenu.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger className="bg-white hover:bg-gray-200">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                  {item.services.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={`/services${component.slug}`}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
