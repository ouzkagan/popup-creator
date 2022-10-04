import Image from 'next/image';
import { useCallback, useState } from 'react';
import type { FileWithPath } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import type { FieldRenderProps } from 'react-final-form';

interface Props extends FieldRenderProps<string, HTMLElement> {
  getFiles: (files: FileWithPath[]) => void;
  loading: boolean;
}

function FileInput({
  required,
  input,
  meta,
  getFiles,
  loading,
  ...props
}: Props) {
  const [acceptedFiles, setacceptedFiles] = useState<FileWithPath[] | null>(
    null
  );
  const file = acceptedFiles?.map((file) => (
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
      input.onChange(URL.createObjectURL(files[files.length - 1]));
    },
    [input]
  );
  const handleFiles = (files: FileWithPath[]) => {
    setacceptedFiles(files);
    getFiles(files);
    onDrop(files);
  };
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
          <div className="relative w-20 h-20 rounded-xl bg-opacity-10 bg-[#7D4AEA] flex justify-center items-center ">
            {loading && (
              <div
                role="status"
                className="absolute flex justify-center items-center w-20 h-20 z-10 bg-white/80 "
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                    data-darkreader-inline-fill=""
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  ></path>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {file == null ? (
              meta.initial == '' ? (
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
                <span className="min-w-[72px]">
                  <Image
                    src={meta.initial || ''}
                    loader={() => meta.initial || ''}
                    unoptimized
                    width={72}
                    height={80}
                    alt="placeholder"
                  />
                </span>
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
                  upload{' '}
                </span>
              </span>
            </span>
          </div>
          {meta.error && meta.submitFailed && (
            // !rest?.disabled &&
            <div className="text-red-500 p-2">{meta.error}</div>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default FileInput;
