function PageContainer({ children, title, description, actions }) {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {(title || description || actions) && (
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}

      {children}
    </main>
  );
}

export default PageContainer;