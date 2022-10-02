import { PopupPositions } from '@/store/features/settings.slice';

interface Props {
  setValue: (a: string, b: string) => void;
  position: PopupPositions;
}
const possiblePositions: PopupPositions[] = [
  'TOP_LEFT',
  'TOP_CENTER',
  'TOP_RIGHT',
  'CENTER_LEFT',
  'CENTER_CENTER',
  'CENTER_RIGHT',
  'BOTTOM_LEFT',
  'BOTTOM_CENTER',
  'BOTTOM_RIGHT',
];
function PositionSetting({ setValue, position }: Props) {
  return (
    <div>
      <span className="font-normal text-sm leading-4">Position</span>
      <ul className="mt-4  grid grid-cols-3 box-border w-[82px] h-[55px]">
        {Array.from(Array(9).keys()).map((positionType, index) => {
          return (
            <li
              key={positionType}
              className={`w-[24px] h-[15px] text-black border border-solid border-[#DDDDDD] cursor-pointer
                        ${
                          position &&
                          possiblePositions[index] === position &&
                          'bg-[#7D4AEA] border-[#7D4AEA]'
                        }
                        ${index == 0 && 'rounded-tl'}
                        ${index == 2 && 'rounded-tr'}
                        ${index == 6 && 'rounded-bl'}
                        ${index == 8 && 'rounded-br'}
                        `}
              onClick={() => setValue('position', possiblePositions[index])}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}

export default PositionSetting;
