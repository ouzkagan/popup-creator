import CodeBlock from '@/components/CodeBlock';
import MultiSelect from '@/components/MultiSelect';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const popupImages = Array.from(
  Array(36),
  (_, x) => `${('0' + (x + 1)).slice(-2)} 1.png`
);
const Home = (): JSX.Element => {
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
    if (popupImages === undefined) return [];

    // if there is less page in new filtered data set data to existing page
    if (currentPage > Math.ceil(popupImages.length / recordsPerPage)) {
      setCurrentPage(1);
    }
    const firstPageIndex = (currentPage - 1) * recordsPerPage;
    const lastPageIndex = firstPageIndex + recordsPerPage;
    return popupImages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, recordsPerPage]);

  /* */
  return (
    <div className=" bg-white">
      <div className="bg-gradient-to-b from-white to-gray-200 w-full">
        <section className="container mx-auto px-32 font-inter ">
          <nav className="w-full flex justify-between items-center mt-6">
            <div className="w-full flex justify-start items-center">
              <a href="#" className="flex justify-center items-center mr-20">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.0004 36C4.70288 36 0 31.5808 0 18.0004C0 4.41999 4.70288 0 18.0004 0C31.2979 0 36 4.41999 36 18.0004C36 31.5808 31.2979 36 18.0004 36Z"
                    fill="#7D4AEA"
                  />
                  <path
                    opacity="0.4"
                    d="M12.0001 13.25V16C12.0001 18.8003 12.0001 20.2004 12.5451 21.27C13.0245 22.2108 13.7894 22.9757 14.7302 23.455C15.7997 24 17.1999 24 20.0001 24H22.75C22.75 24.6967 22.75 25.0451 22.7067 25.3369C22.4482 27.0797 21.0797 28.4482 19.3369 28.7067C19.0451 28.75 18.6967 28.75 18 28.75H13.65C11.4098 28.75 10.2897 28.75 9.43404 28.314C8.68139 27.9305 8.06947 27.3186 7.68597 26.566C7.25 25.7103 7.25 24.5902 7.25 22.35V18.0001C7.25 17.3033 7.25 16.9549 7.29331 16.663C7.55186 14.9202 8.92023 13.5519 10.663 13.2933C10.9549 13.25 11.3033 13.25 12.0001 13.25Z"
                    fill="white"
                  />
                  <path
                    d="M22.35 7.25C24.5902 7.25 25.7103 7.25 26.566 7.68597C27.3186 8.06947 27.9305 8.68139 28.314 9.43404C28.75 10.2897 28.75 11.4098 28.75 13.65V16.35C28.75 18.5902 28.75 19.7103 28.314 20.566C27.9305 21.3186 27.3186 21.9305 26.566 22.314C25.7103 22.75 24.5902 22.75 22.35 22.75H19.65C17.4098 22.75 16.2897 22.75 15.434 22.314C14.6814 21.9305 14.0695 21.3186 13.686 20.566C13.25 19.7103 13.25 18.5902 13.25 16.35V13.65C13.25 11.4098 13.25 10.2897 13.686 9.43404C14.0695 8.68139 14.6814 8.06947 15.434 7.68597C16.2897 7.25 17.4098 7.25 19.65 7.25H22.35Z"
                    fill="white"
                  />
                </svg>
                <span className="not-italic font-extrabold text-base leading-4 text-black ml-2">
                  modal.cards
                </span>
              </a>
              <ul className="flex items-center">
                <li className="hover:bg-white mr-8">
                  <a
                    href="#"
                    className="font-medium text-base leading-4 text-black flex"
                  >
                    Solutions{' '}
                    <span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                      >
                        <path
                          d="M12.4425 6.44287L9 9.87787L5.5575 6.44287L4.5 7.50037L9 12.0004L13.5 7.50037L12.4425 6.44287Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
                <li className="hover:bg-white mr-8">
                  <a
                    href="#"
                    className="font-medium text-base leading-4 text-black"
                  >
                    Product Tour
                  </a>
                </li>
                <li className="hover:bg-white mr-8">
                  <a
                    href="#"
                    className="font-medium text-base leading-4 text-black"
                  >
                    Showcase
                  </a>
                </li>
                <li className="hover:bg-white mr-8">
                  <a
                    href="#"
                    className="font-medium text-base leading-4 text-black"
                  >
                    Pricing
                  </a>
                </li>
                <li className="hover:bg-white mr-8">
                  <a
                    href="#"
                    className="font-medium text-base leading-4 text-black"
                  >
                    Sign in
                  </a>
                </li>
              </ul>
            </div>
            <ul className="flex justify-end items-center">
              <li className="hover:bg-white mr-8">
                <a
                  href="#"
                  className="font-medium text-base leading-4 text-black whitespace-nowrap"
                >
                  Sign in
                </a>
              </li>
              <li className="hover:bg-white mr-8">
                <button className="rounded-xl bg-purple-600 px-5 py-2 whitespace-nowrap  font-medium text-base leading-4 text-center text-white tracking-tight	">
                  Try for free
                </button>
              </li>
            </ul>
          </nav>
        </section>
        <section className="container mx-auto px-32 pb-[317px]">
          <h1 className=" font-semibold text-black leading-20 text-7xl tracking-tight mt-16">
            Simple modal <br />
            card creator
          </h1>
          <p className="text-3xl  mt-5 font-normal">
            A utility-first CSS framework packed with classeslike flex, pt-4,
            text-center and rotate-90 that can becomposed to build any design,
            directly in your markup.
          </p>
          <button className="rounded-xl bg-purple-600 whitespace-nowrap  font-medium text-lg leading-5 text-center text-white tracking-tight mt-16 py-5 px-8 ">
            Try it out now
          </button>
          <div className="flex mt-10 ">
            <span className="text-xs leading-4 text-black flex items-center font-light">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99993 10.8002L3.19993 8.00019L2.2666 8.93352L5.99993 12.6669L13.9999 4.66685L13.0666 3.73352L5.99993 10.8002Z"
                  fill="black"
                />
              </svg>
              Free and paid plans
            </span>
            <span className="text-xs leading-4 text-black flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99993 10.8002L3.19993 8.00019L2.2666 8.93352L5.99993 12.6669L13.9999 4.66685L13.0666 3.73352L5.99993 10.8002Z"
                  fill="black"
                />
              </svg>
              Free and paid plans
            </span>
            <span className="text-xs leading-4 text-black flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99993 10.8002L3.19993 8.00019L2.2666 8.93352L5.99993 12.6669L13.9999 4.66685L13.0666 3.73352L5.99993 10.8002Z"
                  fill="black"
                />
              </svg>
              Free and paid plans
            </span>
          </div>
        </section>
      </div>

      {/* popup example */}
      <div className="container mx-auto px-32 relative ">
        <div className="w-[800px] h-[468px] grid grid-cols-2  bg-white rounded-xl-[40px] absolute top-[-227px]  rounded-[40px]">
          <div className="flex flex-col justify-center items-center w-[300px] mx-auto">
            <svg
              width="106"
              height="38"
              viewBox="0 0 106 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.98565 0H6.88287C3.04215 0 0 3.03618 0 6.87437V29.0633C0 32.9588 3.17525 36.0141 6.9209 36.0141H7.68143C11.6552 36.0141 14.7354 32.9588 14.7354 28.4523V21.2342H9.22152V28.5859C9.22152 29.3688 8.87928 30.6482 7.51031 30.6482H7.2061C6.31247 30.6482 5.53291 29.9226 5.53291 28.6623V7.50452C5.53291 6.47337 6.29345 5.51859 7.2061 5.51859H7.51031C8.44197 5.51859 9.22152 6.47337 9.22152 7.50452V14.3407H14.7354V6.87437C14.7354 3.01709 11.6552 0 7.98565 0ZM45.6133 11.3427L41.4683 0.763819H35.7453V26.6191L41.2592 25.8553V13.7296L45.6133 22.4945L49.8913 13.5769V25.2442H55.4052V0.763819H50.0244L45.6133 11.3618V11.3427ZM81.5677 17.396H87.5189V12.5457H81.5677V5.63317H88.1083V0.763819H76.0538V27.4211C80.541 28.3568 84.6859 29.2734 88.4126 30.5146V25.2251L81.5677 23.9266V17.4342V17.396ZM103.414 18.1598C104.745 17.396 105.848 15.8111 105.848 14.0925V5.4995C105.848 2.84523 103.718 0.744724 100.923 0.744724H91.0935V31.603L96.5693 33.7417V20.2221C96.5693 20.2221 100.41 19.7829 100.41 23.6211V35.3457L106 38V22.1508C106 20.0884 104.84 18.6181 103.433 18.1598H103.414ZM100.391 13.4432C100.391 14.4744 100.125 14.99 98.889 14.99H96.5503V5.4995H98.889C100.125 5.4995 100.391 5.93869 100.391 7.00804V13.4432ZM25.8203 0.0763819H24.7175C20.8768 0.0763819 17.8726 3.11256 17.8726 6.98895V30.5146L23.3865 28.8342V21.7498H27.0561V28.1849L32.494 27.0774V6.98895C32.494 3.09347 29.4518 0.0763819 25.8203 0.0763819ZM27.0561 16.6131H23.3865V7.38995C23.3865 6.49246 24.1471 5.57588 25.0597 5.57588H25.3639C26.2956 5.57588 27.0371 6.51156 27.0371 7.38995V16.6131H27.0561ZM68.6766 0.763819H58.8086V25.3779L64.3605 25.6834V18.9809H68.6766C71.4526 18.9809 73.5821 16.8231 73.5821 13.9588V5.4995C73.5821 2.84523 71.4526 0.744724 68.6766 0.744724V0.763819ZM68.1252 12.6985C68.1252 13.8251 67.821 14.3216 66.6231 14.3216H64.3225V5.57588H66.6231C67.821 5.57588 68.1252 5.84322 68.1252 6.91256V12.6985Z"
                fill="#E60000"
              />
            </svg>
            <h3 className="text-4xl	font-semibold  text-black leading-[3.375rem] mt-10">
              Join the club
            </h3>
            <p className="text-lg leading-6  text-black mt-2">
              Subscribe and Get an Extra <br /> <span>25% Off</span> on your
              first purchase.
            </p>
            <div className="w-full mt-8">
              <input
                type="text"
                className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3"
                name=""
                id=""
                placeholder="Email address"
              />
            </div>
            <button className="rounded-xl bg-black py-3 px-24 whitespace-nowrap  font-medium text-base leading-4 text-center text-white tracking-tight	w-full h-[48px] mt-4 ">
              Try for free
            </button>
          </div>
          <div className="relative  ">
            {/* <img src="/51951afc5aa43fb6d90f01eeeec2b12c.png" alt="me" /> */}
            <div className="absolute w-full h-full t-0 l-0 ">
              <span className="w-10 h-10 ml-auto rounded-full bg-white 	flex justify-center items-center mt-6 mr-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6351 6.70106L17.2985 5.3645L11.9997 10.6634L6.70082 5.3645L5.36426 6.70106L10.6631 11.9999L5.36426 17.2988L6.70082 18.6353L11.9997 13.3365L17.2985 18.6353L18.6351 17.2988L13.3362 11.9999L18.6351 6.70106Z"
                    fill="black"
                  />
                </svg>
              </span>
              <div className="w-48 h-12	 bg-white py-3 px-5 flex justify-center items-center rounded-xl	whitespace-nowrap ml-[341px] mt-10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_79_9552)">
                    <path
                      d="M11.9995 2.02002C6.48953 2.02002 2.01953 6.49002 2.01953 12C2.01953 17.51 6.48953 21.98 11.9995 21.98C17.5095 21.98 21.9795 17.51 21.9795 12C21.9795 6.49002 17.5095 2.02002 11.9995 2.02002ZM11.4795 17.88V13.74H8.81953C8.44953 13.74 8.19953 13.34 8.37953 13.01L12.0595 5.84002C12.2895 5.37002 12.9995 5.54002 12.9995 6.07002V10.26H15.5395C15.9095 10.26 16.1495 10.65 15.9895 10.98L12.4295 18.1C12.1895 18.58 11.4795 18.41 11.4795 17.88Z"
                      fill="#F2A737"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_79_9552">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="font-medium text-base leading-6 text-black whitespace-nowrap">
                  Grow email list
                </span>
              </div>
              <div className="w-[270px] h-12	 bg-white py-3 px-5 flex justify-center items-center rounded-xl ml-[326px] mt-2	">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_79_9559)">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 18.09V18.67C13.41 19.4 12.81 20 12.08 20H12.07C11.34 20 10.74 19.4 10.74 18.67V18.07C9.41 17.79 8.23 17.06 7.73 15.83C7.5 15.28 7.93 14.67 8.53 14.67H8.77C9.14 14.67 9.44 14.92 9.58 15.27C9.87 16.02 10.63 16.54 12.09 16.54C14.05 16.54 14.49 15.56 14.49 14.95C14.49 14.12 14.05 13.34 11.82 12.81C9.34 12.21 7.64 11.19 7.64 9.14C7.64 7.42 9.03 6.3 10.75 5.93V5.33C10.75 4.6 11.35 4 12.08 4H12.09C12.82 4 13.42 4.6 13.42 5.33V5.95C14.8 6.29 15.67 7.15 16.05 8.21C16.25 8.76 15.83 9.34 15.24 9.34H14.98C14.61 9.34 14.31 9.08 14.21 8.72C13.98 7.96 13.35 7.47 12.09 7.47C10.59 7.47 9.69 8.15 9.69 9.11C9.69 9.95 10.34 10.5 12.36 11.02C14.38 11.54 16.54 12.41 16.54 14.93C16.52 16.76 15.15 17.76 13.41 18.09Z"
                      fill="#63C77F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_79_9559">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="font-medium text-base leading-6 text-black whitespace-nowrap">
                  Increase sales conversion
                </span>
              </div>
            </div>
            <div
              className="bg-cover	h-full bg-left-42 rounded-r-[40px]"
              style={{
                backgroundImage: `url(/assets/51951afc5aa43fb6d90f01eeeec2b12c.png)`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <section className=" h-[630px] bg-[#666666] text-white">
        <div className="container mx-auto px-32 flex justify-start pt-[361px] pb-[137px]">
          <div className="flex justify-start gap-[120px]">
            <div>
              <div className="font-semibold  text-[80px] leading-[80px]">
                3X
              </div>
              <p>
                Increase
                <br />
                Conversion Rate
              </p>
            </div>
            <div>
              <div className="font-semibold  text-[80px] leading-[80px]">
                120%
              </div>
              <p>
                Email
                <br />
                Subscribers
              </p>
            </div>
            <div>
              <div className="font-semibold  text-[80px] leading-[80px]">
                390%
              </div>
              <p>
                More Customer
                <br />
                Engagement
              </p>
            </div>
            <div>
              <p className=" font-semibold text-4xl tracking-tigher">
                Popupsmart meets all your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-32">
        <h2 className="font-semibold text-4xl text-black leading-[48px] tracking-half-tighter	mt-24">
          Modal Card Generator
        </h2>
        <p className="max-w-[459px] mt-4 font-[400] text-base leading-6 tracking-tigher">
          Measure your return on email marketing efforts easier and faster by
          using thebest online tools. Popupsmart is ready to help you build an
          efficient email list!
        </p>

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

            {paginatedPopups.map((popupImage) => {
              return (
                <div
                  className="border border-[#EAEAEA] border-solid h-48 bg-[#F5F5F5] flex items-center justify-center relative group"
                  key={popupImage}
                >
                  <div className="hidden absolute w-full h-full t-0 l-0 bg-[#7D4AEA]/25 z-10 group-hover:flex  items-center justify-center ">
                    <button className="rounded-xl bg-white px-6 py-4 whitespace-nowrap  font-medium text-base leading-4 text-center text-purple-600 tracking-tight	">
                      Select template
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-full h-full">
                    <Image
                      src={`/assets/popups/${popupImage}`}
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
                  className={`w-10 h-10 flex justify-center items-center text-sm leading-4 text-center text-black rounded-[10px] ${
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
        {/* STEPS */}
        <div className="flex gap-[76px] h-[3500px]">
          <div className="w-[378px] mt-24">
            <div className="flex gap-[15px] items-center mb-8">
              <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                2
              </span>
              <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                Appearance{' '}
                <span className="font-normal">(Size, colors, logo)</span>
              </div>
            </div>
            <div className="mt-8">
              <span className="font-normal text-sm leading-4">Size</span>
              <ul className="mt-4 flex items-center bg-[#F5F5F5] rounded-xl max-w-min h-12 p-1">
                {['Small', 'Medium', 'Large'].map((sizeType, index) => {
                  return (
                    <li
                      key={sizeType}
                      className={` px-[20px] py-[12px] flex justify-center items-center text-sm leading-4 text-center text-black rounded-[10px] ${
                        currentPage === index + 1
                          ? 'bg-white'
                          : 'text-[#777777]'
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {sizeType}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8">
              <span className="font-normal text-sm leading-4">Position</span>
              <ul className="mt-4  grid grid-cols-3 box-border w-[82px] h-[55px]">
                {Array.from(Array(9).keys()).map((positionType, index) => {
                  return (
                    <li
                      key={positionType}
                      className={`w-[24px] h-[15px] text-black border border-solid border-[#DDDDDD] ${
                        currentPage === index + 1
                          ? 'bg-purple-600'
                          : 'text-[#777777]'
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    ></li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-8">
              <span className="font-normal text-sm leading-4">Colors</span>
              <ul className="mt-4 flex gap-2.5 items-center bg-[#F5F5F5] rounded-xl max-w-min p-[3px]">
                {/* https://stackoverflow.com/questions/72481680/tailwinds-background-color-is-not-being-applied-when-added-dynamically */}
                {['#000000', '#F37C34', '#777777', '#DDDDDD', '#FFFFFF'].map(
                  (colorType, index) => {
                    return (
                      <li
                        key={`color-${colorType}`}
                        className={`w-[42px] h-[42px] text-white rounded-[10px] border border-solid  border-[#000000]/3 `}
                        style={{ backgroundColor: `${colorType}` }}
                        onClick={() => setCurrentPage(index + 1)}
                      ></li>
                    );
                  }
                )}
              </ul>
            </div>
            <div className="mt-8">
              <span className="font-normal text-sm leading-4">Upload Logo</span>
              <div className="border border-[#DDDDDD] border-dashed border-color py-8 flex justify-center items-center flex-col gap-5 mt-4">
                <div className="w-20 h-20 rounded-xl bg-opacity-10 bg-[#7D4AEA] flex justify-center items-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_79_9814)">
                      <path
                        d="M28.5 7.5V28.5H7.5V7.5H28.5ZM28.5 4.5H7.5C5.85 4.5 4.5 5.85 4.5 7.5V28.5C4.5 30.15 5.85 31.5 7.5 31.5H28.5C30.15 31.5 31.5 30.15 31.5 28.5V7.5C31.5 5.85 30.15 4.5 28.5 4.5ZM21.21 17.79L16.71 23.595L13.5 19.71L9 25.5H27L21.21 17.79Z"
                        fill="#7D4AEA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_79_9814">
                        <rect width="36" height="36" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <span className="font-[400] text-sm leading-4 text-black whitespace-nowrap flex justify-center items-center gap-[5px]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_79_9810)">
                        <path
                          d="M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM6 9.75H7.9125V12H10.0875V9.75H12L9 6.75L6 9.75Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_79_9810">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <a href="#">
                      {' '}
                      Drop your image here or{' '}
                      <span className="underline text-[#7D4AEA]">upload</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-[15px] items-center mt-24 mb-8">
                <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                  3
                </span>
                <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                  Content
                </div>
              </div>
              <span className="font-normal text-sm leading-4 ">
                Edit your content
              </span>
              <div className="w-full mt-4">
                <input
                  type="text"
                  className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                  name=""
                  id=""
                  defaultValue="Sign up"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  type="text"
                  className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                  name=""
                  id=""
                  defaultValue="Enter your email"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  type="text"
                  className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                  name=""
                  id=""
                  defaultValue="Sign up"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  type="text"
                  className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                  name=""
                  id=""
                  defaultValue="By signing up, you agree to Privacy Policy"
                />
              </div>
              <div className="mt-8">
                <span className="font-normal text-sm leading-4">
                  Upload Logo
                </span>
                <div className="border border-[#DDDDDD] border-dashed border-color py-8 flex justify-center items-center flex-col gap-5 mt-4">
                  <div className="w-20 h-20 rounded-xl bg-opacity-10 bg-[#7D4AEA] flex justify-center items-center">
                    <Image
                      src="/assets/placeholder-image.png"
                      width={72}
                      height={80}
                      alt="placeholder"
                    />
                  </div>
                  <div>
                    <span className="font-[400] text-sm leading-4 text-black whitespace-nowrap flex justify-center items-center gap-[5px]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_79_9810)">
                          <path
                            d="M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM6 9.75H7.9125V12H10.0875V9.75H12L9 6.75L6 9.75Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_79_9810">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <a href="#">
                        {' '}
                        Drop your image here or{' '}
                        <span className="underline text-[#7D4AEA]">upload</span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24">
              <div className="flex gap-[15px] items-center mb-8">
                <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                  4
                </span>
                <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                  Targeting Rules
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="flex ">
                  <span>Visitor Device</span>
                </div>
                <div>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      id="default-toggle"
                      className="sr-only peer "
                    />
                    <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
                  </label>
                </div>
              </div>
              <div className="mt-5 flex gap-5 h-12 w-full">
                <div className="flex items-center gap-[4px] bg-[#F5F5F5] rounded-xl grow">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px]"
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 14.5C15.825 14.5 16.5 13.825 16.5 13V3.5C16.5 2.675 15.825 2 15 2H3C2.175 2 1.5 2.675 1.5 3.5V13C1.5 13.825 2.175 14.5 3 14.5H0V16H18V14.5H15ZM3 3.5H15V13H3V3.5Z"
                      fill="#7D4AEA"
                    />
                  </svg>
                  Desktop
                </div>
                <div className="flex items-center gap-[4px] bg-[#F5F5F5] rounded-xl grow">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px]"
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.75 0.7575L5.25 0.75C4.425 0.75 3.75 1.425 3.75 2.25V15.75C3.75 16.575 4.425 17.25 5.25 17.25H12.75C13.575 17.25 14.25 16.575 14.25 15.75V2.25C14.25 1.425 13.575 0.7575 12.75 0.7575ZM12.75 14.25H5.25V3.75H12.75V14.25Z"
                      fill="#999999"
                    />
                  </svg>
                  Mobile
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between ">
                  <div className="flex ">
                    <span>After X Seconds</span>
                  </div>
                  <div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer "
                      />
                      <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
                    </label>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <input
                    type="text"
                    className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                    name=""
                    id=""
                    defaultValue="12"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between ">
                  <div className="flex ">
                    <span>After % Scroll</span>
                  </div>
                  <div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer "
                      />
                      <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
                    </label>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <input
                    type="text"
                    className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                    name=""
                    id=""
                    defaultValue="50"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between ">
                  <div className="flex ">
                    <span>Traffic Source</span>
                  </div>
                  <div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer "
                      />
                      <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
                    </label>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <input
                    type="text"
                    className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                    name=""
                    id=""
                    defaultValue="Enter your traffic source domain"
                  />
                </div>
              </div>
              <div className="mt-[78px]">
                <div className="flex justify-between ">
                  <div className="flex ">
                    <span className="font-semibold">Browser Language</span>
                  </div>
                  <div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer "
                      />
                      <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
                    </label>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <MultiSelect
                    items={[
                      ...[
                        { id: '1', value: 'turkeu' },
                        { id: '3', value: 'english' },
                        { id: '2', value: 'french' },
                      ],
                    ]}
                    placeholder="Select"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-between ">
                  <div className="flex ">
                    <span className="font-semibold">Exit Intent Targeting</span>
                  </div>
                  <div>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer "
                      />
                      <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24">
              <div className="flex gap-[15px] items-center mb-8">
                <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                  5
                </span>
                <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                  Settings and Code
                </div>
              </div>
              <div className="mt-[30px]">
                <h4 className="font-semibold text-lg leading-9 text-black tracking-half-tighter">
                  Webhook to Send data
                </h4>
                <div className="font-normal text-sm leading-4 mt-4">
                  Enter youe Webhook URL
                </div>
                <div className="text-xs mt-[5px]">
                  You can create a simple one with make.com
                </div>
                <div className="w-full mt-4">
                  <input
                    type="text"
                    className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3"
                    name=""
                    id=""
                    placeholder="Enter your webhook URL"
                  />
                </div>
                <div className="flex gap-[4px] grow mt-[15px]">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500  mr-[6px]"
                  />
                  Send form submissions
                </div>
                <div className="flex gap-[4px] grow mt-[15px]">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500  mr-[6px]"
                  />
                  Send click data
                </div>
                <button className="rounded-xl bg-purple-600 whitespace-nowrap  font-medium text-lg leading-5 text-center text-white tracking-tight mt-[50px] py-5 px-8 ">
                  Get your Code
                </button>
                <div className="relative mt-[30px]">
                  <div className="rounded-[8px] bg-[#333333] not-italic font-light text-xs leading-4 text-white font-robotomono p-[15px] pb-[57px]">
                    <CodeBlock
                      codeString={
                        '<script type="text/javascript" src="https://popupsmart.com/freechat.js"></script><script> window.start.init({ title: "Hi there :v:", message: "How may we help you? Just send us a message now to get assistance.", color: "#FA764F", position: "right", placeholder: "Enter your message", withText: "Write with", viaWhatsapp: "Or write us directly via Whatsapp", gty: "Go to your", awu: "and write us", connect: "Connect now", button: "Write us", device: "everywhere", services: [{"name":"whatsapp","content":null}]})</script>'
                      }
                    />
                  </div>
                  <button className=" absolute rounded-xl bg-purple-600 whitespace-nowrap  font-medium text-sm leading-5 text-center text-white tracking-tight mt-[50px] py-[4px] px-[15px] bottom-[10px] right-[10px] drop-shadow-md hover:drop-shadow-xl ">
                    Get your Code
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-24">
            <div className="sticky top-24 w-[800px] h-[468px] grid grid-cols-2  bg-white rounded-xl-[40px]   rounded-[40px]">
              <div className="w-[300px]">
                <div className="flex flex-col justify-center items-center  mx-auto">
                  <h3 className="text-4xl	font-semibold  text-black leading-[3.375rem] mt-16">
                    Sign up
                  </h3>

                  <p className="max-w-[459px] mt-2 font-[400] text-base leading-6 tracking-tigher">
                    Join new adventure
                  </p>
                  <div className="w-full mt-8">
                    <input
                      type="text"
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3"
                      name=""
                      id=""
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <input
                      type="text"
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3"
                      name=""
                      id=""
                      placeholder="Enter your email"
                    />
                  </div>
                  <button className="rounded-xl bg-black py-3 px-24 whitespace-nowrap  font-medium text-base leading-4 text-center text-white tracking-tight	w-full h-[48px] mt-4 ">
                    Sign up
                  </button>
                </div>
                <span className="font-light leading-3 text-gray-600 text-[10px] mt-4 ">
                  By signing up, you agree to{' '}
                  <a href="#" className="font-normal">
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="relative  ">
                {/* <img src="/51951afc5aa43fb6d90f01eeeec2b12c.png" alt="me" /> */}
                <div className="absolute w-full h-full t-0 l-0 ">
                  <span className="w-10 h-10 ml-auto rounded-full bg-black/30 	flex justify-center items-center mt-6 mr-6">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6351 6.70106L17.2985 5.3645L11.9997 10.6634L6.70082 5.3645L5.36426 6.70106L10.6631 11.9999L5.36426 17.2988L6.70082 18.6353L11.9997 13.3365L17.2985 18.6353L18.6351 17.2988L13.3362 11.9999L18.6351 6.70106Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className="bg-cover	h-full rounded-r-[40px]"
                  style={{
                    backgroundImage: `url(/assets/default-popup.jpg)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
