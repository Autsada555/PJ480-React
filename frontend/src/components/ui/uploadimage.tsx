// import { Setter } from 'node_modules/date-fns/parse/_lib/Setter';
import React from 'react';
import ImageUploading from 'react-images-uploading';

type ImageUploadProps = {
    setData: React.Dispatch<React.SetStateAction<any>>;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ setData }) => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setData(imageList[0].data_url)
        console.log(imageList[0].data_url)
    };

    return (
        <div className="App border rounded-md flex justify-center">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    // onImageRemoveAll,
                    // onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <h1 className='cursor-pointer'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            คลิกอัพโหลดรูป
                        </h1>
                        &nbsp;
                        {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                    <div className='cursor-pointer' onClick={() => onImageRemove(index)}>ลบ</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}