import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2 } from 'lucide-react';
import { type Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface NewsCardProps {
  fields?: {
    title: Field<string>;
    description: Field<string>;
    image: {
      value: {
        src: string;
        alt: string;
      };
    };
    category: Field<string>;
    timePosted: Field<string>;
    url: Field<string>;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ fields }) => {
  // Default/fallback values if Sitecore fields are not provided
  const defaultFields = {
    title: { value: 'AMORIM EXPLAINS SMALLER SQUAD SELECTION' },
    description: {
      value:
        "The boss wants to protect the club's youngsters, which is why only 18 players have travelled to Spain.",
    },
    image: {
      value: {
        src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRmx880TouFaBEIdZpXrRIDPuVyE6u.png',
        alt: 'Manchester United players in training',
      },
    },
    category: { value: 'news' },
    timePosted: { value: '17h' },
    url: { value: '/news/amorim-explains-squad-selection' },
  };

  // Use provided fields or fall back to defaults
  const { title, description, image, category, timePosted, url } = fields || defaultFields;

  return (
    <article className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={url.value} className="block">
        <div className="relative aspect-[16/9]">
          <Image
            src={image.value.src || '/placeholder.svg'}
            alt={image.value.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-200">
            <Text field={title} />
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            <Text field={description} />
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span>{timePosted.value}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span className="lowercase">{category.value}</span>
            </div>

            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;

