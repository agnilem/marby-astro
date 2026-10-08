// GENERATED from src/components/Icon.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import { cx } from '@/lib/cx';
import { sx } from '@/lib/sx';
import menu from '@/icons/menu-svg';
import arrow from '@/icons/arrow-svg';
import check from '@/icons/check-svg';
import plus from '@/icons/plus-svg';
import pin from '@/icons/pin-svg';
import search from '@/icons/search-svg';

const close =
  '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>';
const icons = { menu, arrow, check, plus, pin, search, close };

interface Props { name: keyof typeof icons; size?: number; className?: string }

export default function Icon({ name, size = 16, className: cls }: Props) {
  const svg = icons[name].replace('<svg', `<svg width="${size}" height="${size}" aria-hidden="true" focusable="false"`);

  return (
    <>
      <span className={cx(['icon', cls])} style={sx(`width:${size}px;height:${size}px`)} dangerouslySetInnerHTML={{ __html: svg }} />
    </>
  );
}
