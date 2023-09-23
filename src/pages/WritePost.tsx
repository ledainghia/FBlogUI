
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@toast-ui/editor/dist/toastui-editor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import { useEffect, useState } from 'react';

export default function WritePost() {
    const [value, setValue] = useState('');
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
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],

    };

    return (
        <div>
            <Header />
            <div className='container-fluid'>
                {/* <Editor
                    initialValue="Bạn viết post của mình ở đây"
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    ref={editorRef}
                /> */}

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
                                            Bạn đã đọc kỹ nội quy đăng bài. Nếu bài viết bạn vi phạm tùy mức độ có thể bị ban account viễn viễn
                                        </label>
                                    </div>
                                </div>
                                <ReactQuill className='editor mb-3 ' theme="snow" value={value} onChange={setValue} modules={modules} />
                                <button type="submit" className="btn btn-primary ">Submit</button>
                            </fieldset>
                        </form>

                    </div>
                    <div className='col-md-6'>
                        <h2>Preview</h2>
                        <div dangerouslySetInnerHTML={{ __html: value }}></div>
                    </div>
                </div>
                {/* <Editor></Editor> */}
            </div>
            <Footer />
        </div>
    );
}
