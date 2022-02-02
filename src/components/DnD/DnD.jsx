import { useEffect, useRef, useState } from "react";
import styles from "./DnD.module.css";

const array = Array(256)
  .fill()
  .map((_, index) => ({ id: index, order: index }));

export const DnD = () => {
  const [squareList, setSquareList] = useState(array);
  const [currentSquare, setCurrentSquare] = useState(null);
  const wrapRef = useRef(null);

  const handlerDragStart = (square) => {
    setCurrentSquare(square);
  };

  const handlerDragEnd = (e) => {
    e.target.removeAttribute("data-active", "active");
  };

  const handlerDragOver = (e) => {
    e.preventDefault();
    e.target.setAttribute("data-active", "active");
  };

  const handleDrop = (e, square) => {
    e.preventDefault();

    setSquareList(
      squareList.map((item) => {
        if (item.id === currentSquare.id) {
          return { ...item, order: square.order };
        }

        if (item.id === square.id) {
          return { ...item, order: currentSquare.order };
        }

        return item;
      })
    );

    Array.from(wrapRef.current.children).forEach((item) =>
      item.removeAttribute("data-active", "active")
    );

    e.target.setAttribute("data-active", "active");
  };

  useEffect(() => {
    if (!currentSquare) {
      Array.from(wrapRef.current.children).forEach(
        (item) => +item.innerHTML === 0 && item.setAttribute("data-active", "active")
      );
    }
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrapper}>
      {squareList.map((square) => (
        <div
          key={square.id}
          draggable={true}
          className={styles.square}
          onDragStart={() => handlerDragStart(square)}
          onDragLeave={handlerDragEnd}
          onDragEnd={handlerDragEnd}
          onDragOver={handlerDragOver}
          onDrop={(e) => handleDrop(e, square)}
        >
          {square.order}
        </div>
      ))}
    </div>
  );
};
