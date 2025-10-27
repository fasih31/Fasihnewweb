
import { motion } from "framer-motion";

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Flutter", icon: "📱" },
  { name: "TypeScript", icon: "🔷" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Redis", icon: "🔴" },
  { name: "GraphQL", icon: "💎" }
];

export function TechStackIcons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-all cursor-pointer"
        >
          <span className="text-4xl">{tech.icon}</span>
          <span className="text-xs font-medium text-muted-foreground">{tech.name}</span>
        </motion.div>
      ))}
    </div>
  );
}
