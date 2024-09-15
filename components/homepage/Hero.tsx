import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="mt-[80px]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt="doctorImg"
              src="/assets/images/doctors.jpg"
              width={800}
              height={800}
              className="absolute inset-0 h-full w-full rounded-3xl object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Find & Book Appointment with your Fav Doctors
            </h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
              hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
              minus veniam tempora deserunt? Molestiae eius quidem quam
              repellat.
            </p>

            <Button className="mt-10 bg-teal-600 hover:bg-teal-400">
              Explore Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
