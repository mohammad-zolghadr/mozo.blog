import React, { useState, useEffect } from "react";

// CKeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

// styles
import style from "../sass/RichtextEditor.scss";

const editorConfiguration = {
  toolbar: ["bold", "italic"],
};

const RichtextEditor = (props) => {
  const [value, setValue] = useState();

  return (
    <div className="richTextEditorContainer">
      {
        <CKEditor
          editor={Editor}
          //   config={editorConfiguration}
          data={value}
          onChange={(e, editor) => {
            props.hocState.setInputValue({
              ...props.hocState.inputValue,
              body: editor.getData(),
            });
            setValue(editor.getData());
            console.log(editor.getData());
          }}
        />
      }
    </div>
  );
};

export default RichtextEditor;
