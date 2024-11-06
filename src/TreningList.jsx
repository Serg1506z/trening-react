import './App.css'
import { useState } from 'react'

function GetTimeStroke(item ){
    return `${item.getDate()}.${item.getMonth() + 1}.${item.getFullYear()}`
}

export default function TrainingList() {
    const [list, setList]= useState([])
    const [value, setValue] = useState({
        date: "",
        range: ""
    })

    function handleSubmit(e){
        e.preventDefault()
        const date = new Date(value.date)  
        const currentDate = list.find(item => GetTimeStroke(item.date) === GetTimeStroke(date) )
        if(currentDate){
            setList(list.map((item) => {;
                return  GetTimeStroke(item.date) === GetTimeStroke(date)
                ? {...item, range: +item.range + +value.range} : item
            }))
        }else {
            setList([...list, {date: date, range: value.range}].sort((a, b) => b.date - a.date))
        }
        setValue({
            date: "",
            range: ""
        })
    }

    function handleClick(element){
        setList(list.filter((item) => GetTimeStroke(item.date) !== GetTimeStroke(element.date) && item.range !== element.range))
    }

    function handleInput(e){
        setValue({...value, [e.target.name]: e.target.value})
    }

    return <div className="container">
        <form action="" className="form" onSubmit={handleSubmit}>
            <label >Дата(ДД.ММ.ГГ)<input value={value.date} type="date" name='date' onInput={handleInput}/></label>
            <label >Пройдено км<input value={value.range} type="text" name='range' onInput={handleInput}/></label>
            <button className="btn">Ok</button>
        </form>
        <div className="table">
            <h3>Дата(ДД.ММ.ГГ)</h3>
            <h3>Пройдено км</h3>
            <h3>Действия</h3>
            <div className="table__container">
                {list.map((item,index)=>{
                    return   <div key={index} className="table__item">  
                    <p className="date">{ GetTimeStroke(item.date)}</p>
                    <p className="km">{item.range}</p>
                    <div className="item__btn">
                        <button className="change">	&#9998;</button>
                        <button className="remove" onClick={() => handleClick(item)}>&#10006;</button>
                    </div>
                </div>
                })}
            </div>
        </div>
    </div>
}