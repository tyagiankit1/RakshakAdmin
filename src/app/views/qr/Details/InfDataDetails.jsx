import React, { useState } from 'react'
import { RichTextEditor } from 'app/components'
import parse from 'html-react-parser';

const InfDataDetails = (props) => {
    const [content, setContent] = useState(props.influancerData)

    if(props.editorStatus){
        props.saveEditor(content); 
    }

    return (
        <div className="m-sm-30">
            {
                !props.editMode ? <div>{parse(content)}</div> : <RichTextEditor
                    content={content}
                    disabled
                    handleContentChange={(content) => setContent(content)}
                    placeholder="Insert data here..."
                />
            }
            
        </div>
    )
}

export default InfDataDetails
