import { AppState } from '@/store';
import { set_template } from '@/store/features/default.slice';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const popupImages = Array.from(
  Array(36),
  (_, x) => `${('0' + (x + 1)).slice(-2)} 1.png`
);

const Templates = (): JSX.Element => {
  const popupTemplates = useSelector(
    (state: AppState) => state.popupTemplates.popups
  );
  // console.log(popupTemplates2);

  const dispatch = useDispatch();
  /* PAGINATION */
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState<number>(12);
  // How many pages there are
  const [paginationRange] = useState<number>(
    Math.ceil(popupImages.length / recordsPerPage)
  );
  // make array from pagination range
  const pageNumbers = [...Array.from(Array(paginationRange + 1).keys())].slice(
    1
  );
  // filter popups based on page number
  const paginatedPopups = useMemo(() => {
    if (popupTemplates === undefined) return [];

    // if there is less page in new filtered data set data to existing page
    if (currentPage > Math.ceil(popupTemplates.length / recordsPerPage)) {
      setCurrentPage(1);
    }
    const firstPageIndex = (currentPage - 1) * recordsPerPage;
    const lastPageIndex = firstPageIndex + recordsPerPage;
    return popupTemplates.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, recordsPerPage, popupTemplates]);
  return (
    <div className="mt-24">
      <div className="flex gap-[15px] items-center mb-8">
        <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
          1
        </span>
        <p className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
          Choose your template
        </p>
      </div>
      <div className="grid grid-cols-4 gap-[30px]">
        {/* <div className="border border-gray-300 border-solid h-48 bg-gray-200"></div> */}

        {paginatedPopups.map((popupTemplate) => {
          return (
            <div
              className="border border-[#EAEAEA] border-solid h-48 bg-[#F5F5F5] flex items-center justify-center relative group"
              key={popupTemplate.template_id}
            >
              <div className="hidden absolute w-full h-full top-0 left-0 bg-[#7D4AEA]/25 z-10 group-hover:flex  items-center justify-center ">
                <button
                  className="rounded-xl bg-white px-6 py-4 whitespace-nowrap  font-medium text-base leading-4 text-center text-purple-600 tracking-tight	"
                  onClick={() =>
                    // dispatch(set_template('t' + ((index % 3) + 1).toString()))
                    dispatch(set_template(popupTemplate.template_id))
                  }
                >
                  Select template
                </button>
              </div>
              <div className="flex justify-center items-center w-full h-full">
                <Image
                  src={`${popupTemplate.image}`}
                  loader={() => popupTemplate.image}
                  unoptimized
                  alt="image"
                  loading="lazy"
                  // layout="responsive"
                  // placeholder="blur"
                  // layout="fill"
                  width={170}
                  height={178}
                  objectFit="contain"
                />
              </div>
            </div>
          );
        })}
      </div>
      <ul className="mt-[33px] flex items-center bg-[#F5F5F5] rounded-xl max-w-min h-12 p-[3px]">
        {pageNumbers.map((pageNumber, index) => {
          return (
            <li
              key={pageNumber}
              className={`w-10 h-10 flex justify-center items-center text-sm leading-4 text-center text-black rounded-[10px] cursor-pointer ${
                currentPage === index + 1 ? 'bg-white' : 'text-[#777777]'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Templates;
