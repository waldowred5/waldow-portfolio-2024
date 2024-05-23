import { useScroll } from '../../store/useScroll.ts';
import { useEffect, useState } from 'react';
import { CATEGORIES, SKILLS } from '../../store/useVertex.ts';
import { THEME, useTheme } from '../../store/useTheme.ts';
import { SkillButton } from './SkillButton.tsx';

interface ButtonLabelGroup {
  [key: string]: {
    [key: string]: string[],
  },
}

export const SkillText = () => {
  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  const {
    theme,
  } = useTheme((state) => {
    return {
      theme: state.theme,
    };
  });

  const [hoverTheme, setHoverTheme] = useState<number>(THEME.ELECTRIC_BLUE);
  // const [hoverTheme, setHoverTheme] = useState(`hover:bg-[${THEME_COLORS[theme].secondary}]`);
  const [skills, setSkills] = useState<ButtonLabelGroup>({});

  useEffect(() => {
    setHoverTheme(theme);
  }, [theme]);

  useEffect(() => {
    const skillsGroupTemplate = Object.entries(CATEGORIES).reduce((acc, category) => {
      const { groupNumber } = category[1];

      return {
        ...acc,
        [`GROUP_${groupNumber}`]: {
          ...acc[`GROUP_${groupNumber}`] || {},
          [category[0]]: []
        },
      }
    }, {} as ButtonLabelGroup);

    setSkills(SKILLS.reduce((acc, skill) => {
      const {
        label,
        group,
        groupNumber,
      } = skill;

      return {
        ...acc,
        [`GROUP_${groupNumber}`]: {
          ...acc[`GROUP_${groupNumber}`],
          [group]: [
            ...acc[`GROUP_${groupNumber}`][group],
            label
          ]
        }
      }
    }, skillsGroupTemplate as ButtonLabelGroup));
  }, []);

  return (
    <div className="hidden lg:flex justify-between w-full">
      {
        Object.entries(skills).map(([groupNumber, groupNumberArray]) => {
          return (
            <div
              key={groupNumber}
              className={`flex justify-center items-center flex-none mx-6 top-[10vh] text-white h-lvh w-[250px]`}
              style={{
                opacity: (scrollPercentage * 7) - 6,
                transform: `translate(0, -${(1 - scrollPercentage) * 50}%)`
              }}
            >
              <div
                className="flex flex-col w-full justify-center items-center"
              >
                {
                  Object.entries(groupNumberArray).map(([group, skillsArray]) => {
                    return (
                      <div key={group} className="flex flex-col mb-4 w-full">
                        <div className="flex items-center gap-x-4">
                          <div
                            className="flex-grow h-[1px] bg-gradient-to-l from-white"
                          ></div>
                          <h1 key={group} className="mb-2">
                            {group}
                          </h1>
                          <div
                            className="flex-grow h-[1px] bg-gradient-to-r from-white"
                          ></div>
                        </div>
                        <div
                          className="flex justify-between flex-wrap text-center gap-y-2"
                        >
                          {
                            skillsArray.map((skill) => (
                              <SkillButton
                                key={skill}
                                label={skill}
                                onClick={() => {}}
                                hoverTheme={hoverTheme}
                              />
                            ))
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
