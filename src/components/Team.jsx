import React from "react";
import { motion } from "framer-motion";

const members = [
  {
    name: "Othmane",
    role: "Lead Developer",
    bio: "Spécialiste front-end & performance web.",
    img: "/assets/team/member1.svg",
  },
  {
    name: "Camille",
    role: "Designer",
    bio: "UI/UX & identité visuelle.",
    img: "/assets/team/member2.svg",
  },
  {
    name: "Lucas",
    role: "Marketing",
    bio: "Stratégie digitale & contenu.",
    img: "/assets/team/member3.svg",
  },
];

export default function Team() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => (
        <motion.article
          key={m.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-lg shadow-sm p-5 flex flex-col items-center text-center"
          aria-labelledby={`member-${i}`}
        >
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 mb-4">
            <img
              src={m.img}
              alt={`${m.name} — ${m.role}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 id={`member-${i}`} className="text-lg font-semibold">
            {m.name}
          </h3>
          <p className="text-sm text-primary-600">{m.role}</p>
          <p className="mt-2 text-gray-600 text-sm">{m.bio}</p>
        </motion.article>
      ))}
    </div>
  );
}
