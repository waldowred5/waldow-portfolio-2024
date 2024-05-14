import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Icon } from './Icon.tsx';
import { PiPaintBucketFill } from 'react-icons/pi';

export const ActionBar = () => {
  return (
    <>
      <div
        className="z-10 absolute top-0 right-0 m-3 flex flex-col gap-y-4 rounded p-2"
        style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      >
        <div className="flex gap-x-4">
          <div className="peer/theme">
            <Icon>
              <PiPaintBucketFill/>
            </Icon>
          </div>
          <h2
            className="transition duration-200 text-transparent peer-hover/theme:text-white fixed top-[84px] right-[20px] text-white">
            CHANGE SITE THEME
          </h2>

          <div className="peer/linkedin">
            <Icon href={'https://www.linkedin.com/in/daniel-waldow-22a85398/'}>
              <FaLinkedin/>
            </Icon>
          </div>
          <h2
            className="transition duration-200 text-transparent peer-hover/linkedin:text-white fixed top-[84px] right-[20px] text-white">
            STALK MY CAREER →
          </h2>

          <div className="peer/github">
            <Icon href={'https://github.com/waldowred5/waldow-portfolio-2024'}>
              <FaGithub/>
            </Icon>
          </div>
          <h2
            className="transition duration-200 text-transparent peer-hover/github:text-white fixed top-[84px] right-[20px] text-white">
            STEAL MY CODE →
          </h2>
        </div>
      </div>
    </>
  )
}
