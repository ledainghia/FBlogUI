import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/writepost.css';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import NavbarSlid from '../components/NavbarSlid';
import { useNavbarStore, useUserStore } from '../store/store';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '../customHooks/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axiosInstance from '../config/axiosConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import WritePost2 from './WritePost2';
interface categories {
    categoryId: number,
    categoryName: string,
    parentCategoryId: number | null,
}

export default function WritePost() {
    const { user } = useUserStore();

    const [title, setTitle] = useState<string>('');
    const [category] = useState<string>('SE');
    // const [categoryParent, setCategoryParent] = useState<number | null>(null);
    let categoryParent: number | null = null;
    const toastId = useRef<string | number>("");

    const [value, setValue] = useState('');
    const { isNavbar } = useNavbarStore();
    const [isCheck, setIsCheck] = useState(false);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://api.fublog.tech/api/v1/auth/category/view");
                console.log("category", response);
                const category = response.data.data;
                // cusToast.showToast("Get category successfully", "success");
                console.log("category", category);
                setCategories(category);
            } catch (err) {
                console.error(err);
                //cusToast.showToast(String.toString(err), "error");
            }
        }

        fetchData();
    }, [setCategories]);

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleCategoryChange() {
        // const selectedCategory = event.target.value;
        const selectCtegory = categoryRef.current?.value;
        if (selectCtegory) {

            categories.find((cate: categories) => {
                if (cate.categoryName === selectCtegory) {
                    console.log(selectCtegory);
                    categoryParent = cate.parentCategoryId;
                }
            })
            console.log("cas", categoryParent);
        }


    }

    function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        console.log(event.target.files)
        if (file && file.type.startsWith('image/')) {
            if (file?.size && file?.size > 1000000) {

                event.target.value = ''; // Clear the input field
                event.target.files = null;
                setThumbnail(null);
                console.log(file?.size)
                toast.error("File is larger than 100mb, Please reduce the size of file image and upload again", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else {

                console.log(file.type);
                const storageRef = ref(storage, `/files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // progress function
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        console.log(progress);
                        // add progress for toast of upload image using toastify
                        if (toastId.current === "") {
                            toastId.current = toast('Upload in Progress', { progress, type: toast.TYPE.INFO });
                        } else {
                            toast.update(toastId.current, {
                                render: `Upload ${progress}%`,
                                type: toast.TYPE.INFO,
                            });
                        }
                    },
                    (err) => {
                        console.log(err);
                        toast.error("Upload image error! Please try again", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setThumbnail(null);


                    },
                    () => {
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url);
                            toast.update(toastId.current, { render: "Upload successfully", type: toast.TYPE.SUCCESS });

                            setThumbnail(url);
                        });

                    }
                );


            }
        } else {
            event.target.value = ''; // Clear the input field
            event.target.files = null;
            setThumbnail(null);
            toast.error("You cannot upload another file different image file", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
    }
    const handleCheck = () => {
        setIsCheck(!isCheck);
    }
    async function handleSubmitPost(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        console.log(event.currentTarget.value);

        const postData = {
            title: title,
            categoryName: category,
            parentCategoryId: categoryParent,
            image: thumbnail,
            content: value,
            userId: user?.id,
            typePost: "BLOG",
            tagList: [],
        }
        // get value from input
        console.log(postData);
        try {
            const response = await axiosInstance.post("/api/v1/auth/blogPosts/insert", postData, {
                timeout: 5000,
            });
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log(error);

        }




        console.log(title, category, thumbnail);
    };

    useEffect(() => {
        document.title = "Write Post";
        console.log(value);
    }, [value])

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            ['link', 'image', 'video'],

        ],

    };


    return (
        <>
            <ToastContainer />
            <div className='site-wrapper'>
                <div className={`${isNavbar ? "main-overlay active" : ""}`}>
                    <Header />
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form method='post' onSubmit={handleSubmitPost}>
                                    <fieldset >
                                        <legend>Viết bài viết của riêng bạn</legend>
                                        <div className="mb-3">
                                            <label className="form-label">Nhập tiêu đề cho bài viết</label>
                                            <input type="text" id="" onChange={handleTitleChange} className="form-control" placeholder="Nhập tiêu đề cho bài viết" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Chọn chuyên ngành</label>
                                            <select className="form-select" ref={categoryRef} onChange={handleCategoryChange} required >
                                                {categories.map((category: categories) => {
                                                    return (
                                                        <option value={category.categoryName}>{category.categoryName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Upload thumbnail</label>
                                            <input className="form-control" style={{ borderRadius: "10px" }} type="file" id="formFile" onChange={handleThumbnailChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" required onChange={handleCheck} id="disabledFieldsetCheck" />
                                                <label className="form-check-label" >
                                                    Bạn đã đọc kỹ nội quy đăng bài. Nếu bài viết bạn vi phạm tùy mức độ có thể bị <strong className='text-danger'>ban account viễn viễn</strong>!!
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Nội dung bài viết</label>
                                            <ReactQuill className='editor mb-3 ' theme="snow" value={value} onChange={setValue} modules={modules} />
                                            {/* <WritePost2></WritePost2> */}
                                        </div>
                                        <button type="submit" className="btn btn-primary ">Submit</button>
                                    </fieldset>
                                </form>

                            </div>
                            <div className='col-md-6'>
                                <h2 className='text-center'>Preview</h2>

                                <div className="card">
                                    <div className="card-body">
                                        <div dangerouslySetInnerHTML={{ __html: value }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            <NavbarSlid />
        </>
    );
}
