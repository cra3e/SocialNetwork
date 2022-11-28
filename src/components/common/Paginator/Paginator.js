import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames";

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {


    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let portionCount = Math.ceil(totalItemsCount / pageSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={styles.paginator}>
        { portionNumber === 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }} disabled  className={styles.button}>prev</button> }
        { portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }} className={styles.button}>prev</button> }

        {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map((p) => {
                return <button className={ cn({[styles.selectedPageButton]: currentPage === p}, styles.pageButton) }
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</button>
            })}
        { portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}  className={styles.button}>next</button> }


    </div>
}

export default Paginator;