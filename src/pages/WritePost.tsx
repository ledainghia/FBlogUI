import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/writepost.css';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NavbarSlid from '../components/NavbarSlid';
import { useNavbarStore } from '../store/store';
// import WritePost2 from './WritePost2';

export default function WritePost() {
    const [value, setValue] = useState('');
    const { isNavbar } = useNavbarStore();
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
            <div className='site-wrapper'>
                <div className={`${isNavbar ? "main-overlay active" : ""}`}>
                    <Header />
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form>
                                    <fieldset >
                                        <legend>Viết bài viết của riêng bạn</legend>
                                        <div className="mb-3">
                                            <label className="form-label">Nhập tiêu đề cho bài viết</label>
                                            <input type="text" id="" className="form-control" placeholder="Nhập tiêu đề cho bài viết" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Chọn chuyên ngành</label>
                                            <select id="disabledSelect" className="form-select">
                                                <option>None</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Chọn chuyên sâu hơn</label>
                                            <select id="disabledSelect" className="form-select">
                                                <option>None</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" />
                                                <label className="form-check-label" >
                                                    Bạn đã đọc kỹ nội quy đăng bài. Nếu bài viết bạn vi phạm tùy mức độ có thể bị <strong className='text-danger'>ban account viễn viễn</strong>!!
                                                </label>
                                            </div>
                                        </div>
                                        <ReactQuill className='editor mb-3 ' theme="snow" value={value} onChange={setValue} modules={modules} />
                                        {/* <WritePost2></WritePost2> */}
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
