import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

// CKeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

// styles
import style from "../sass/RichtextEditor.scss";

const editorConfiguration = {
  toolbar: ["bold", "italic"],
};

const RichtextEditor = () => {
  const [value, setValue] = useState();

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="richTextEditorContainer">
      {
        <CKEditor
          editor={Editor}
          //   config={editorConfiguration}
          data={value}
          onChange={(e, editor) => {
            setValue(editor.getData());
            console.log(editor.getData());
          }}
        />
      }
      {/* <div>{value && parse(value)}</div> */}
    </div>
  );
};

export default RichtextEditor;
