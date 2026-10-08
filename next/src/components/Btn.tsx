// GENERATED from src/components/Btn.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import Icon from '@/components/Icon';

interface Props {
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  [key: string]: any;
}

export default function Btn({ label, href, variant = 'primary', className: cls, ...rest }: Props) {
  const Tag = href ? 'a' : 'span';

  return (
    <>
      <Tag href={href} className={cx(['btn', `btn--${variant}`, cls])} {...rest}>
        {variant !== 'icon' && <span className="btn__label">{label}</span>}
        <span className="btn__icon"><Icon name="arrow" /></span>
      </Tag>
    </>
  );
}
