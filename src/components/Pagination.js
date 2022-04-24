import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { arrayMaker } from "../helpers/utility";
import FontIcon from "./FontIcon";
const Pagination = ({ total, take }) => {
    const [params] = useSearchParams();
    const [page, setPage] = useState(+params.get("page"));
    const navigate = useNavigate();
    const pages = Math.ceil(total / take);
    const disableForward = page >= pages;
    const disableBackward = page <= 1;
    useEffect(() => {
        if (!page || page > pages || !Number(page)) {
            navigate(`?page=${1}`);
            setPage(1);
            return;
        }
        navigate(`?page=${page}`);
    }, [page]);
    const handlePagination = page => {
        setPage(page);
    };
    const goBack = () => {
        if (!disableBackward) {
            setPage(prev => prev - 1);
        }
    };
    const goForward = () => {
        if (!disableForward) {
            setPage(prev => prev + 1);
        }
    };
    const renderPages = () => {
        return arrayMaker(pages).map((v, i) => (
            <div
                onClick={() => handlePagination(i + 1)}
                className={`${page === i + 1 ? "selected" : ""}`}
                key={i}
            >
                {i + 1}
            </div>
        ));
    };
    return (
        <div className="paging">
            <div className={`${disableBackward ? "disabled" : ""}`} onClick={goBack}>
                <FontIcon
                    icon="paging-arrow"
                    classes={`paging__arrow paging__arrow--right ${disableBackward ? "disabled" : ""
                        }`}
                />
            </div>
            {renderPages()}
            <div
                className={`${disableForward ? "disabled" : ""}`}
                onClick={goForward}
            >
                <FontIcon
                    icon="paging-arrow"
                    classes={`paging__arrow paging__arrow--left ${disableForward && "disabled"
                        }`}
                />
            </div>
        </div>
    );
};

export default Pagination;
