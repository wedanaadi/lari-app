import './pagination.css'
import { clsx } from 'clsx'

const range = (start: number, end: number) => {
  return [...Array(end - start).keys()].map((el) => el + start);
}

interface getPagesCutProps {
  pagesCount: number
  pagesCutCount: number
  currentPage: number
}

const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }: getPagesCutProps) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);
  // console.log("ceiling", ceiling);
  // console.log("floor", floor);
  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  } else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
}

interface PaginationItemProps {
  page: number | string
  currentPage: number
  onPageChange: (page: number | string) => void
  isDisabled?: boolean
}

const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }: PaginationItemProps) => {
  const liClasses = clsx({
    "page-item": true,
    active: page === currentPage,
    disabled: isDisabled,
  });
  // console.log(liClasses);
  return (
    <li className={liClasses} onClick={() => onPageChange(page)}>
      <span className="page-link">{page}</span>
    </li>
  );
};

interface PaginationProps {
  className: string
  currentPage: number
  totalCount: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination({ className, currentPage, totalCount, pageSize, onPageChange }: PaginationProps) {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <div className="flex">
      <ul className={clsx("pagination", { [className]: className })}>
        <PaginationItem
          page="First"
          currentPage={currentPage}
          onPageChange={() => onPageChange(1)}
          isDisabled={isFirstPage}
        />
        <PaginationItem
          page="Prev"
          currentPage={currentPage}
          onPageChange={() => onPageChange(currentPage - 1)}
          isDisabled={isFirstPage}
        />
        {pages.map((page) => (
          <PaginationItem
            page={page}
            key={page}
            currentPage={currentPage}
            onPageChange={(pageNumber) => onPageChange(Number(pageNumber))}
          />
        ))}
        <PaginationItem
          page="Next"
          currentPage={currentPage}
          onPageChange={() => onPageChange(currentPage + 1)}
          isDisabled={isLastPage}
        />
        <PaginationItem
          page="Last"
          currentPage={currentPage}
          onPageChange={() => onPageChange(pages.length)}
          isDisabled={isLastPage}
        />
      </ul>
    </div>
  );
}
