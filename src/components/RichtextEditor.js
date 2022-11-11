import React, { useState, useEffect } from "react";

// CKeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

// styles
import style from "../sass/RichtextEditor.scss";

const RichtextEditor = (props) => {
  return (
    <div className="richTextEditorContainer">
      {
        <CKEditor
          editor={Editor}
          data={props.hocState.ivBody}
          onChange={(e, editor) => {
            props.hocState.setIvBody(editor.getData());
          }}
        />
      }
    </div>
  );
};

export default RichtextEditor;
