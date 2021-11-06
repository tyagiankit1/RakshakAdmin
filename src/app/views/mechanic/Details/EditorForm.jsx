import React, { useState } from 'react'
import { RichTextEditor } from 'app/components'

const EditorForm = (props) => {
    const [content, setContent] = useState(``)

    if(props.editorDataStatus){
        props.submitEditorData(content);      
    }

    return (
        <div className="m-sm-30">
            <RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="Insert data here..."
            />
        </div>
    )
}

export default EditorForm
