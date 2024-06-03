'use client'

interface DefaultPageProps {
  Icon: any
  title: string
  description: string
  children: React.ReactNode
  actionButton?: JSX.Element
}

export default function DefaultPage({ Icon, title, description, children, actionButton }: DefaultPageProps) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900 flex">
              {Icon && (<Icon className='h-[22px] w-[22px] mt mr-1 shrink-0' />)}
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {description}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {actionButton}
          </div>
        </div>

        {children}
      </div>
    </>
  )
}