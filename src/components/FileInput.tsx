import Image from 'next/image';
import { useCallback, useState } from 'react';
import type { FileWithPath } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import type { FieldRenderProps } from 'react-final-form';

interface Props extends FieldRenderProps<string, HTMLElement> {
  getFiles: (files: FileWithPath[]) => void;
}

function FileInput({ required, input, getFiles, ...props }: Props) {
  const [acceptedFiles, setacceptedFiles] = useState<FileWithPath[] | null>(
    null
  );

  const file = acceptedFiles?.map((file) => (
    // <span key={file.path}>
    //   {file.path} - {file.size} bytes
    //   <img src={URL.createObjectURL(file)} alt="" />
    // </span>
    <Image
      src={URL.createObjectURL(file)}
      key={file.path}
      width={72}
      height={80}
      alt="placeholder"
    />
  ));
  const onDrop = useCallback(
    (files: FileWithPath[]) => {
      // input.onChange(URL.createObjectURL(files[files.length - 1]));
      console.log(files);
      // console.log(acceptedFiles);
    },
    [input]
  );
  const handleFiles = (files: FileWithPath[]) => {
    setacceptedFiles(files);
    getFiles(files);
    onDrop(files);
  };
  console.log(props.meta.initial);
  return (
    <Dropzone
      onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className="border border-[#DDDDDD] border-dashed border-color py-8 flex justify-center items-center flex-col gap-5 mt-4"
          {...getRootProps()}
        >
          <input {...getInputProps()} multiple={false} required={required} />
          <div className="w-20 h-20 rounded-xl bg-opacity-10 bg-[#7D4AEA] flex justify-center items-center">
            {file == null ? (
              props.meta.initial == '' ? (
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_79_9814)">
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
              ) : (
                <Image
                  src={props.meta.initial || ''}
                  loader={() => props.meta.initial || ''}
                  unoptimized
                  width={72}
                  height={80}
                  alt="placeholder"
                />
              )
            ) : (
              file
            )}
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
                <g clipPath="url(#clip0_79_9810)">
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

              <span>
                {' '}
                Drop your image here or{' '}
                <span
                  {...props}
                  className="underline text-[#7D4AEA] cursor-pointer"
                >
                  upload
                </span>
              </span>
            </span>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default FileInput;
