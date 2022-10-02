interface Props {
  setValue: (a: string, b: string) => void;
}
function ColorSetting({ setValue }: Props) {
  return (
    <div>
      <span className="font-normal text-sm leading-4">Colors</span>
      <ul className="mt-4 flex gap-2.5 items-center rounded-xl max-w-min p-[3px]">
        {/* https://stackoverflow.com/questions/72481680/tailwinds-background-color-is-not-being-applied-when-added-dynamically */}
        {['#000000', '#F37C34', '#777777', '#DDDDDD', '#FFFFFF'].map(
          (colorType) => {
            return (
              <li
                key={`color-${colorType}`}
                className={`w-[42px] h-[42px] text-white rounded-[10px] border border-solid  border-[#000000]/3 cursor-pointer `}
                style={{ backgroundColor: `${colorType}` }}
                onClick={() => setValue('color', colorType)}
                // onClick={() => setCurrentPage(index + 1)}
              ></li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default ColorSetting;
