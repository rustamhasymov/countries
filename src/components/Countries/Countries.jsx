import { useEffect, useRef, useState } from "react";
import styles from "./Countries.module.css";

export const Countries = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chunkLength = useRef(20);
  const listRef = useRef(null);
  const targetElement = useRef(null);
  const intersectionObserver = useRef(null);
  const [limit, setLimit] = useState(chunkLength.current);

  const handleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
    setLimit(chunkLength.current);
  };

  useEffect(() => {
    if (limit === data.length) {
      intersectionObserver.current.unobserve(targetElement.current);
    }
  }, [limit]);

  useEffect(() => {
    const options = {
      root: listRef.current,
    };

    const callback = function ([{ isIntersecting }]) {
      if (isIntersecting) {
        setLimit((prevlimit) => prevlimit + chunkLength.current);
      }
    };

    intersectionObserver.current = new IntersectionObserver(callback, options);

    if (targetElement.current) {
      intersectionObserver.current.observe(targetElement.current);
    }

    return () => {
      if (targetElement.current) {
        intersectionObserver.current.unobserve(targetElement.current);
      }
    };
  }, [isOpen]);

  if (!data.length) {
    return <div className="data">No data</div>;
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={handleOpen} onBlur={handleOpen}>
        Countries
        {isOpen && (
          <ul className={styles.list} ref={isOpen ? listRef : null}>
            {data.slice(0, limit).map((country) => (
              <li key={country?.countryName} className={styles.link}>
                <span>{country?.countryName}</span>
                <img
                  src={country?.countryFlag}
                  className={styles.img}
                  loading="lazy"
                  width="1"
                  height="1"
                  alt="mistake"
                  decoding="async"
                />
              </li>
            ))}
            <li ref={targetElement}></li>
          </ul>
        )}
      </button>
    </div>
  );
};
