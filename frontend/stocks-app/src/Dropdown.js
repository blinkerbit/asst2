import React from 'react';

export const Dropdown = (props) => {
	const onChange = (e) => {
     console.log(e.target.value)
     props.onCodeSelected(e.target.value);
    }
    return(
        <div>
            <select onChange={onChange}>
                <option value="test">test</option>
                {
                   props.range && Object.keys(props.range).length &&
                   Object.keys(props.range).map((key) => {
                        return <option value={key}>{props.range[key]}</option>
                   })
                }
            </select>
        </div>
    )
}