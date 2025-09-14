"use client";
import Image from "next/image";
import React from "react";
import TestimonialImage1 from "../../app/assets/images/testimonial2.jpg";
import TestimonialImage2 from "../../app/assets/images/testimonial3.jpg";
import TestimonialImage3 from "../../app/assets/images/testimonial4.jpg";
import TestimonialImage4 from "../../app/assets/images/testimonial5.jpg";
import TestimonialImage6 from "../../app/assets/images/testimonial6.jpg";
import TestimonialImage7 from "../../app/assets/images/testimonial7.jpg";
import TestimonialImage8 from "../../app/assets/images/testimonial8.webp";

const testimonials = [
  { name: "Alice", img: TestimonialImage1 },
  { name: "Bob", img: TestimonialImage2 },
  { name: "Charlie", img: TestimonialImage3 },
  { name: "Diana", img: TestimonialImage4 },
  { name: "Ethan", img: TestimonialImage6 },
  { name: "Fiona", img: TestimonialImage7 },
  { name: "George", img: TestimonialImage8 },
  { name: "Hannah", img: TestimonialImage2 },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 px-4 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      {/* Floating Images */}
      <div className="absolute inset-0 flex  justify-center gap-4 z-0 opacity-80 pointer-events-none">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-40 rounded-xl overflow-hidden shadow-lg"
            style={{
              transform: `translateY(${(index % 3) * 20}px)`,
              animation: `float ${4 + (index % 3)}s ease-in-out infinite`,
            }}
          >
            <Image src={t.img.src} alt={t.name} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mt-[50px] md:mt-[120px] mx-auto text-center">
        <span className="text-sm uppercase tracking-wider text-gray-400 mb-2 inline-block">
          Testimonials
        </span>
        <h2 className="text-2xl md:text-4xl font-bold flex flex-col gap-3 text-gray-900 mb-4">
          Trusted by property owners <br />
          <span className="text-gray-500">agents and renters nationwide</span>
        </h2>
        <p className="text-gray-600 mb-6">
          See how SureKeys is helping landlords, tenants, and agents <br />{" "}
          simplify the rental process and build trust with every listing.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-800 transition">
          Read Their Stories →
        </button>
      </div>

      {/* Float Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
