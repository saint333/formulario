import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function Tiny() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <div>
            <Editor
                apiKey='st2nu7k7i85n64g5h2mqb3tu2z2a8i3gbipjau73hq76yae3'
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue='<p>This is the initial content of the editor.</p>'
                init={{
                    menubar: false,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent " + 
                        "autolink  link  image " +
                        "removeformat | table " + 
                        "code | preview ",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
            <button onClick={log}>Log editor content</button>
        </div>
    );
}

export default Tiny;
