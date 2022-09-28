import { selectForm } from '@/store/features/default.slice';
import { useSelector } from 'react-redux';
const FormStateFromRedux = ({ form }) => {
  const formValue = useSelector((state) => selectForm(state, form));
  return <span>{JSON.stringify(formValue.values, 0, 2)}</span>;
};
const Preview = (): JSX.Element => {
  return (
    <div className="relative mt-24">
      <div className="sticky top-24 w-[800px] h-[468px] grid grid-cols-2  bg-white shadow-xl   rounded-l-[40px]">
        <div className="w-[300px] mx-auto">
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
            className="bg-cover	h-full "
            style={{
              backgroundImage: `url(/assets/default-popup.jpg)`,
            }}
          ></div>
        </div>
      </div>
      <div className="sticky top-24 w-[800px] h-[468px] bg-white">
        <FormStateFromRedux form="defaultForm" />
      </div>
    </div>
  );
};

export default Preview;
