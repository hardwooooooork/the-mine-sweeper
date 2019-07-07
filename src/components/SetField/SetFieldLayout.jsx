import React from 'react'
import './SetField.css'

export default function SetFieldLayout(props) {
    const { fieldset } = props;
    return (
        <div id="SetField">
            <h1>지뢰를 선택하세요.</h1>
            <p>현재 지뢰수 : {props.getTotalMineNum()}</p>
            <div className="form-wrap">
                <div className="mine-field">
                    {fieldset.map((o, key) => 
                    <div className="mine" key={key}>
                        <label 
                            className={o ? "is-mine" : "not-mine"}
                                onClick={() => props.onClickHandeler(key)}
                            />
                    </div>)}
                </div>
            </div>
            <div className="btn-area">
                <button
                    onClick={props.findMine}
                    disabled={(props.getTotalMineNum() < props.maxMineNum) }
                >
                    Find mine
                </button>
            </div>
        </div>
        
    )
}
