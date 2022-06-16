import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ICard, EType } from '../types/ICard';

/**
 * @description Компонент для отображения информации о персонаже
 * @component
 */
export default function Card({ id, name, species, image, type }: ICard) {
  const renderContent = useMemo(() => {
    return (
      <div className="card">
        <img src={image} alt={name} className="card-img" />
        <div className="card-content">
          <div className="card-content__title">{name}</div>
          <div className="card-content__description">{species}</div>
        </div>
      </div>
    );
  }, [image, name, species]);

  return (
    <>
      {type === EType.LINK && <Link to={`/characters/${id}`}>{renderContent}</Link>}
      {type === EType.BASE && renderContent}
    </>
  );
}
