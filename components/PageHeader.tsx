import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle,
  image = "https://picsum.photos/1920/600?grayscale&blur=2"
}) => {
  return (
    <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={image}
          alt={title} 
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tonga-red/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">{title}</h1>
        <p className="text-lg text-white uppercase tracking-widest font-semibold drop-shadow-md border-b-2 border-white inline-block pb-1">{subtitle}</p>
      </div>
    </section>
  );
};