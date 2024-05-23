import { THEME } from '../../store/useTheme.ts';
import { useVertex } from '../../store/useVertex.ts';
import { useEffect, useState } from 'react';

interface SkillButtonProps {
  label: string,
  hoverTheme: number,
}

export const SkillButton = ({
                              label,
                              hoverTheme
                            }: SkillButtonProps) => {
  const {
    selectedVertex,
    vertexRefs,
    setSelectedVertex,
  } = useVertex((state) => {
    return {
      selectedVertex: state.selectedVertex,
      vertexRefs: state.vertexRefs,
      setSelectedVertex: state.setSelectedVertex,
    };
  });

  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(selectedVertex?.name === label || false);
  }, [selectedVertex]);

  return (
    <button
      key={label}
      className={`
        flex [transition:background-color_0.2s,transform_0.15s]
        w-[48%] active:scale-[95%] items-center justify-center rounded
        ${
        isSelected && hoverTheme === THEME.ELECTRIC_BLUE ? 'bg-[#58D7DF] text-black' :
          isSelected && hoverTheme === THEME.FIRE ? 'bg-[#FDFF25] text-black' :
            isSelected && hoverTheme === THEME.MONOCHROME ? 'bg-[#222222] outline outline-white' :
              isSelected && hoverTheme === THEME.CUTE ? 'bg-[#FF16FF] text-black' :
                isSelected && hoverTheme === THEME.GREEN ? 'bg-[#2DDE4C] text-black' : 'bg-gray-500'
      }
        ${
        hoverTheme === THEME.ELECTRIC_BLUE ? 'hover:bg-ELECTRIC_BLUE hover:text-white' :
          hoverTheme === THEME.FIRE ? 'hover:bg-FIRE hover:text-white' :
            hoverTheme === THEME.MONOCHROME ? 'hover:bg-MONOCHROME hover:text-black' :
              hoverTheme === THEME.CUTE ? 'hover:bg-CUTE hover:text-black' :
                hoverTheme === THEME.GREEN ? 'hover:bg-GREEN hover:text-black' : ''
      }
      `}
      onClick={() => setSelectedVertex(vertexRefs[label] || null)}
    >
      <p className="text-[12px]">
        {label}
      </p>
    </button>
  )
}
