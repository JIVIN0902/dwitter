import React from 'react'

interface Props {
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  name: String;
}

const TabOption: React.FC<Props> = ({ Icon, name }) => {
  return (
    <div className="flex py-3 px-0.5 transition-all duration-300 cursor-pointer m-2 font-bold hover:bg-light-black text-xl items-center rounded-3xl md:w-1/2 flex-row">
      <Icon className="h-8 w-8 p-0.5 rounded-3xl md:h-7 md:w-7 bg-transparent" />
      <h3 className="lg:flex justify-start bg-transparent px-2 hidden">{name}</h3>
    </div>

  )
}


export default TabOption;
