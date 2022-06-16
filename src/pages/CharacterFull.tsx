import { useParams } from 'react-router-dom';

import Card from '../components/Card';
import Info from '../components/Info';

import { EType } from '../types/ICard';
import { ICharacter } from '../types/ICharacter';

import useRequest from '../hooks/useRequest';

/**
 * @description Страница для отображения детальной информции
 */
export default function CharacterFull() {
  const params = useParams();
  const { data, isLoading, error } = useRequest<ICharacter | undefined>(
    `https://rickandmortyapi.com/api/character/${params.id}`,
  );

  return (
    <>
      {!!error && <div>Ошибка</div>}
      {!!isLoading && <div>Загрузка</div>}
      {!isLoading && !data && <div>Нет персонажа</div>}
      {!!data && (
        <>
          <Card
            id={data?.id}
            image={data?.image}
            name={data?.name}
            species={data?.species}
            type={EType.BASE}
          />
          <div className="info">
            <Info title="Статус" type={data?.status} />
            <Info title="Гендер" type={data?.gender} />
          </div>
        </>
      )}
    </>
  );
}
