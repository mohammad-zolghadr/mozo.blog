import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// CKeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

// styles
import style from "../sass/RichtextEditor.scss";
import voiceIco from "../assets/images/voice-ico.png";

const RichtextEditor = (props) => {
  let { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { ivBody, setIvBody } = props.hocState;

  const voiceTypingHandler = () => {
    if (!listening)
      SpeechRecognition.startListening({ continuous: true, language: "fa-IR" });
    else SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (transcript) setIvBody(transcript);
  }, [transcript]);

  useEffect(() => {
    if (ivBody === "") {
      resetTranscript();
    }
  }, [ivBody]);

  return (
    <div className="richTextEditorContainer">
      <CKEditor
        editor={Editor}
        data={ivBody}
        onChange={(e, editor) => {
          setIvBody(editor.getData());
        }}
      />
      <div className="newPostTextAreaContainer">
        <div>
          {listening && <div></div>}
          <img src={voiceIco} onClick={voiceTypingHandler} />
        </div>
      </div>
    </div>
  );
};

export default RichtextEditor;
