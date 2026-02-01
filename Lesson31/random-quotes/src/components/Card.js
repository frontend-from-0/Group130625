export function Card ({children}) {
  return (
    <div className='w-2xl bg-slate-700 rounded-md p-10 flex flex-col'>
      {children}
    </div>
  )
}