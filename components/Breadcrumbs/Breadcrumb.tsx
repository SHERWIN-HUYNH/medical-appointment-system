
import Link from 'next/link';
interface BreadcrumbProps {
  pageName: string[][]
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 mt-3 mx-3 text-xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
        {pageName[pageName.length - 1][0]}
      </h2>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/test-admin">
              Dashboard
            </Link>
          </li>
          {pageName.map((item, index) => (
            <Link href={item[index]} key={index}>
              <li className="font-medium text-primary">/{item[0]}</li>
            </Link>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
