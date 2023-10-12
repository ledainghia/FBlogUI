import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/writepost.css';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';

import { useNavbarStore, useUserStore } from '../store/store';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '../customHooks/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axiosInstance from '../config/axiosConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Box, Button, Modal } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
// import WritePost2 from './WritePost2';




interface categories {
    categoryId: number,
    categoryName: string,
    parentCategoryId: number | null,
}


const theme = createTheme({
    palette: {
        primary: {
            main: orange[300],
            light: orange[300],
            dark: orange[300],



        },
        secondary: {
            main: orange[200],
        },
    },



});
export function extractHashtags(text: string) {
    // Use a regular expression to find hashtags
    const hashtags = text.match(/#(\S+?)(?=\s|<|$)/g);

    if (hashtags) {
        // Remove the "#" symbol from each hashtag
        return hashtags.map((hashtag: string) => hashtag.substring(1));
    } else {
        return [];
    }
}

export default function WritePost() {
    const { user } = useUserStore();

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('SE');
    const [categoryParent, setCategoryParent] = useState<number | null>(null);
    // let categoryParent: number | null = null;
    const toastId = useRef<string | number>("");
    const [value, setValue] = useState('');
    const { isNavbar } = useNavbarStore();
    const [isCheck, setIsCheck] = useState(false);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [categories, setCategories] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
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

    function handleCategoryChange(option: any) {
        console.log("chang", option);
        // const selectedCategory = event.target.value;

        const selectCtegory = option.value;
        if (selectCtegory) {
            categories.find((cate: categories) => {
                if (cate.categoryId.toString() === selectCtegory) {
                    setCategory(cate.categoryName);
                    setCategoryParent(cate.parentCategoryId);
                    console.log("paren ", cate.categoryId, " ", selectCtegory, " parent ", cate.parentCategoryId, " ", categoryParent);
                }
            })
        }

    }

    function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        console.log(event.target.files)
        if (file && file.type.startsWith('image/')) {
            if (file?.size && file?.size > 10000000) {

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

        const postData = {
            title: title,
            categoryName: category,
            parentCategoryId: categoryParent,
            image: thumbnail,
            content: value,
            userId: user?.id,
            typePost: "BLOG",
            tagList: extractHashtags(value),
        }
        // get value from input
        console.log(postData);
        try {
            const response = await axiosInstance.post("/api/v1/auth/blogPosts/insert", postData, {
                timeout: 5000,
            });
            console.log(response);
            setModalOpen(true);
            // navigate('/');
        } catch (error) {
            console.log(error);

        }

    };


    function handleModalClose() {
        setModalOpen(false);
        setTitle('');
        setCategory('');
        setThumbnail(null);
        setValue('');
        setCategoryParent(null);
        navigate('/');
    }



    useEffect(() => {
        document.title = "Write Post";
        console.log(extractHashtags(value));
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



    interface options {
        value: string;
        label: string;
    }
    const options: options[] = categories.map((category: categories) => ({
        value: category.categoryId.toString(),
        label: category.categoryName
    }));


    const customStyles = {
        menu: (provided: any) => ({
            ...provided,
            zIndex: "999900000"
        })
    };


    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <Modal open={modalOpen} onClose={handleModalClose}>
                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            border: '0px solid #fff',
                            boxShadow: 24,
                            p: 4,
                            textAlign: 'center', // Để căn giữa các phần tử theo chiều ngang
                            borderRadius: '10px',
                        }}
                    >
                        <h2>Post created successfully!</h2>
                        <p>Do you want to create a new post or return to the home page?</p>
                        <Button
                            onClick={() => { setModalOpen(false); }}
                            variant="contained"
                            color="primary"
                            sx={{ margin: '8px' }} // Tạo khoảng cách giữa hai nút
                        >
                            Create new post
                        </Button>
                        <Button
                            onClick={handleModalClose}
                            variant="outlined"
                            color="primary"
                            sx={{ margin: '8px' }} // Tạo khoảng cách giữa hai nút
                        >
                            Return to home page
                        </Button>
                    </Box>
                </Modal>
            </ThemeProvider>
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
                                            <label className="form-label">Chọn chuyên ngành hoạc môn học</label>
                                            {/* <select className="form-select" ref={categoryRef} onChange={handleCategoryChange} required >
                                                {categories.map((category: categories) => {
                                                    return (
                                                        <option value={category.categoryName}>{category.categoryName}</option>
                                                    )
                                                })}
                                            </select> */}

                                            <ThemeProvider theme={theme}>
                                                <Select
                                                    // value={category}
                                                    onChange={handleCategoryChange}
                                                    options={options}
                                                    styles={customStyles}
                                                />
                                            </ThemeProvider >
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Upload thumbnail</label>
                                            <input className="form-control" style={{ borderRadius: "10px" }} type="file" id="formFile" onChange={handleThumbnailChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Nội dung bài viết</label>
                                            <ReactQuill className='editor mb-3 ' theme="snow" value={value} onChange={setValue} modules={modules} />
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" required onChange={handleCheck} id="disabledFieldsetCheck" />
                                                <label className="form-check-label" >
                                                    Bạn đã đọc kỹ nội quy đăng bài. Nếu bài viết bạn vi phạm tùy mức độ có thể bị <strong className='text-danger'>ban account viễn viễn</strong>!!
                                                </label>
                                            </div>
                                        </div>
                                        <button type="submit" style={{ background: "orange" }} className="btn btn-primary mt-3 ">Submit</button>
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

        </>
    );
}
