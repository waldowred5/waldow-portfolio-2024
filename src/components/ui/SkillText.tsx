// Note: text-shadow not supported by TailwindCSS
// TODO: Remove arbitrary style tags and replace with proper TailwindCSS plugin config to fix text-shadow
// https://tailwindcss.com/docs/plugins#adding-utilities
// https://www.hyperui.dev/blog/text-shadow-with-tailwindcss

export const SkillText = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full h-lvh text-white select-none">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center"
          style={{ textShadow: '2px 2px 24px #000000' }}
        >
          COMING SOON...
        </h1>
      </div>
    </>
  )
}
