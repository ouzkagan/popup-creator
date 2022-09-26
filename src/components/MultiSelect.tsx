import { useEffect, useRef, useState } from 'react';

export type Item = {
  id: string;
  value: string;
};

type MultiSelectProps = {
  raised?: boolean;
  items: Item[];
  placeholder: string;
};

const MultiSelect = ({
  // raised = true,
  items = [
    { id: '1', value: 'turkeu' },
    { id: '3', value: 'english' },
    { id: '2', value: 'french' },
  ],
  placeholder = 'Select an Item',
}: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [opened, setIsOpened] = useState(false);
  const wrapperRef = useRef<HTMLInputElement | null>(null);
  const [wrapperClientHeight, setWrapperClientHeight] = useState(40);

  const onClickWrapper = () => {
    setIsOpened(!opened);
  };

  const onClickDeleteItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
    setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
  };

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      if (selectedItems.length > 0) {
        const newwrapperClientHeight =
          wrapperRef && wrapperRef.current
            ? wrapperRef.current?.clientHeight
            : 25;

        setWrapperClientHeight(newwrapperClientHeight);
      } else {
        setWrapperClientHeight(40);
      }
    }
  }, [selectedItems]);

  useEffect(() => {
    if (selectedItems.length === items?.length) {
      setIsOpened(false);
    }
  }, [selectedItems, items]);

  const onDropDownClicked = (newItem: Item) => {
    console.log('on dropdown clicked called');
    setSelectedItems([...selectedItems, newItem]);
    setSelectedIds([...selectedIds, newItem.id]);
  };

  console.log(
    'selctedItems--',
    wrapperRef && wrapperRef.current && wrapperRef.current?.clientHeight
  );

  console.log(
    items,
    items?.filter(
      (item) => selectedItems.findIndex((sel) => sel.id === item.id) === -1
    )
  );
  // const filteredItems = items?.filter(
  //   (item) => selectedItems.findIndex((sel) => sel.id === item.id) === -1
  // );
  return (
    <div
      // raised={raised}
      onClick={onClickWrapper}
      ref={wrapperRef}
      className="flex p-2 justify-between items-center relative rounded-xl border border-solid border-[#EAEAEA] text-base leading-6 text-gray-600  h-[48px] pl-3 w-full"
    >
      <div className="flex flex-grow ">
        {selectedItems.length === 0 && <span>{placeholder} </span>}
        {selectedItems.map(({ id, value }) => (
          <span
            className="bg-gray-200 p-1 rounded m-1 flex items-center"
            key={id}
            onClick={(e) => e.stopPropagation()}
          >
            {' '}
            <span className="mr-[11px] font-normal text-sm leading-4 text-black">
              {value}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClickDeleteItem(id);
              }}
            >
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
          className={`absolute w-full top-10 left-0 rounded-md p-1 ${
            opened ? 'opacity-1 visible' : 'opacity-0 invisible'
          } duration-200 transition-all ease-linear pt-[15px] pb-[16px]  border border-[#DDDDDD] bg-white`}
          // opened={opened}
          // raised={raised}
          // wrapperClientHeight={wrapperClientHeight}
        >
          <li
            className="w-full  list-none hover:bg-slate-400 h-[30px] flex items-center mb-[10px] px-[20px]   "
            key={'all'}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {' '}
            <input
              type="checkbox"
              onChange={() => console.log('clicked')}
              className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 mr-[10px]"
            />
            <span className="font-[400] text-xs leading-4 text-black">
              All Languages
            </span>
          </li>
          <div className="w-full my-[10px] px-[20px]">
            <div className="border-[#EAEAEA] border-y-[1px]"></div>
          </div>
          {items.map(({ id, value }) => (
            <li
              className="list-none hover:bg-slate-400 h-[30px] flex items-center px-[20px]"
              key={id}
              onClick={(e) => {
                e.stopPropagation();
                onDropDownClicked({ id, value });
              }}
            >
              {' '}
              <input
                type="checkbox"
                className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 mr-[10px]"
                checked={selectedIds.includes(id)}
                onChange={() => console.log('clicked')}
              />
              <span className="font-[400] text-xs leading-4 text-black">
                {value}
              </span>
            </li>
          ))}
          <div className="w-full my-[10px] ">
            <div className="border-[#EAEAEA] border-y-[1px]"></div>
          </div>
          <div className="flex justify-between px-[21px] mt-[16px]">
            <span className="font-semibold text-xs leading-4 text-black">
              Clear All
            </span>
            <span className="font-normal text-xs leading-4 text-black">
              Close
            </span>
          </div>
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
