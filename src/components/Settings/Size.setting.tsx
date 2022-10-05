import { PopupSizes } from '@/store/features/settings.slice';

interface Props {
  setValue: (a: string, b: string) => void;
  size: PopupSizes;
}
function SizeSetting({ setValue, size }: Props) {
  return (
    <div>
      <span className="font-normal text-sm leading-[18px]">Size</span>
      <ul className="mt-4 flex items-center bg-[#F5F5F5] rounded-xl max-w-min h-12 p-1">
        {['Small', 'Medium', 'Large'].map((sizeType) => {
          return (
            <li
              key={sizeType}
              className={` px-[20px] py-[12px] flex justify-center items-center text-sm leading-[18px] text-center  rounded-[10px] cursor-pointer font-semibold
                        ${
                          size && size === sizeType.toUpperCase()
                            ? 'text-black bg-white'
                            : 'text-[#777]'
                        }
                        `}
              // onClick={() => setCurrentPage(index + 1)}
              onClick={() => setValue('size', sizeType.toUpperCase())}
            >
              {sizeType}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SizeSetting;
