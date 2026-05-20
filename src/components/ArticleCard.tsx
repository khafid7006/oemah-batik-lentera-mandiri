import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EducationArticle } from '../data/batikData';

interface ArticleCardProps {
  article: EducationArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="card-cultural flex flex-col md:flex-row h-full">
      <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8 md:w-2/3 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-batik-brown mb-4">{article.title}</h3>
        <p className="text-batik-dark/70 mb-6 leading-relaxed">
          {article.excerpt}
        </p>
        <button className="flex items-center text-batik-gold font-bold text-sm uppercase tracking-widest hover:translate-x-2 transition-transform">
          Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
