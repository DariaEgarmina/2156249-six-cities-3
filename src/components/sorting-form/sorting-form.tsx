import { useState } from 'react';
import clsx from 'clsx';
import { SortOptions } from './const';
import { SortType } from '@/types/sort';

type SortingFormProps = {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortingForm({
  currentSort,
  onSortChange,
}: SortingFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: SortType) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {SortOptions[currentSort]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.entries(SortOptions).map(([sortKey, option]) => {
            const key = sortKey as SortType;
            return (
              <li
                key={key}
                className={clsx('places__option', {
                  'places__option--active': key === currentSort,
                })}
                tabIndex={0}
                onClick={() => handleOptionClick(key)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}

export default SortingForm;
