import {
  type Field,
  type ImageField,
  type LinkField,
  Text,
  Link,
  useSitecoreContext,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import useVisibility from 'src/hooks/useVisibility';
import { Play, Share2 } from 'lucide-react';

interface Fields {
  Title1: Field<string>;
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Title2: Field<string>;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Title3: Field<string>;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Title4: Field<string>;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
}

export type FourColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  const Column = ({
    image,
    title,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col-sm-12 col-lg-3 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <Link field={link}>
          <div className="content-wrapper">
            <NextImage field={image} width={300} height={300} />
            <div className="text-wrapper">
              <h2>
                <Text field={title} />
              </h2>
              <p>
                <Text field={text} />
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced four-column-cta ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            title={props.fields.Title3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={props.fields.Image4}
            title={props.fields.Title4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={1500}
          />
        </div>
      </div>
    </div>
  );
};

export const ManUnited = (props: FourColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  const VideoCard = ({
    image,
    title,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);

    // Extract video type from text field (assuming it contains "video", "match highlights", etc.)
    const videoType = text?.value?.toLowerCase() || 'video';

    // Extract time information (assuming it's in the format "22h", "1d", "2d", etc.)
    const timeInfo = title?.value?.split(' ')[0] || '';

    return (
      <div
        className={`w-full px-2 mb-6 sm:mb-0 ${
          !isPageEditing
            ? `transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`
            : ''
        }`}
        ref={domRef}
      >
        <Link field={link} className="block relative group">
          <div className="relative overflow-hidden rounded-lg">
            {/* Image container */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <NextImage
                field={image}
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-bottom justify-left p-4">
                <div className="bg-red-600 rounded-md p-2 w-12 h-12 flex items-center justify-center">
                  <Play className="text-white w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h2 className="text-white font-bold text-xl uppercase leading-tight">
                <Text field={title} />
              </h2>

              {/* Time and video type info */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <span>{timeInfo}</span>
                  <span>|</span>
                  <span>{videoType}</span>
                </div>

                {/* Share icon */}
                <Share2 className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="bg-white py-8 px-4" id={id ? id : undefined}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <VideoCard
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
          />
          <VideoCard
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={200}
          />
          <VideoCard
            image={props.fields.Image3}
            title={props.fields.Title3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={400}
          />
          <VideoCard
            image={props.fields.Image4}
            title={props.fields.Title4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={600}
          />
        </div>
      </div>
    </div>
  );
};
