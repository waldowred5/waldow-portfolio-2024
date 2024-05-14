import React from 'react';
import { IconContext } from 'react-icons';

interface IconProps {
  children: React.ReactNode;
  href?: string;
}

export const Icon = ({ children, href }: IconProps) => {
  return (
    <>
      <IconContext.Provider value={{
        className: 'fill-[#878787] transition duration-200 hover:scale-[106%] hover:fill-white hover:cursor-pointer active:scale-[90%] h-12 w-12'
      }}>
        { href ?
          <a href={href} target={'_blank'}>
            { children }
          </a>
          : children
        }
      </IconContext.Provider>
    </>
  )
}
