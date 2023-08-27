import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { shortList, longList, list } from "./data";
function Carousel() {
  const [people, setPeople] = useState(list);
  const [index, setIndex] = useState(1);

  const prevSlide = () => {
    setIndex((old) => {
      const newIndex = (old - 1 + people.length) % people.length;
      return newIndex;
    });
  };
  const nextSlide = () => {
    setIndex((old) => {
      const newIndex = (old + 1) % people.length;
      return newIndex;
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section className="section-center">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            key={id}
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - index)}%)`,
              opacity: personIndex === index ? 1 : 0,
              visibility: personIndex === index ? "visible" : "hidden",
            }}
          >
            <img src={image} alt={title} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
}
export default Carousel;
