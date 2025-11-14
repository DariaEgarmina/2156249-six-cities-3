import clsx from 'clsx';

type BadgeProps = {
  text: string;
  parentType: 'card' | 'page';
};

function Badge({ text, parentType }: BadgeProps): JSX.Element {
  return (
    <div
      className={clsx({
        'place-card__mark': parentType === 'card',
        'offer__mark': parentType === 'page',
      })}
    >
      <span>{text}</span>
    </div>
  );
}

export default Badge;
