import { THEME } from '../../store/useTheme.ts';

interface SkillButtonProps {
  label: string,
  onClick: () => void,
  hoverTheme: number,
}

export const SkillButton = ({ label, onClick, hoverTheme }: SkillButtonProps) => {
  return (
    <button
      key={label}
      className={`
        flex [transition:background-color_0.3s,transform_0.1s]
        w-[48%] bg-gray-500 active:scale-[95%] items-center justify-center rounded
        ${
          hoverTheme === THEME.ELECTRIC_BLUE ? 'hover:bg-ELECTRIC_BLUE' :
          hoverTheme === THEME.FIRE ? 'hover:bg-FIRE' :
          hoverTheme === THEME.MONOCHROME ? 'hover:bg-MONOCHROME' :
          hoverTheme === THEME.CUTE ? 'hover:bg-CUTE' :
          hoverTheme === THEME.GREEN ? 'hover:bg-GREEN hover:text-black' : ''
        }
      `}
      onClick={onClick}
    >
      <p className="text-[12px]">
        {label}
      </p>
    </button>
  )
}
