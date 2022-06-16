import { useState, useRef, useCallback, useEffect } from 'react';

import { EType } from '../types/ICard';
import Card from '../components/Card';
import { ICharacter } from '../types/ICharacter';

import useRequest from '../hooks/useRequest';

interface IResult {
  results: ICharacter[];
}

/**
 * @description Страница для отображения всех персонажей
 */
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [character, setCharacter] = useState<ICharacter[]>([]);
  const loadMoreRef = useRef(null);

  const { data, isLoading, error } = useRequest<IResult | undefined>(
    `https://rickandmortyapi.com/api/character/?page=${currentPage}`,
  );

  useEffect(() => {
    if (data) {
      setCharacter((prevState) => Array.from(new Set([...prevState, ...data?.results])));
    }
  }, [data]);

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <>
      {!!error && <div>Ошибка</div>}
      {!!isLoading && <div>Загрузка</div>}
      {!isLoading && !character && <div>Нет персонажей</div>}
      {!!character &&
        character.map(({ id, name, species, image }) => (
          <Card key={id} id={id} name={name} species={species} image={image} type={EType.LINK} />
        ))}
      <div ref={loadMoreRef}>{isLoading}</div>
    </>
  );
}
