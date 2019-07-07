import React, { Component } from 'react'
import SetField from './SetField' 

const ROW = 10;
const COL = 10;

export default class Rooot extends Component {
    state={
        fieldset: new Array(ROW * COL).fill(false),
        resultset: new Array(ROW * COL).fill(0),
        resultFlag: false,
        maxMineNum: 10,
    }
/**
 * 클릭시 이벤트 메서드 (초기화)
 */
    resetField= ()=>{
        const fieldset=  new Array(ROW * COL).fill(false);
        const resultset= new Array(ROW * COL).fill(0);
        const resultFlag = false;
        this.setState({
            fieldset, resultset, resultFlag
        })
    }

/**
 * 클릭시 이벤트 메서드 (계산)
 */
    onClickHandeler = (key)=> {
        let { fieldset, maxMineNum } = this.state
        fieldset[key] = !fieldset[key];
        if (maxMineNum >= fieldset.filter(o => o).length){
            this.setState(fieldset);
        }
    }

/**
 * 총 지뢰 갯수 계산메서드
 */
    getTotalMineNum = () => {
        let { fieldset} = this.state
        const minenum = fieldset.filter(o => o).length
        return minenum
    }



/**
 * 전체 지뢰 탐색메서드
 */
/*
        다음 자신주변의 쉘주변에 지뢰를 탐색

            N.W   N   N.E
              \   |   /
               \  |  /
            W----Cell----E
                 / | \
               /   |  \
            S.W    S   S.E

        Cell-->Current Cell 
        N -->  North        
        S -->  South        
        E -->  East         
        W -->  West         
        N.E--> North-East   
        N.W--> North-West   
        S.E--> South-East   
        S.W--> South-West   
*/
    findMine = ()=>{
        const { fieldset } = this.state;
        // 순차적으로 탐색
        const resultset = fieldset.map((item,key)=>{
            let temp_result = 0;
            if (this.findMineEast(key)) {
                temp_result += this.findMineEast(key);
            }
            if (this.findMineNorth(key)) {
                temp_result += this.findMineNorth(key);
            }
            if (this.findMineSouth(key)) {
                temp_result += this.findMineSouth(key);
            }
            if (this.findMineWest(key)) {
                temp_result += this.findMineWest(key);
            }
            if (this.findMineNorthEast(key)) {
                temp_result += this.findMineNorthEast(key);
            }
            if (this.findMineNorthWest(key)) {
                temp_result += this.findMineNorthWest(key);
            }
            if (this.findMineSouthEast(key)) {
                temp_result += this.findMineSouthEast(key);
            }
            if (this.findMineSouthWest(key)) {
                temp_result += this.findMineSouthWest(key);
            }
            return temp_result;
        })
        //console.log(resultset);
        const resultFlag = true;
        this.setState({ resultset, resultFlag});
    }



/**
 * 현재 위치를 기준으로 상단에 지뢰가 있는지 확인
 */
    findMineNorth = ( key )=>{
        const { fieldset } = this.state
        // if( fieldset[key] === true ) return false;
        if( key < COL ) return false;
        try {
            return fieldset[key - COL ] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

/**
 * 현재 위치를 기준으로 하단에 지뢰가 있는지 확인
 */
    findMineSouth = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if (key >= (ROW-1) * COL ) return false;
        try {
            return fieldset[key + COL] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

/**
 * 현재 위치를 기준으로 우측에 지뢰가 있는지 확인
 */
    findMineEast = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if ( key % COL === ( COL - 1 ) ) return false;
        try {
            return fieldset[key + 1] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

/**
 * 현재 위치를 기준으로 좌측에 지뢰가 있는지 확인
 */
    findMineWest = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if (key % COL === 0) return false;
        try {
            return fieldset[key - 1] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

/**
 * 현재 위치를 기준으로 우측상단에 지뢰가 있는지 확인
 */
    findMineNorthEast = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if (key % COL === (COL - 1) || key < COL) return false;
        try {
            return fieldset[key - (COL - 1)] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

/**
 * 현재 위치를 기준으로 좌측상단에 지뢰가 있는지 확인
 */
    findMineNorthWest = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if (key % COL === 0 || key < COL) return false;
        try {
            return fieldset[key - (COL + 1)] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }


/**
 * 현재 위치를 기준으로 우측하단에 지뢰가 있는지 확인
 */
    findMineSouthEast = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if (key % COL === (COL - 1) || key >= (ROW-1) * COL) return false;
        try {
            return fieldset[key + (COL + 1)] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }


    
/**
 * 현재 위치를 기준으로 좌측하단에 지뢰가 있는지 확인
 */
    findMineSouthWest = (key) => {
        const { fieldset } = this.state
        // if (fieldset[key] === true) return false;
        if (key % COL === 0  || key >= (ROW - 1) * COL) return false;
        try {
            return fieldset[key + (COL - 1)] ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }


/**
 * 
 */
    render() {
        return (
            <SetField 
                onClickHandeler={this.onClickHandeler}
                getTotalMineNum={this.getTotalMineNum}
                findMine={this.findMine}
                resetField={this.resetField}
                {...this.state}
            />
            
        )
    }
}
