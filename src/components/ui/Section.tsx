import React from 'react';

interface SectionProps {
  children?: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => {
  return (
    <>
      <div className="flex relative items-center h-lvh">
        { children }
      </div>
    </>
  )
}
