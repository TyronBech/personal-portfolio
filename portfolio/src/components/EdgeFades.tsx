export default function EdgeFades() {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none bg-linear-to-r from-rich-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none bg-linear-to-l from-rich-black to-transparent" />
    </>
  );
}
