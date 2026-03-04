import React from "react";
import { Card } from "./ui/Card";
import { Shield, Cpu, Users, Globe, Trophy, Code } from "lucide-react";

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-cyber-yellow" />,
      title: "Workshops and Training",
      description:
        "Participate in hands-on workshops and training sessions led by industry experts and experienced peers. Whether you're a beginner or looking to sharpen your skills, we have something for everyone.",
    },
    {
      icon: <Users className="w-6 h-6 text-cyber-yellow" />,
      title: "Networking Opportunities",
      description:
        "Connect with professionals, alumni, and fellow students who share your passion for cybersecurity. Our events and meetups are designed to help you build valuable relationships and learn from those who have walked the path before you.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-cyber-yellow" />,
      title: "Competitions and Challenges",
      description:
        "Test your skills and knowledge by taking part in cybersecurity competitions and challenges. These events are not only a great way to apply what you've learned but also to gain recognition and potential opportunities in the field.",
    },
    {
      icon: <Globe className="w-6 h-6 text-cyber-yellow" />,
      title: "Resource Sharing",
      description:
        "Access a wealth of resources, including study materials, toolkits, and industry news. Stay informed about the latest trends and technologies in cybersecurity.",
    },
    {
      icon: <Shield className="w-6 h-6 text-cyber-yellow" />,
      title: "Community Support",
      description:
        "Join a community of like-minded individuals who are committed to supporting each other's growth. Our club is a place where you can share ideas, ask questions, and collaborate on projects.",
    },
    {
      icon: <Code className="w-6 h-6 text-cyber-yellow" />,
      title: "Real-World Projects",
      description:
        "Collaborate on exciting cybersecurity projects, hack on open-source tools, and tackle realistic scenarios to build an impressive portfolio of practical experience.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-20 py-24 relative bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-gray-400 max-w-2xl">
            Explore the various ways our club supports your journey in
            cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="h-full">
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-lg border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
