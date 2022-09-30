import { useEffect, useRef, useState } from 'react';

export type Item = {
  id: string | number;
  value: string;
  code: string;
};

type MultiSelectProps = {
  raised?: boolean;
  items: Item[];
  placeholder: string;
  selectedValues: string[];
  name: string;
  setSelectedValues: (selectedCodes: string[]) => void;
  defaultValue: string;
};

const MultiSelect = ({
  // raised = true,
  items,
  placeholder = 'Select an Item',
  selectedValues,
  setSelectedValues,
  name,
  defaultValue,
}: MultiSelectProps) => {
  const [cachedItems, setCachedItems] = useState<Item[]>([
    ...items.filter((item) => selectedValues.includes(item.code)),
  ]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [opened, setIsOpened] = useState(false);
  const wrapperRef = useRef<HTMLInputElement | null>(null);
  const [wrapperClientHeight, setWrapperClientHeight] = useState(40);

  const onClickWrapper = () => {
    setIsOpened(!opened);
  };

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      if (cachedItems.length > 0) {
        const newwrapperClientHeight =
          wrapperRef && wrapperRef.current
            ? wrapperRef.current?.clientHeight
            : 25;

        setWrapperClientHeight(newwrapperClientHeight);
      } else {
        setWrapperClientHeight(40);
      }
    }
  }, [cachedItems]);

  useEffect(() => {
    if (selectedValues.length === items?.length) {
      setIsOpened(false);
    }
  }, [selectedValues, cachedItems, items]);

  const onClickDeleteItem = (code: string) => {
    setCachedItems(cachedItems.filter((item) => item.code !== code));
    // setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    setSelectedValues([
      ...selectedValues.filter((itemCode) => itemCode !== code),
    ]);
  };

  const onClickAddItem = (newItem: Item) => {
    setSelectedValues([...selectedValues, newItem.code]);
    setCachedItems([...cachedItems, newItem]);
  };
  const toggleSelect = (newItem: Item) => {
    // console.log('on dropdown clicked called');
    if (selectedValues.includes(newItem.code)) {
      onClickDeleteItem(newItem.code);
    } else {
      onClickAddItem(newItem);
    }
  };
  const toggleAll = () => {
    // console.log('on dropdown clicked called');
    if (isAllSelected) {
      setSelectedValues([...cachedItems.map((item) => item.code)]);
    } else {
      setSelectedValues([...items.map((item) => item.code)]);
    }
    setIsAllSelected(!isAllSelected);
  };

  const cleanAll = () => {
    // console.log('on dropdown clicked called');
    setSelectedValues([]);
    setCachedItems([]);
  };

  // console.log(
  //   'selctedItems--',
  //   wrapperRef && wrapperRef.current && wrapperRef.current?.clientHeight
  // );

  // console.log(
  //   items,
  //   items?.filter(
  //     (item) => cachedItems.findIndex((sel) => sel.id === item.id) === -1
  //   )
  // );
  // const filteredItems = items?.filter(
  //   (item) => cachedItems.findIndex((sel) => sel.id === item.id) === -1
  // );
  return (
    <div
      // raised={raised}
      onClick={onClickWrapper}
      ref={wrapperRef}
      className="flex  p-[0px] justify-between items-center relative rounded-[8px] border border-solid border-[#EAEAEA] text-base leading-6 text-gray-600  w-full h-min min-h-[36px]"
    >
      <div className="flex flex-grow flex-wrap max-h-[350px] scrollbar-thumb-[#DDDDDD] scrollbar-thin scrollbar-rounded scrollbar-track-rounded">
        {selectedValues.length === 0 && (
          <span className="pl-[12px]">{placeholder} </span>
        )}
        {selectedValues.map((code) => (
          <span
            className={` rounded-[8px] m-[3px] mr-0 flex items-center
            ${
              defaultValue == code
                ? 'bg-gray-200'
                : 'bg-white border-[#EA0F0F] border-[1px]'
            }
            `}
            key={code}
            onClick={(e) => e.stopPropagation()}
          >
            {' '}
            <span className="mr-[3px] font-[400] text-[14px] leading-4 text-black pl-[12px] pr-[11px] py-[7px]">
              {items.filter((item) => item.code == code)?.[0]?.value}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClickDeleteItem(code);
              }}
              className="pr-[8px] cursor-pointer"
            >
              {defaultValue === code ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_48_374)">
                    <path
                      d="M12.5 11.515L11.515 12.5L9 9.985L6.485 12.5L5.5 11.515L8.015 9L5.5 6.485L6.485 5.5L9 8.015L11.515 5.5L12.5 6.485L9.985 9L12.5 11.515Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_48_374">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(3 3)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="9" r="9" fill="#EA0F0F" />
                  <g clip-path="url(#clip0_48_366)">
                    <path
                      d="M12.5 11.515L11.515 12.5L9 9.985L6.485 12.5L5.5 11.515L8.015 9L5.5 6.485L6.485 5.5L9 8.015L11.515 5.5L12.5 6.485L9.985 9L12.5 11.515Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_48_366">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(3 3)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </span>
          </span>
        ))}
      </div>
      <span className="inline-block w-5">
        {opened ? (
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.55555 11.5581L9.99805 8.12311L13.4405 11.5581L14.498 10.5006L9.99805 6.00061L5.49805 10.5006L6.55555 11.5581Z"
              fill="#777777"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4425 6.44238L9 9.87738L5.5575 6.44238L4.5 7.49988L9 11.9999L13.5 7.49988L12.4425 6.44238Z"
              fill="#777777"
            />
          </svg>
        )}
      </span>
      {items?.length > 0 && (
        <ul
          className={`absolute w-full  leftop-0 rounded-md p-1 ${
            opened ? 'opacity-1 visible' : 'opacity-0 invisible'
          } duration-200 transition-all ease-linear pb-[16px]  border border-[#DDDDDD] bg-white z-10`}
          style={{
            top: wrapperClientHeight + 'px',
          }}
          // opened={opened}
          // raised={raised}
          // wrapperClientHeight={wrapperClientHeight}
        >
          <div className=" overflow-auto h-[308px] pt-[15px]  scrollbar-thumb-[#DDDDDD] scrollbar-thin scrollbar-rounded scrollbar-track-rounded">
            <li
              className="w-full  list-none hover:bg-[#F5F5F5] h-[30px] flex items-center mb-[10px] px-[20px] cursor-pointer  "
              key={'all'}
              onClick={(e) => {
                e.stopPropagation();
                toggleAll();
              }}
            >
              {' '}
              <input
                type="checkbox"
                onChange={() => toggleAll()}
                className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 mr-[10px]"
                checked={items.length == selectedValues.length}
              />
              <span className="font-[400] text-xs leading-4 text-black">
                All {name}
              </span>
            </li>
            <div className="w-full my-[10px] px-[20px]">
              <div className="border-[#EAEAEA] border-t-[1px]"></div>
            </div>
            {items.map((item) => (
              <li
                className="list-none hover:bg-[#F5F5F5] h-[30px] flex items-center px-[20px] cursor-pointer"
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  // onDropDownClicked({ id, code, value });
                  toggleSelect(item);
                }}
              >
                {' '}
                <input
                  type="checkbox"
                  className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 mr-[10px]"
                  checked={selectedValues.includes(item.code)}
                  onChange={() => toggleSelect(item)}
                />
                <span className="font-[400] text-xs leading-4 text-black">
                  {item.value}
                </span>
              </li>
            ))}
          </div>
          <div className="w-full mb-[10px] ">
            <div className="border-[#EAEAEA] border-t-[1px]"></div>
          </div>
          <div className="flex justify-between px-[21px] mt-[16px]">
            <span
              className="font-semibold text-xs leading-4 text-black cursor-pointer"
              onClick={() => cleanAll()}
            >
              Clear All
            </span>
            <span
              className="font-normal text-xs leading-4 text-black cursor-pointer"
              onClick={() => setIsOpened(false)}
            >
              Close
            </span>
          </div>
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
