import Link from 'next/link'

type BreadcrumbProps = {
    pageTitle: string
    showBreadcrumbs?: boolean
}

const Breadcrumb = (
    {pageTitle}: { pageTitle?: string }
) => {
    return (
        <nav>
            <ol className="flex items-center gap-1.5">
                <li>
                    <Link
                        className="inline-flex items-center gap-1.5 text-sm text-blue-500 dark:text-gray-400"
                        href="/panel">
                        Panel
                        <svg className="w-3 h-3 fill-gray-400" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 320 512">
                            <path
                                d="M299.3 244.7c6.2 6.2 6.2 16.4 0 22.6l-192 192c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L265.4 256 84.7 75.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l192 192z"/>
                        </svg>
                    </Link>
                </li>
                <li className="text-sm text-gray-800 dark:text-white/90">
                    {pageTitle}
                </li>
            </ol>
        </nav>
    )
}

export default function PageBreadcrumb({pageTitle, showBreadcrumbs}: BreadcrumbProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName">
                {pageTitle}
            </h2>
            {showBreadcrumbs ? <Breadcrumb pageTitle={pageTitle}/> : null}
        </div>
    )
}
