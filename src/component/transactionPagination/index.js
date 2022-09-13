import { Tooltip } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Index({ transactions, handleShow }) {
  // We start with an empty list of transactions.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  // number of transactions per page
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch transactions from another resources.
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(transactions?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(transactions?.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, transactions]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactions?.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems?.map((transaction, i) => {
        // get data string
        // const dateStr = transaction?.transactionDateString;

        const dateStr = new Date(transaction?.currentDate);

        const dateArr = dateStr?.toString()?.split(" ");

        return (
          <div
            className="transaction-item px-4 py-3"
            data-target="#transaction-detail"
            onClick={() => handleShow(i)}
            key={i}
          >
            <div className="row align-items-center flex-row">
              <div className="col-2 col-sm-1 text-center">
                {" "}
                <span className="d-block text-4 font-weight-300">
                  {dateArr && dateArr[2]}
                </span>{" "}
                <span className="d-block text-1 font-weight-300 text-uppercase">
                  {dateArr && dateArr[1]?.slice(0, 3)}
                </span>{" "}
              </div>
              <div className="col col-sm-7">
                {" "}
                <span className="d-block text-4">
                  {transaction?.referenceID}
                </span>{" "}
                <span className="text-muted">{transaction?.narration}</span>{" "}
              </div>
              <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3">
                {transaction?.credit ? (
                  <span
                    className="text-danger"
                    data-toggle="tooltip"
                    data-original-title="Cancelled"
                  >
                    <Tooltip content="Completed">
                      <div className="status-credited">Credit</div>
                    </Tooltip>
                  </span>
                ) : (
                  <span
                    className="text-success"
                    data-toggle="tooltip"
                    data-original-title="Completed"
                  >
                    <Tooltip content="Completed">
                      <div className="status-debited">Debit</div>
                    </Tooltip>
                  </span>
                )}
              </div>

              <div className="col-4 col-sm-2 text-right text-4">
                {" "}
                <span className="text-nowrap">
                  {transaction?.credit
                    ? `${transaction?.amount}`
                    : `- ${transaction?.amount}`}{" "}
                </span>{" "}
                <span className="text-2 text-uppercase">(NGN)</span>{" "}
              </div>
            </div>
          </div>
        );
      })}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="fas fa-angle-right"></i>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<i className="fas fa-angle-left"></i>}
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center align-items-center mt-4 mb-0"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
      />
    </>
  );
}

export default Index;
