import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Icon } from './Icon.tsx';
import { PiPaintBucketFill } from 'react-icons/pi';
import { useThemeState } from '../../store/theme/useThemeState.ts';
import { useState } from 'react';

export const ActionBar = () => {
  const [text, setText] = useState('');

  const {
    // theme,
    toggleTheme,
  } = useThemeState((state) => {
    return {
      // theme: state.theme,
      toggleTheme: state.toggleTheme,
    };
  });

  return (
    <>
      <div className="z-10 fixed top-4 right-4 flex flex-col gap-y-1">
        <div
          className="group/container peer/container hover:cursor-pointer gap-y-4 rounded-md backdrop-blur-[10px] backdrop-saturate-[15] bg-black/50"
        >
          <div className="flex px-2">
            <div
              className="peer/theme"
              onMouseEnter={() => setText('CHANGE SITE THEME')}
            >
              <Icon onClick={toggleTheme}>
                <PiPaintBucketFill/>
              </Icon>
            </div>

            <div
              className="peer/linkedin"
              onMouseEnter={() => setText('STALK MY CAREER →')}
            >
              <Icon href={'https://www.linkedin.com/in/daniel-waldow-22a85398/'}>
                <FaLinkedin/>
              </Icon>
            </div>

            <div
              className="peer/github"
              onMouseEnter={() => setText('STEAL MY CODE →')}
            >
              <Icon href={'https://github.com/waldowred5/waldow-portfolio-2024'}>
                <FaGithub/>
              </Icon>
            </div>
          </div>
        </div>
        <div
          className="
            peer-hover/container:backdrop-blur-[10px] peer-hover/container:backdrop-saturate-150
            peer-hover/container:bg-black/40 text-transparent peer-hover/container:text-white
            transition duration-150 rounded-md h-5 w-100 items-center justify-center flex select-none
          "
        >
          <h2>{text}</h2>
        </div>
      </div>
    </>
  )
}

// bg-transparent
// group-hover:bg-black
