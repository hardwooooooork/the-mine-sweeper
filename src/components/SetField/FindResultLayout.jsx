import React from 'react'
import './SetField.css'

export default function FindResultLayout(props) {
    const { resultset, fieldset} = props;
    return (
        <div id="SetField">
            <h1>지뢰 찾기</h1>
            <p>계산 결과</p>
            <div className="form-wrap">
                <div className="mine-field">
                    {resultset.map((o, key) =>
                        <div className="mine" key={key}>
                            <label
                                className={
                                    ((o >= 0) ? `find-mine-${o}` : "is-mine")+ 
                                        ((fieldset[key]) ? " this-is-mine" : "")
                                }
                            />
                        </div>)}
                </div>
            </div>
            <div className="btn-area">
                <button
                    onClick={props.resetField}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}
