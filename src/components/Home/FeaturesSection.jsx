import React from 'react';
import FeatureCard from './FeatureCard'; // Assume FeatureCard is in the same directory

const featuresData = [
  {
    title: 'Eco-Friendly Solutions',
    description:
      'Discover our range of sustainable practices that help protect the environment.',
  },
  {
    title: 'Innovative Technology',
    description:
      'Leveraging cutting-edge technology to offer efficient ESG management solutions.',
  },
  {
    title: 'Community Engagement',
    description:
      'Building strong, sustainable communities through active engagement and support.',
  },
  // Add more features as needed
];

const FeaturesSection = () => {
  return (
    <div className="flex overflow-x-scroll py-8" id="features">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
