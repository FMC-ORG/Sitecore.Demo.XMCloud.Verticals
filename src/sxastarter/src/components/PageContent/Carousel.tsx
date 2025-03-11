import React, { useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
  LinkField,
  Text,
  Link,
  RichText,
  useSitecoreContext,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Video: ImageField;
}

export type CarouselItemProps = {
  id: string;
  fields: Fields;
};

interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

export const Default = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < props.fields.items.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : props.fields.items.length - 1));
  };

  return (
    <section
      className={`component carousel ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="carousel-inner">
        {props.fields.items.map((item, i) => (
          <div key={i} className={'carousel-item ' + (i == index ? 'active' : '')}>
            {!isPageEditing && item.fields?.Video?.value?.src ? (
              <video
                className="object-fit-cover d-block w-100 h-100"
                key={item.id}
                autoPlay={true}
                loop={true}
                muted
                playsInline
                poster={item.fields.Image?.value?.src}
              >
                <source src={item.fields.Video.value.src} type="video/webm" />
              </video>
            ) : (
              <NextImage
                field={item.fields.Image}
                className="object-fit-cover d-block w-100 h-100"
                width={1920}
                height={800}
              />
            )}

            <div className="side-content">
              <div className="container">
                <div className="col-lg-5 col-md-6 offset-md-6 offset-lg-7">
                  <h1 className="display-6 fw-bold">
                    <Text field={item.fields.Title}></Text>
                  </h1>
                  <RichText field={item.fields.Text}></RichText>
                  {!isPageEditing && item.fields?.Link?.value?.href && (
                    <Link field={item.fields.Link} className="button button-accent"></Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ol className="carousel-indicators">
        {props.fields.items.map((_item, i) => (
          <li
            key={i}
            aria-label="Slide"
            className={i == index ? 'active' : ''}
            onClick={() => setIndex(i)}
          ></li>
        ))}
      </ol>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </section>
  );
};

export const ManUn = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < props.fields.items.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : props.fields.items.length - 1));
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black" id={id ? id : undefined}>
      <div className="relative w-full h-full">
        {props.fields.items.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {!isPageEditing && item.fields?.Video?.value?.src ? (
              <video
                className="object-cover w-full h-full"
                key={item.id}
                autoPlay={true}
                loop={true}
                muted
                playsInline
                poster={item.fields.Image?.value?.src}
              >
                <source src={item.fields.Video.value.src} type="video/webm" />
              </video>
            ) : (
              <NextImage
                field={item.fields.Image}
                className="object-cover w-full h-full"
                width={1920}
                height={800}
              />
            )}

            {/* Content overlay at the bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-20 pb-8 px-6">
              <div className="container mx-auto">
                <div className="flex items-end justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="text-white/80 text-sm">2m | video</div>
                  </div>
                  <button className="text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mt-4">
                  <Text field={item.fields.Title}></Text>
                </h1>
                <div className="text-white/90 mt-2">
                  <RichText field={item.fields.Text}></RichText>
                </div>
                {!isPageEditing && item.fields?.Link?.value?.href && (
                  <Link
                    field={item.fields.Link}
                    className="inline-block mt-4 px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
                  ></Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-32 right-6 flex flex-col space-y-2">
        {props.fields.items.map((_item, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            className={`w-2 h-8 rounded-full transition-all ${
              i === index ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setIndex(i)}
          ></button>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        type="button"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        type="button"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </section>
  );
};
