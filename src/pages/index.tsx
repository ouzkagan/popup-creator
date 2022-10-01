import { AppState } from '@/store';
import Preview from '@/templates/Preview';
import Settings from '@/templates/Settings';
import { InferGetStaticPropsType } from 'next/types';

import { wrapper } from '@/store';
import { set_popups } from '@/store/features/popupTemplates.slice';
import Templates from '@/templates/Templates';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const res = await fetch(`http://localhost:3000/api/popups`);
  const popupTemplates = await res.json();
  await store.dispatch(set_popups(popupTemplates));
  // await store.dispatch(getPopupTemplates());

  // Pass data to the page via props
  return { props: { popupTemplates } };
});

const Home: NextPage = ({
  popupTemplates,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const myState = useSelector((state: AppState) => state.defaultForm);
  // console.log(myState);

  /* */
  return (
    <div className=" bg-white">
      {/* {MyResponse} */}
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
            <div className="absolute w-full h-full top-0 left-0 ">
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
                  <g clipPath="url(#clip0_79_9552)">
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
                  <g clipPath="url(#clip0_79_9559)">
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
              <p className=" font-semibold text-4xl tracking-tighter">
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
        <p className="max-w-[459px] mt-4 font-[400] text-base leading-6 tracking-tighter">
          Measure your return on email marketing efforts easier and faster by
          using thebest online tools. Popupsmart is ready to help you build an
          efficient email list!
        </p>

        <Templates popupTemplates={popupTemplates} />
        {/* STEPS */}
        <div className="flex gap-[76px] h-[3500px]">
          <Settings />

          <Preview />
        </div>
      </section>
    </div>
  );
};

export default Home;
