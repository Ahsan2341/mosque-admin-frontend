import React, { useEffect, useState } from "react";
import SingleFaq from "./SingleFaq";
import leftChev from "../../assets/svg/left-chev.svg";
import rightChev from "../../assets/svg/right-chev.svg";
import { Pagination } from "@mui/material";
import FaqAPI from "../../api/faq";
function FaqList({
  setPopupId,
  popupId,
  setSelectedFaq,
  triggerFetchFaqs,
  setDeleteFaq,
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [faqs, setFaqs] = useState([]);
  const fetchFaqs = () => {
    FaqAPI.getFaqs(`page=${page}&limit=${limit}`).then((response) => {
      setPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setFaqs(response.data.data);
    });
  };

  useEffect(() => {
    fetchFaqs();
  }, [triggerFetchFaqs, page]);
  return (
    <div>
      {faqs?.map((faq, index) => {
        return (
          <SingleFaq
            key={faq._id}
            faq={faq}
            setPopupId={setPopupId}
            popupId={popupId}
            setSelectedFaq={setSelectedFaq}
            triggerFetchFaqs={triggerFetchFaqs}
            setDeleteFaq={setDeleteFaq}
          />
        );
      })}
      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          siblingCount={1}
          boundaryCount={2}
        />
      </div>
    </div>
  );
}

export default FaqList;
