export function Button({onClick, variant='primary',children}){

  const variantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-500 color-indigo-100 hover:bg-indigo-500/50';
      case 'secondary':
        return 'bg-slate-500 color-slate-100 hover:bg-slate-500/50';
      case 'ghost':
        return 'color-slate-100 hover:bg-slate-500/10';
      default:
        return '';
    }
  };

    return(
        <button
          onClick={onClick}
          className={`py-2 px-4 rounded-md mt-6 cursor-pointer ${variantClass()}`}
        >
         {children}
        </button>
    )
}