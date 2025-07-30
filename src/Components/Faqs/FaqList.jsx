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
  name,
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
      setFilteredFaqs(response.data.data);
    });
  };
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  useEffect(() => {
    fetchFaqs();
  }, [triggerFetchFaqs, page]);
  useEffect(() => {
    if (name === "") {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(
        faqs.filter((faq) => {
          if (
            faq.answer.toLowerCase().includes(name.toLowerCase()) ||
            faq.question.toLowerCase().includes(name.toLowerCase())
          ) {
            return faq;
          }
        })
      );
    }
  }, [name]);
  return (
    <div>
      {filteredFaqs?.map((faq, index) => {
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
