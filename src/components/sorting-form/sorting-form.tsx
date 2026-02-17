import { useState, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import clsx from 'clsx';
import { SortOptions } from './const';
import { SortType } from '@/types/sort';
import { useAppDispatch } from '@/hooks';
import { setActiveSort } from '@/store/offers';

type SortingFormProps = {
  currentSort: SortType;
};

function SortingForm({ currentSort }: SortingFormProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  useOnClickOutside(formRef, () => {
    setIsOpen(false);
  });

  const handleOptionClick = (option: SortType) => {
    dispatch(setActiveSort(option));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" ref={formRef}>
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

      <ul
        className={clsx('places__options places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
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
    </form>
  );
}

export default SortingForm;
