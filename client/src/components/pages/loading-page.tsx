import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./loading-page.css";
import fetchEntities from "@/store/actions/fetchEntities";
import Wrapper from "./wrapper";

const LoadingPage = () => {
  const dispatch = useDispatch();
  const content = [
    "Thuốc độc mà hết hạn sử dụng là nó hết độc hay là nó độc hơn?",
    "Ngủ và Thức là hai từ trái nghĩa nhau. Vậy tại sao thức dậy với ngủ dậy lại là từ đồng nghĩa?",
    "Nếu bỏ thuốc ngủ vào cà phê rồi uống thì sẽ thức hay ngủ?",
    "Nếu ngu mà biết mình ngu vậy thì là có ngu hay không ngu?",
    "Bây giờ tôi mượn mẹ 50k tao mượn bạn 50k. Tôi xài hết 97k, trả lại mỗi người 1k, hai người cộng lại là 98k, tao giữ 1K. Như vậy 1K còn lại đâu?",
    "Tại sao keo dính được mọi thứ mà nó lại không dính trong chai đựng keo?",
    "Tại sao chữ “dài” nó lại ngắn hơn chữ “ngắn” vậy?",
    "Ăn rau để bảo vệ động vật, nhưng động vật ăn rau, vậy con người tranh giành đồ ăn với động vật là bảo vệ động vật hay không?",
    "Nếu cuộc đời bất công với tất cả mọi người thì chẳng phải nó đang công bằng với tất cả mọi người đúng không?",
    "Tại sao gọi hành tinh của chúng ta là “Trái đất” trong khi 3/4 là nước?",
    "Người ta bảo mèo có 9 cái mạng, làm sao để biết con mèo của tôi còn bao nhiêu cái mạng?",
    "Nếu nước không màu, tại sao phần khăn bị chìm trong nước lại sẫm màu hơn phần khô?",
    "Người đếm cừu để ngủ, thế con cừu đếm gì để ngủ?",
    "Tại sao 5:5=1 nhưng bạn chia 5 cái kẹo cho 5 người khác thì bạn lại không còn cái kẹo nào?",
    "Một nồi thịt kho tàu, làm thế nào để ăn được 2 năm mà vẫn ngon? Nấu vào lúc giao thừa",
    "Tuần nào trong năm có thể ít hoặc nhiều hơn 7 ngày? Tuần trăng mật?",
  ];

  useEffect(() => {
    (async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch(fetchEntities());
    })();
  }, []);
  const id = Math.floor(Math.random() * content.length);
  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center h-full w-full text-white bg-[#242424]">
        <div className="loader mb-4"></div>
        <div className=" text-wrap text-center" style={{ maxWidth: "40%" }}>
          {content[id]}
        </div>
      </div>
    </Wrapper>
  );
};

export default LoadingPage;
